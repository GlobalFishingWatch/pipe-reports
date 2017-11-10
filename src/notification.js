const email = require('./services/email');
const config = require('./config');

const reportResultsMessage = (report) => {
  if (report.empty) {
    return "No vessels were found."
  } else {
    return `
You can download the report from ${report.uploads.pdf}. The raw data can also be downloaded from ${report.uploads.csv}.`;
  }
};

const unsubscribeLink = (request) => {
  if (!request.recurrency) {
    return "";
  }

  const encodedSubscriptionId = new Buffer(JSON.stringify(request.subscriptionId)).toString("base64");

  return `
You received this email because you subscribed to a ${request.recurrency} report on this area. To stop receiving these emails, navigate to ${config.apiServer.host}/v2/subscriptions/${encodedSubscriptionId}/cancel.
  `;
};

const emailBody = (report, request) => {
  return `
You requested a fishing hours report with the following parameters:

  Regions: ${request.params.regions.map(region => region.name).join(', ')}
  From: ${request.params.from}
  To: ${request.params.to}

${reportResultsMessage(report)}

${unsubscribeLink(request)}
  `;
};

module.exports = (report, request) => {
  return email.sendMail({
    to: request.user.email,
    subject: "Your report has been processed",
    text: emailBody(report, request),
  });
};
