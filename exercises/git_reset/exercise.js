const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')
const CommonGit = require('../../common-git')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(repository => {
        return repository.getReferences(Git.Reference.TYPE.LISTALL)
    }).then(references => {
        return references.filter(CommonGit.isTag)
    }).then(references => {
        if (references.length === 0) {
            throw new Error('There are no tags in your repository')
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
