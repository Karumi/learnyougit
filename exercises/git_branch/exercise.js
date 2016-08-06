const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then((repository) => {
        return repository.getReferenceNames(Git.Reference.TYPE.LISTALL)
    }).then((referenceNames) => {
        return referenceNames.filter((name) => {
            return name !== 'refs/heads/master' && name !== 'refs/remotes/origin/master'
        })
    }).then((referenceNames) => {
        if (referenceNames <= 0) {
            throw new Error('There are no new branches in your repository')
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
