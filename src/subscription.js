const config = require('./config');
const pubsub = require('./services/pubsub');
const log = require('winston');

module.exports = async ({onMessage, onError}) => {
  log.debug("Retrieving pubsub topic");
  const topic = pubsub.topic(config.pubsub.reports.topic);

  log.debug("Pubsub topic ready, retrieving subscription");
  const subscriptionData = await topic.subscribe(config.pubsub.reports.subscription, {
    ackDeadlineSeconds: 30,
    maxInProgress: 1,
  });
  const subscription = subscriptionData[0];

  log.debug("Subscription ready, setting message handlers");
  subscription.on('message', (message) => onMessage({message, subscription}));
  subscription.on('error', (err) => onError({err, subscription}));

  log.debug("Subscription set up and receiving messages");
};
