const exercise = require('workshopper-exercise')()

exercise.addProcessor(function (mode, callback) {
    callback(null, true)
});

exercise.hideSolutions = true;
exercise.requireSubmission = false;

module.exports = exercise;
