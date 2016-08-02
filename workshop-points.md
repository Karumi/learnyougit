* GIT INIT
  * git files exist
* GIT ADD
  * index exists
  * blob exists
* GIT COMMIT
  * tree exists
  * commit exists with message "This is my first commit"
* GIT BRANCH
  * refs/heads/my-first-branch
* GIT CHECKOUT
  * .git/head points to my-first-branch
* GIT TAG
  * .git/refs/tags/my-lightweight-tag exists
  * .git/refs/tags/my-annotated-tag exists & there is a tag object
* GIT REMOTE
  * .git/config contains a remote configuration pointing to the scenario repository
* GIT FETCH
  * .git/refs/remotes/origin/master exists
* GIT RESET
  * ?
* GIT MERGE
  * verify new commit with two parents in HEAD
* GIT REBASE
  * verify HEAD is now pointing to a child with previous history
* GIT CHERRY-PICK
  * verify contents of HEAD are the same as the one cherry-picked
* GIT STASH
  * .git/refs/stash
