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
        return remotes.filter(CommonGit.isNotOrigin)
    }).then(remotes => {
        if (remotes.length <= 0) {
            throw new Error('There are no remotes different from origin in this repository')
        }

        return _repository.getRemote(remotes[0])
    }).then(remote => {
        if (remote.url().endsWith('Karumi/learnyougit.git')) {
            throw new Error('The ' + remote.name() + ' remote is not pointing to a learnyougit fork')
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
