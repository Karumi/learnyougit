const chalk = require('chalk')

function Common() {}

Common.logError = function(message) {
    console.log('\n ' + chalk.red('[ERROR]') + ' ' + message);
}

module.exports = Common;
