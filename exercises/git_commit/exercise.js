const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(repository => {
        return repository.getHeadCommit()
    }).then(commit => {
        if (commit === null) {
            throw new Error('You have not created any commit yet')
        }

        process.nextTick(function () {
            callback(null, true)
        });
    }).catch(error => {
        process.nextTick(function () {
            Common.logError(error.message)
            callback(null, false)
        });
    })
});

exercise.hideSolutions = true;
exercise.requireSubmission = false;

module.exports = exercise;
