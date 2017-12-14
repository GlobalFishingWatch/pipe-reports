const config = require('./config');
const messages = require('./subscription');
const generateReport = require('./report');
const sendNotification = require('./notification');
const log = require('winston');

log.level = 'debug';

const onMessage = async ({message, subscription}) => {
  log.debug("Setting up heartbeat");
  const interval = setInterval(async () => {
    log.debug("Heartbeat", {timestamp: new Date()});

    const ackResults = await subscription.setAckDeadline({
      ackIds: message.ackId,
      seconds: 30,
    });
    log.debug("Ack deadline extended");
  }, 5000);

  try {
    log.debug("Generating report", message.data);
    const report = await generateReport(message.data);

    log.debug("Sending notifications", report)
    const notificationResults = await sendNotification(report, message.data);

  } catch (e) {
    log.error("There was an error generating the report", message.data);
    log.error("Error", e);

    const retryCount = message.data.retryCount || 0;
    if (retryCount > config.pubsub.retryCount) {
      log.error(`Message was retried more than ${config.pubsub.retryCount} times, discarding`, message.data);
    } else {
      log.error("Retrying message later", message.data);
      message.data.retryCount = retryCount + 1;
      const result = await messages.retryLater(message.data);
    }
  }

  log.debug("Acknowledging message");
  const ackResults = await message.ack();

  log.debug("Clearing heartbeat");
  clearInterval(interval);
};

const onError = ({err, subscription}) => {
  log.error("There was an error on the subscription", err);
  process.exit(1);
};

messages.subscribe({onMessage, onError});
