const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(repository => {
        return repository.getReferenceCommit('root-branch')
    }).then(commit => {
        return commit.getParents()
    }).then(parents => {
        if (parents.length < 2) {
            throw new Error('The current commit only has one parent. It should have two after the merge!')
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
