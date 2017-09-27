const config = require('./config');
const subscription = require('./subscription');
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

    log.debug("Report generated, clearing message")
    const ackResults = await message.ack();
  } catch (e) {
    log.error("There was an error generating the report", message.data);
    log.error(e);
  }

  log.debug("Clearing heartbeat");
  clearInterval(interval);
};

const onError = ({err, subscription}) => {
  log.error("There was an error on the subscription", err);
  process.exit(1);
};

subscription({onMessage, onError});
