const log = require('winston');
const bigquery = require('../../services/bigquery');
const buildQuery = require('./query');
const fetchTables = require('./tables');

module.exports = async (request) => {
  log.debug("Running query for report", request);

  log.debug("Fetching tables information from tileset", request);
  const tables = await fetchTables(request.tileset);

  log.debug("Building sql query for bigquery");
  const query = buildQuery({
    request,
    tables,
  });

  log.debug("Running query", query);
  const results = await bigquery.query({
    query,
    timeoutMs: 2 * 60 * 1000,
  });

  log.debug("Done running query, found %d results", results[0].length);
  return results[0];
};
