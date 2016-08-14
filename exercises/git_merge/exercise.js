const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(() => {
        process.nextTick(function () {
            callback(null, true)
        });
    }).catch(() => {
        process.nextTick(function () {
            Common.logError('You have not created a Git repository in your current directory')
            callback(null, false)
        });
    })
});

exercise.hideSolutions = true;
exercise.requireSubmission = false;

module.exports = exercise;
