const log = require('winston');
const storage = require('../services/storage');
const config = require('../config');

module.exports = async (file, request) => {
  log.debug("Uploading %s file", file.kind);

  log.debug("Generating %s file path", file.kind);
  const path = [
    config.storage.reportsPath,
    request.user.id,
    `${request.timestamp}.${file.kind}`,
  ].join('/');

  log.debug("Uploading %s file to path %s", file.kind, path);
  await storage
    .bucket(config.storage.reportsBucket)
    .file(path)
    .save(file.contents, {
      public: true,
    });

  log.debug("Uploaded %s file successfully", file.kind);
  return {
    kind: file.kind,
    link: `https://storage.googleapis.com/${config.storage.reportsBucket}/${path}`,
  };
};
