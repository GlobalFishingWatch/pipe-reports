const email = require('./services/email');

const reportResultsMessage = (report) => {
  if (report.empty) {
    return "No vessels were found."
  } else {
    return `
You can download the report from ${report.uploads.pdf}. The raw data can also be downloaded from ${report.uploads.csv}`;
  }
};

const emailBody = (report, request) => {
  return `
You requested a fishing hours report with the following parameters:

  Regions: ${request.params.regions.map(region => region.name).join(', ')}
  From: ${request.params.from}
  To: ${request.params.to}

${reportResultsMessage(report)}`;
};

module.exports = (report, request) => {
  return email.sendMail({
    to: request.user.email,
    subject: "Your report has been processed",
    text: emailBody(report, request),
  });
};
