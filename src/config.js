const environment = process.env.NODE_ENV || 'development';

module.exports = {
  environment: environment,

  storage: {
    tilesetsBucket: entry({
      key: 'STORAGE_TILESETS_BUCKET',
      doc: 'Bucket where the tilesets are stored.',
      defaults: {all: 'world-fishing-827'},
      required: true,
    }),

    tilesetsPath: entry({
      key: 'STORAGE_TILESETS_PATH',
      doc: 'Path from the tilesets bucket root to the place where tilesets are stored.',
      defaults: {all: 'pelagos/data/tiles/benthos-pipeline'},
      required: true,
    }),

    reportsBucket: entry({
      key: 'STORAGE_REPORTS_BUCKET',
      doc: 'Bucket where the reports are uploaded to.',
      defaults: {all: 'world-fishing-827'},
      required: true,
    }),

    reportsPath: entry({
      key: 'STORAGE_REPORTS_PATH',
      doc: 'Path from the reports bucket root to the place where reports are uploaded.',
      defaults: {all: 'pelagos/data/public-release-reports'},
      required: true,
    }),
  },

  apiServer: {
    host: entry({
      key: 'API_SERVER_HOST',
      doc: 'Protocol, host and port where the server is exposed to clients.',
      defaults: {development: 'http://localhost:8080', test: 'http://localhost:8080'},
      required: true,
    }),
  },

  pubsub: {
    reports: {
      topic: entry({
        key: 'PUBSUB_REPORTS_TOPIC',
        doc: 'Name of the topic where report requests should be pushed to.',
        required: true,
      }),

      subscription: entry({
        key: 'PUBSUB_REPORTS_SUBSCRIPTION',
        doc: 'Name of the subscription to pull report requests from.',
        required: true,
      }),
    },
  },

  gcloud: {
    bigquery: {
      projectId: entry({
        key: 'GCLOUD_PROJECTID_BIGQUERY',
        doc: 'Google cloud platform project id for the bigquery services.',
        defaults: {development: 'world-fishing-827', test: 'world-fishing-827'},
        required: true,
      }),

      keyFilename: entry({
        key: 'PELAGOS_GCLOUD_KEY_FILENAME',
        doc: 'Location of the json key file for authorizing with the bigquery services',
        defaults: {development: '/opt/project/dev/key.json', test: '/opt/project/dev/key.json'},
        required: false,
      }),
    },

    pubsub: {
      projectId: entry({
        key: 'GCLOUD_PROJECTID_PUBSUB',
        doc: 'Google cloud platform project id for the pubsub services.',
        defaults: {development: '', test: ''},
        required: true,
      }),

      keyFilename: entry({
        key: 'PELAGOS_GCLOUD_KEY_FILENAME',
        doc: 'Location of the json key file for authorizing with the pubsub services',
        defaults: {development: '/opt/project/dev/key.json', test: '/opt/project/dev/key.json'},
        required: false,
      }),
    },

    storage: {
      projectId: entry({
        key: 'GCLOUD_PROJECTID_STORAGE',
        doc: 'Google cloud platform project id for the storage services.',
        defaults: {development: 'world-fishing-827', test: 'world-fishing-827'},
        required: true,
      }),

      keyFilename: entry({
        key: 'PELAGOS_GCLOUD_KEY_FILENAME',
        doc: 'Location of the json key file for authorizing with the storage services',
        defaults: {development: '/opt/project/dev/key.json', test: '/opt/project/dev/key.json'},
        required: false,
      }),
    },
  },

  smtp: {
    defaultSender: entry({
      key: 'SMTP_DEFAULT_SENDER',
      doc: 'Default email sender, the "from" field of the emails',
      defaults: {all: '\'GlobalFishingWatch.org\' <no-reply@globalfishingwatch.org>'},
      required: true,
    }),

    host: entry({
      key: 'SMTP_HOST',
      doc: 'Host of the SMTP server',
      defaults: {test: 'localhost'},
      required: true,
    }),

    port: entry({
      key: 'SMTP_PORT',
      doc: 'Port of the SMTP server',
      defaults: {test: 1234},
      required: true,
    }),

    username: entry({
      key: 'SMTP_USERNAME',
      doc: 'Username to authenticate with the SMTP server',
      defaults: {test: 'test'},
      required: true,
    }),

    password: entry({
      key: 'SMTP_PASSWORD',
      doc: 'Password to authenticate with the SMTP server',
      defaults: {test: 'test'},
      required: true,
    }),
  },
};

function errorMessage(key, doc) {
  return `You need to configure the environment variable ${key}. ${doc}`;
}

function entry(options) {
  let value = process.env[options.key];

  if (value === undefined && options.defaults) {
    value = options.defaults[environment];
  }

  if (value === undefined && options.defaults) {
    value = options.defaults.all;
  }

  if (value === undefined && options.required) {
    throw errorMessage(options.key, options.doc);
  }

  return value;
}

