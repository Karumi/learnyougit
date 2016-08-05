const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const chalk = require('chalk')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(() => {
        process.nextTick(function () {
            callback(null, true)
        });
    }).catch(() => {
        process.nextTick(function () {
            printError()
            callback(null, false)
        });
    })
});

function printError(str) {
    console.log("\n " + chalk.red("››› ERROR") + ": You have not created a Git repository in your current directory");
}

exercise.hideSolutions = true;
exercise.requireSubmission = false;

module.exports = exercise;
