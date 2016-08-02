var through2 = require('through2');
var exercise = require('workshopper-exercise')();
var execute = require('workshopper-exercise/execute');
var comparestdout = require('workshopper-exercise/comparestdout');


// execute the solution and submission in parallel with spawn()
exercise = execute(exercise);

// add a processor for both run and verify calls, added *before*
// the comparestdout processor so we can mess with the stdouts
exercise.addProcessor(function (mode, callback) {

    this.submissionStdout.pipe(process.stdout);

    // replace stdout with our own streams
    this.submissionStdout = through2();
    if (mode === 'verify') {
        this.solutionStdout = through2();
    }

    process.nextTick(function () {
        callback(null, true)
    });
});

// compare stdout of solution and submission
exercise = comparestdout(exercise)

module.exports = exercise;
