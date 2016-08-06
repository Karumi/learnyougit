{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Create a new branch using the command
```
git branch {branch-name}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Branches are the way Git has to handle different timelines in your files. As we just saw in the previous lesson, commits always keep a reference to its parent commit. That means we keep a linear history of our files. With branches we can have multiple of those histories.

Think as a branch as just a name for the history you are working on. When you create a commit, you are just adding a snapshot to your current branch. Whatever you do in a branch won't affect others.

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
{green}BEFORE CREATING COMMIT IN BRANCH #1{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER CREATING COMMIT IN BRANCH #1{/green}
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

There are two things you might be asking yourself right now. You still have not created a branch, yet, you've been able to commit with no issues, how is that possible? Basically, Git creates a branch by default in every new repository called `master`, it's in master history where you have tracking changes so far. The second thing you probably noticed is that you didn't specify Git in which branch you want to create a commit. That's because Git always keep a reference to your current working branch called `HEAD`. By default, most Git commands will work using that reference to know where to work.

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
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<-----+ COMMIT #2 |<-----+ COMMIT #3 |
+-----------+      +-----------+      +-----------+
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

Branches are represented by plain text files in your Git directory:

    {grey}
    .git
    ├── {/grey}{green}HEAD{/green}{grey}
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

You can also print the contents of the `HEAD` file to see that it only contains the name of the branch its pointing to:

```
> cat .git/HEAD

  ref: refs/heads/master
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
