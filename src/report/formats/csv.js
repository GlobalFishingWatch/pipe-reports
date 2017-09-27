const csv = require('csv-stringify');
const log = require('winston');

const reportHeaders = [[
  'Report',
  'Report Start',
  'Report End',
  'MMSI',
  'Vessel Name',
  'IMO',
  'Callsign',
  'Presence Days',
  'Fishing Days',
  'Earliest Detection',
  'Latest Detection',
]];

const reportRecord2csvRow = request => item => [
  `Fishing Vessel Days in ${request.params.regions.map(region => region.name).join(', ')}`,
  request.params.from,
  request.params.to,
  item.all_records_mmsi,
  item.vessel_vesselname_vesselname,
  item.vessel_imo_imo,
  item.vessel_callsign_callsign,
  item.presence_days,
  item.fishing_days,
  new Date(item.all_records_earliest_detection.value).toISOString(),
  new Date(item.all_records_latest_detection.value).toISOString(),
];

module.exports = (data, request) => {
  log.debug("Rendering %d elements to csv", data.length);
  const rows = data.map(reportRecord2csvRow(request));

  log.debug("Prepending report headers");
  const csvRows = reportHeaders.concat(rows);

  log.debug("Converting to csv");
  return new Promise((resolve, reject) => {
    csv(csvRows, (err, result) => {
      if (err) {
        log.error("Unable to convert csv rows to csv", err);
        reject(err);
      } else {
        log.debug("Converted %d csv rows to csv", data.length);
        resolve({
          contents: result,
          kind: 'csv',
        });
      }
    });
  });
};
