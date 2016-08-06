function CommonGit() {}

CommonGit.isMasterBranch = function(name) {
    return name === 'refs/heads/master' || name === 'refs/remotes/origin/master'
}

CommonGit.isNotMasterBranch = function(name) {
    return !CommonGit.isMasterBranch(name)
}

module.exports = CommonGit;
