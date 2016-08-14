function CommonGit() {}

CommonGit.isNotOrigin = function(remoteName) {
    return remoteName !== 'origin'
}

CommonGit.isInRemote = function(reference) {
    return reference.isRemote() === 1
}

CommonGit.isTag = function(reference) {
    return reference.isTag() === 1
}

CommonGit.isMasterBranch = function(name) {
    return name === 'refs/heads/master' || name === 'refs/remotes/origin/master'
}

CommonGit.isNotMasterBranch = function(name) {
    return !CommonGit.isMasterBranch(name)
}

module.exports = CommonGit;
