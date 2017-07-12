const log = require('winston');
const storage = require('../../services/storage');
const config = require('../../config');

const tableUrl2Identifier = (url) => {
  const matches = url.match(/bq:\/\/([^\/]+)\/([^\/]+)\/([^\/]+)/);
  return `[${matches[1]}:${matches[2]}.${matches[3]}]`;
};

module.exports = async (tileset) => {
  log.debug("Fetching table metadata", tileset);
  const rawMetadata = await storage
    .bucket(config.storage.tilesetsBucket)
    .file(`${config.storage.tilesetsPath}/${tileset}/config.json`)
    .download();

  log.debug("Parsing table metadata");
  const metadata = JSON.parse(rawMetadata[0]);

  log.debug("Generating tables information");
  const tables = {
    messages: tableUrl2Identifier(metadata.bq_messages_path),
    vessels: tableUrl2Identifier(metadata.bq_vessels_path),
  };

  log.debug("Done fetching table metadata", tables);
  return tables;
};

