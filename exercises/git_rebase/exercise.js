const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')

var _repository
var _ancestorCommit

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(repository => {
        _repository = repository
        return repository.getReferenceCommit('rebase-lesson/base-branch')
    }).then(commit => {
        return commit.getParents()
    }).then(parents => {
        if (parents.length != 1) {
            throw new Error('The current commit has more than one parent, that means you merged your branch!')
        }

        _ancestorCommit = parents[0]
    }).then(() => {
        return _repository.getReferenceCommit('rebase-lesson/onto-branch')
    }).then(commit => {
        if (commit.sha() != _ancestorCommit.sha()) {
            throw new Error('Your parent commit is not in rebase-lesson/onto-branch')
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
