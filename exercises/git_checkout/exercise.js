const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')
const CommonGit = require('../../common-git')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then((repository) => {
        return repository.head()
    }).then((head) => {
        if (CommonGit.isMasterBranch(head.name())) {
            throw new Error('You are still in the master branch')
        }

        process.nextTick(function () {
            callback(null, true)
        });
    }).catch((error) => {
        process.nextTick(function () {
            Common.logError(error.message)
            callback(null, false)
        });
    })
});

exercise.hideSolutions = true;
exercise.requireSubmission = false;

module.exports = exercise;
