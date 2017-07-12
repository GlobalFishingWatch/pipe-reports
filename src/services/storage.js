const storage = require('@google-cloud/storage');
const config = require('../config');

module.exports = storage(config.gcloud.storage);

