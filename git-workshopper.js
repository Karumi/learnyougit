#!/usr/bin/env node

const workshopper = require('workshopper'),
      path        = require('path')

function fpath (f) {
    return path.join(__dirname, f)
}

workshopper({
    name        : 'git-workshopper',
    title       : 'Git Workshopper',
    subtitle    : 'Learn how to use Git',
    appDir      : __dirname,
    menuItems   : [],
    exerciseDir : fpath('./exercises/'),
    footerFile  : fpath('./footer.md')
})
