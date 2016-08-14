{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Push your changes to your own forked repository
```
git remote add my-fork {fork-url}
git push my-fork my-branch
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

We've learned how to get other peoples changes with git fetch. It's time to share with them your own work using `git push`. This command will send your changes to a Git server for others to see.

First things first, you won't be able to push to the remote you added previously. That is because `https://github.com/karumi/learnyougit` have restricted write access; only us, the karumies, can upload stuff there. In order to learn how the push command works and pass this lesson, you will need to fork that repository. In short, forking a repository means creating a clone of that repository entirely under your control. That means you will have access to freely push your changes!

To fork a repository you can follow the official GitHub guide: `https://help.github.com/articles/fork-a-repo/`. Once you successfully forked the `learnyougit` repository, add it to your remotes with `git remote add my-fork git@github.com:{your-user}/learnyougit.git` and you are ready to go! Let's continue with the lesson.

There are several options to configure what changes you are going to upload but in general, you usually want to send a single branch. This can be done with the command `git push {remote-name} {branch-name}`. Try it now, once it finishes, you will see your branch and all its commits directly from GitHub. By default, Git will use the "smart" protocol to upload only the things that are not already uploaded.

Is this it? That's everything you need to know to push things? Well... it's not. If you are working completely alone in a project you probably won't need anything else, but, if you work with other people you will probably end up having conflicts with their work. What happens if Alice and Bob are working in the same branch? Imagine Alice has pushed her changes to server and right after that, Bob wants to do the same. Git will warn him that it's not possible with a message like:

```
To git@github.com:Karumi/Dexter.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@github.com:Karumi/Dexter.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

In this situation, Bob will need to solve the conflicts in his computer (we will see how to do this in the following lesson) before retrying the push operation. There is another possibility, Bob can discard Alice work and upload only his changes with the `-f` or `--force` option. This option should be used carefully and only when you know that the commits you are discarding can be removed safely.

In the following lessons we will learn how to solve this kind of conflicts so that you don't have to discard others work.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

When you push a branch, Git will compare which commits are already present in the remote and ignore them. There are two possibilities with the remaining commits:
* All new commits are on top of the remote branch history, meaning you can safely push everything to make new changes visible to everyone.

```
                 +---------------+
                 | REMOTE BRANCH |
                 +-------+-------+
                         |
                         V
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<-----+ COMMIT #2 |<-----+ COMMIT #3 |
+-----------+      +-----------+      +-----------+
                                            A
                                            |
                                    +-------+------+
                                    | LOCAL BRANCH |
                                    +--------------+
```
{green}BEFORE PUSHING{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER PUSHING{/green}
```
                                    +---------------+
                                    | REMOTE BRANCH |
                                    +-------+-------+
                                            |
                                            V
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<-----+ COMMIT #2 |<-----+ COMMIT #3 |
+-----------+      +-----------+      +-----------+
                                            A
                                            |
                                    +-------+------+
                                    | LOCAL BRANCH |
                                    +--------------+
```
* Your local branch doesn't share all its history with the remote branch. That'd mean that your history diverges at some point from the one store in server. Git will ask you to either solve the issue locally, respecting the server history, or to forget server's history and use yours instead.

```
                 +---------------+
                 | REMOTE BRANCH |
                 +-------+-------+
                         |
                         V
+-----------+      +-----------+
| COMMIT #1 |<--+--+ COMMIT #2 |
+-----------+   |  +-----------+
                |
                |  +-----------+
                +--+ COMMIT #4 |
                   +-----------+
                         A
                         |
                 +-------+------+
                 | LOCAL BRANCH |
                 +--------------+
```
{green}BEFORE PUSH --FORCE{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER PUSH --FORCE{/green}
```
                 +---------------+
                 | REMOTE BRANCH |
                 +-------+-------+
                         |
                         V
+-----------+      +-----------+
| COMMIT #1 |<-----+ COMMIT #4 |
+-----------+      +-----------+
                         A
                         |
                 +-------+------+
                 | LOCAL BRANCH |
                 +--------------+
```


{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
