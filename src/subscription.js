const config = require('./config');
const pubsub = require('./services/pubsub');
const log = require('winston');

const asyncTopic = pubsub
  .topic(config.pubsub.reports.topic)
  .get({autoCreate: true});

module.exports = {
  subscribe: async ({onMessage, onError}) => {
    log.debug(`Retrieving pubsub topic ${config.pubsub.reports.topic}`);
    const [topic] = await asyncTopic;

    log.debug(`Pubsub topic ready, retrieving subscription ${config.pubsub.reports.subscription}`);
    const subscriptionData = await topic.subscribe(config.pubsub.reports.subscription, {
      ackDeadlineSeconds: 30,
      maxInProgress: 1,
    });
    const subscription = subscriptionData[0];

    log.debug("Subscription ready, setting message handlers");
    subscription.on('message', (message) => onMessage({message, subscription}));
    subscription.on('error', (err) => onError({err, subscription}));

    log.debug("Subscription set up and receiving messages");
  },

  retryLater: async (message) => {
    log.debug(`Retrieving pubsub topic ${config.pubsub.reports.topic}`);
    const [topic] = await asyncTopic;

    log.debug('Enqueueing message back to retry later', message);
    const messageId = await topic.publish(message);

    log.debug("Message enqueued to retry later", message);
  },
};
