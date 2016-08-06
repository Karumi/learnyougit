const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')
const CommonGit = require('../../common-git')

var _repository

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(repository => {
        _repository = repository
        return repository.getRemotes()
    }).then(remotes => {
        if (remotes.length <= 0) {
            throw new Error('There are no remotes in this repository')
        }

        return _repository.getReferences(Git.Reference.TYPE.LISTALL)
    }).then(references => {
        return references.filter(CommonGit.isInRemote)
    }).then(references => {
        if (references.length === 0) {
            throw new Error('There are no remote branches in your repository')
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
