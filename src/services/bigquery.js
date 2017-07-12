const bigquery = require('@google-cloud/bigquery');
const config = require('../config');

module.exports = bigquery(config.gcloud.bigquery);
