{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Branches are the way Git has to handle different timelines in your files. As we just saw in the previous lesson, commits always keep a reference to its parent commit. That means we keep a linear history of our files. With branches we can have multiple of those histories.

Think as a branch as just a name for a specific history timeline. When you create a commit, you are just adding a snapshot to your current branch. Whatever you do in a branch won't affect others.

```
                   +-----------+
                   | BRANCH #1 |
                   +-----+-----+
                         |
                         V
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<-----+ COMMIT #2 |<-----+ COMMIT #3 |
+-----------+      +-----------+      +-----------+
                                            A
                                            |
                                      +-----+-----+
                                      | BRANCH #2 |
                                      +-----------+
```
{green}BEFORE CREATING A COMMIT IN BRANCH #1{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER CREATING A COMMIT IN BRANCH #1{/green}
```
                                      +-----------+
                                      | BRANCH #1 |
                                      +-----+-----+
                                            |
                                            V
                                      +-----------+
                                   +--+ COMMIT #4 |
                                   |  +-----------+
                                   |
+-----------+      +-----------+   |  +-----------+
| COMMIT #1 |<-----+ COMMIT #2 |<--+--+ COMMIT #3 |
+-----------+      +-----------+      +-----------+
                                            A
                                            |
                                      +-----+-----+
                                      | BRANCH #2 |
                                      +-----------+
```

There is one thing you might be asking yourself right now. You still have not created a branch, yet, you've been able to commit with no issues, how is that possible? Basically, Git creates a branch by default in every new repository called `master`. It's in master history where you have tracking changes so far.

It's also important to keep in mind that even though we learned how to create new branches, we are still stuck in master and every commit we create will be in that branch. That's because we still don't know how to tell Git what our current branch is. In the next lesson, we will learn how to do exactly that.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## In-depth

Branches are represented by plain text files in your Git directory:

    {grey}
    .git
    ├── HEAD
    ├── index
    ├── objects
    │   └── …
    ├── refs
    │   ├── {/grey}{green}heads{/green}{grey}
    │   │   ├── {/grey}{green}master{/green}{grey}
    │   │   └── {/grey}{green}my-branch{/green}{grey}
    └   └── tags{/grey}

The `heads` directory contains all your different branches. Each one only having a reference to the current commit:

```
> cat .git/refs/heads/master

  7fbc204b8f3c0f85d7e86f5982d2bffe27ea742b
```

Branches are automatically updated by Git when you commit or perform any other branch-related operation.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Create a new branch using the command
```
git branch {branch-name}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
