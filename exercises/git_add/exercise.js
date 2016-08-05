const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const chalk = require('chalk')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then((repository) => {
        return repository.index()
    }).then((index) => {
        if (index.entryCount() < 0) {
            throw new Error('There are no tracked files in your repository')
        }

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
    console.log("\n " + chalk.red("» ERROR") + ": There are no tracked files in your repository");
}

exercise.hideSolutions = true;
exercise.requireSubmission = false;

module.exports = exercise;
