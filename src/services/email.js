const nodemailer = require('nodemailer');
const config = require('../config');

const options = {
  host: config.smtp.host,
  port: config.smtp.port,
  auth: {
    user: config.smtp.username,
    pass: config.smtp.password,
  },
};

const defaults = {
  from: config.smtp.defaultSender,
};

module.exports = nodemailer.createTransport(options, defaults);
