const email = require('./services/email');
const config = require('./config');

const encodeSubscriptionId = subscriptionId => {
  const buffer = new Buffer(JSON.stringify(subscriptionId))
  return buffer.toString("base64");
};

const emailSubject = (request) => {
  const message = 'Your report has been processed';
  const genericPrefix = config.emails.subjectPrefix;

  if (request.recurrency) {
    const subscriptionPrefix = request.subscriptionId[3];
    return `${genericPrefix}Your ${request.recurrency} report subscription has been processed (${subscriptionPrefix})`;
  }

  return `${genericPrefix}Your report has been processed`;
}

const reportResultsMessage = (report) => {
  if (report.empty) {
    return "No vessels were found."
  }
  return `
You can download the report from ${report.uploads.pdf}. The raw data can also be downloaded from ${report.uploads.csv}.`;
};

const unsubscribeLink = (request) => {
  if (!request.recurrency) {
    return "";
  }

  return `
You received this email because you subscribed to a ${request.recurrency} report on this area. To stop receiving these emails, navigate to ${config.apiServer.host}/v2/subscriptions/${encodeSubscriptionId(request.subscriptionId)}/cancel.
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
    subject: emailSubject(request),
    text: emailBody(report, request),
  });
};
