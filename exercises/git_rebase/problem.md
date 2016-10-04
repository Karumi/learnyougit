{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Rebase two branches and solve the conflict by adding a new different line:
```
git checkout rebase-lesson/base-branch
git rebase rebase-lesson/onto-branch
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

We already reviewed how to use the `merge` tool, it's now time to learn how to use its companion, the `rebase` command! The main goal of `git rebase` is to unify branches keeping a linear history, that means that Git won't create commits with two parents. Git users often find this desirable because, in this way, it's easier to navigate through your commits history to find bugs, revert changes and so.

To start using rebase we first need to specify a branch where we want to rebase ours. This is done with the syntax `git rebase {base-branch}`. As with other Git operations, we can also use commit hashes or relative commits.

How does Git keeps a linear history? It basically "replays" all the commits that are in your current branch (but are not in your base branch) on top of the tip of the base branch. The process can be separated in the following steps:
* Find the most recent commit that is shared by both branches, the current one and the branch you are rebasing onto.
* Starting from that shared commit, save all commits present in your current branch.
* Reset your current branch to the most recent commit in the base branch.
* Replay every saved commit in order.

```
                     +------+
                     | HEAD |
                     +---+--+
                         |
                         V
                   +-----------+
                   | BRANCH #1 |
                   +-----+-----+
                         |
                         V
                   +-----------+
                +--+ COMMIT #2 |
                |  +-----------+
                |
+-----------+   |  +-----------+
| COMMIT #1 |<--+--+ COMMIT #3 |
+-----------+      +-----------+
                         A
                         |
                   +-----+-----+
                   | BRANCH #2 |
                   +-----------+
```
{green}BEFORE REBASING BRANCH #1 ONTO BRANCH #2{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER REBASING BRANCH #1 ONTO BRANCH #2{/green}
```
                                            +------+
                                            | HEAD |
                                            +---+--+
                                                |
                                                V
                                          +-----------+
                                          | BRANCH #1 |
                                          +-----+-----+
                                                |
                                                V
+-----------+      +-----------+      +-------------------+
| COMMIT #1 |<-----+ COMMIT #3 |<-----+ COPY OF COMMIT #2 |
+-----------+      +-----------+      +-------------------+
                         A
                         |
                   +-----+-----+
                   | BRANCH #2 |
                   +-----------+
```

As in with the merge command, rebase only modifies your current branch. Notice how we no longer reference the old `COMMIT #2`, that means that we "lost" it. However, it's important to keep in mind that the commit has not been deleted and it is possible to go back to it with other Git commands like `git reflog`.

If other people were to work with that branch and commits on top of `COMMIT #2` then they would find themselves in a problem because the history of the branch has been modified! This is the reason `git rebase` is often discouraged when sharing your branches. There is no problem in using it in your own personal branches though.

Just as we could have conflicts while using `git merge`, there can also be conflicts while rebasing. If that happens, the `rebase` command will stop and will ask you to solve your conflicts before continuing with the process. Once you have solved all your conflicts, you will need to call `git rebase --continue` to proceed with the remaining commits. You can also stop the command if you don't feel confident with the conflicts by calling `git rebase --abort`.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

Git rebase is a really powerful tool. Besides applying the algorithm explained previously, it can be used to edit your history when used with the `--interactive` option. When that happens, Git will save all the commits that are going to be rebased as usual, but then it will stop and let you edit what to do with all those commits.

It will show you your configured editor and display a file that looks like this:

```
pick a70d274 Oldest commit
pick 8a6b964 Old commit
pick e1e3cf0 Most recent commit

# Rebase aa0eda1..e1e3cf0 onto aa0eda1 (25 command(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Once you have finished editing what to do with every commit save the file and Git will proceed with the rebase process, respecting your configuration.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
