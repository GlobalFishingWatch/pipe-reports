const pubsub = require('@google-cloud/pubsub');
const config = require('../config');

module.exports = pubsub(config.gcloud.pubsub);
