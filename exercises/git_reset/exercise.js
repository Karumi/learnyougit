const exercise = require('workshopper-exercise')()
const Git = require('nodegit')
const Common = require('../../common')

exercise.addProcessor(function (mode, callback) {
    Git.Repository.open('.')
    .then(repository => {
        return repository.getReferences(Git.Reference.TYPE.LISTALL)
    }).then(references => {
        if (references.length < 2) {
            throw new Error('You need both, a master branch and your own')
        }

        if (!references[0].target().equal(references[1].target())) {
            throw new Error('Both branches are not pointing to the same commit')
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
