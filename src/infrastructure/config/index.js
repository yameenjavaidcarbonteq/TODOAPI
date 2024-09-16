const application = require ('./application');
const database = require ('./database');
const googleAuth = require ('./googleauth');
const mailer = require ('./gmail');
const slack = require ('./slack');

module.exports = {
  application,
  database,
  googleAuth,
  mailer,
  slack
};
