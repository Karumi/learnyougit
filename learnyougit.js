#!/usr/bin/env node

const workshopper = require('workshopper'),
      path        = require('path')

function fpath (f) {
    return path.join(__dirname, f)
}

workshopper({
    name        : 'learnyougit',
    title       : 'Learn you git',
    subtitle    : 'Git interactive workshop',
    appDir      : __dirname,
    menuItems   : [],
    exerciseDir : fpath('./exercises/'),
    footerFile  : fpath('./footer.md')
})
