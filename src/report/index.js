const log = require('winston');
const lodash = require('lodash');
const runQuery = require('./query');
const formats = require('./formats');
const upload = require('./upload');

module.exports = async (request) => {
  log.debug("Generating report", request);

  try {
    log.debug("Running query");
    const data = await runQuery(request);
    log.debug("Report data contains %d results", data.length);

    if (data.length > 0) {
      log.debug("Rendering data to all formats");
      const files = await Promise.all(
        formats.map((render) => render(data, request))
      );

      log.debug("Uploading files");
      const uploads = await Promise.all(
        files.map((file) => upload(file, request))
      );

      log.debug("Done generating reports", uploads);
      return {
        empty: false,
        uploads: uploads.reduce(
          (acc, item) => lodash.set(acc, item.kind, item.link),
          {}
        ),
      };
    } else {
      log.debug("No results available for the query");
      return {
        empty: true,
        uploads: [],
      };
    }
  } catch (e) {
    log.error("There was an error generating report", e);
  }
};
