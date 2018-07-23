const lodash = require('lodash');
const countries = require('../../data/countries');

const sanitize = (value) => {
  return value.replace(/'/g, '\\\'')
};

const regionValues = (request) => {
  return request.params.regions
    .map(region => sanitize(region.id))
    .map(value => `'${value}'`)
    .join(', ');
};

const midCodeConstraint = (request, connector = 'AND') => {
  const flagFilters = lodash.get(request, 'params.filters.flags', []);
  const midCodes = lodash(flagFilters)
    .map(country => countries.lookupByCode(country))
    .filter(entry => !!entry)
    .flatMap(country => country.midcodes)
    .value();

  if (lodash.isEmpty(midCodes)) {
    return '';
  } else {
    const conditions = midCodes
      .map(midCode => `STRING(real_mmsi) LIKE '${midCode}%'`)
      .join(' OR ');
    return `${connector} (${conditions})`;
  }
};

module.exports = ({request, tables}) => `
SELECT
  all_records.real_mmsi AS mmsi,
  vessel_vesselname.vesselname,
  vessel_imo.imo,
  vessel_callsign.callsign,
  SUM(fishing_status.been_there) AS presence_days,
  SUM(fishing_status.been_fishing) AS fishing_days,
  all_records.earliest_detection,
  all_records.latest_detection

FROM (
  SELECT
    real_mmsi,
    MIN(timestamp) AS earliest_detection,
    MAX(timestamp) AS latest_detection
  FROM
    ${tables.messages}
  WHERE
    regions IN (${regionValues(request)})
    AND timestamp BETWEEN TIMESTAMP('${request.params.from}')
    AND TIMESTAMP('${request.params.to}')
    AND LENGTH(STRING(real_mmsi)) = 9
    ${midCodeConstraint(request, 'AND')}
  GROUP BY
    real_mmsi,
    regions ) AS all_records

LEFT JOIN (
  SELECT
    real_mmsi,
    CASE WHEN SOME(score >= 0.5) THEN 1 ELSE 0 END AS been_fishing,
    1 AS been_there,
    DAY(timestamp) AS d,
    MONTH(timestamp) AS m,
    YEAR(timestamp) AS y
  FROM
    ${tables.messages}
  WHERE
    regions IN (${regionValues(request)})
    AND timestamp BETWEEN TIMESTAMP('${request.params.from}')
    AND TIMESTAMP('${request.params.to}')
  GROUP BY
    real_mmsi,
    regions,
    d,
    m,
    y ) AS fishing_status
ON
  fishing_status.real_mmsi = all_records.real_mmsi

LEFT JOIN (
  SELECT
    real_mmsi,
    callsign,
    SUM(msg_count) AS freq
  FROM
    ${tables.vessels}
  WHERE
    callsign IS NOT NULL
    AND LTRIM(RTRIM(callsign)) <> ""
    AND LTRIM(RTRIM(callsign)) <> "0"
  GROUP BY
    real_mmsi,
    callsign) AS vessel_callsign
ON
  all_records.real_mmsi = vessel_callsign.real_mmsi
LEFT JOIN (
  SELECT
    real_mmsi,
    MAX(freq) AS max_freq
  FROM (
    SELECT
      real_mmsi,
      callsign,
      SUM(msg_count) AS freq
    FROM
      ${tables.vessels}
    WHERE
      callsign IS NOT NULL
      AND LTRIM(RTRIM(callsign)) <> ""
      AND LTRIM(RTRIM(callsign)) <> "0"
    GROUP BY
      real_mmsi,
      callsign)
  GROUP BY
    real_mmsi) AS vessel_callsign_frequent
ON
  vessel_callsign.real_mmsi = vessel_callsign_frequent.real_mmsi

LEFT JOIN (
  SELECT
    real_mmsi,
    imo,
    SUM(msg_count) AS freq
  FROM
    ${tables.vessels}
  WHERE
    imo IS NOT NULL
    AND imo > 0
  GROUP BY
    real_mmsi,
    imo) AS vessel_imo
ON
  all_records.real_mmsi = vessel_imo.real_mmsi
LEFT JOIN (
  SELECT
    real_mmsi,
    MAX(freq) AS max_freq
  FROM (
    SELECT
      real_mmsi,
      imo,
      SUM(msg_count) AS freq
    FROM
      ${tables.vessels}
    WHERE
      imo IS NOT NULL
      AND imo > 0
    GROUP BY
      real_mmsi,
      imo)
  GROUP BY
    real_mmsi) AS vessel_imo_frequent
ON
  vessel_imo.real_mmsi = vessel_imo_frequent.real_mmsi

LEFT JOIN (
  SELECT
    real_mmsi,
    vesselname,
    SUM(msg_count) AS freq
  FROM
    ${tables.vessels}
  WHERE
    vesselname IS NOT NULL
    AND LTRIM(RTRIM(vesselname)) <> ""
  GROUP BY
    real_mmsi,
    vesselname) AS vessel_vesselname
ON
  all_records.real_mmsi = vessel_vesselname.real_mmsi
LEFT JOIN (
  SELECT
    real_mmsi,
    MAX(freq) AS max_freq
  FROM (
    SELECT
      real_mmsi,
      vesselname,
      SUM(msg_count) AS freq
    FROM
      ${tables.vessels}
    WHERE
      vesselname IS NOT NULL
      AND LTRIM(RTRIM(vesselname)) <> ""
    GROUP BY
      real_mmsi,
      vesselname)
  GROUP BY
    real_mmsi) AS vessel_vesselname_frequent
ON
  vessel_vesselname.real_mmsi = vessel_vesselname_frequent.real_mmsi

WHERE
  (vessel_callsign.freq = vessel_callsign_frequent.max_freq OR vessel_callsign_frequent.max_freq is null)
  AND (vessel_imo.freq = vessel_imo_frequent.max_freq OR vessel_imo_frequent.max_freq is null)
  AND (vessel_vesselname.freq = vessel_vesselname_frequent.max_freq OR vessel_vesselname_frequent.max_freq is null)
GROUP BY
  mmsi,
  vessel_vesselname.vesselname,
  vessel_imo.imo,
  vessel_callsign.callsign,
  all_records.earliest_detection,
  all_records.latest_detection
HAVING
  fishing_days > 0
ORDER BY
  mmsi
    `;

