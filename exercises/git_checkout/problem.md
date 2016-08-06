{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Move to another branch using
```
git checkout {branch-name}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Now that we know what branches are, we probably want to start moving between them. That's what `git checkout` is for. Try to move to your newly created branch.

Git will always store a reference to your working branch called `HEAD`. When you create a new repository, `HEAD` will be pointing to the master branch. Doing a checkout only means updating that pointer to reference other branch.

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
                         A
                         |
                   +-----+-----+
                   | BRANCH #2 |
                   +-----------+
```
{green}BEFORE DOING A CHECKOUT TO BRANCH #2{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER DOING A CHECKOUT TO BRANCH #2{/green}
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
                         A
                         |
                     +---+--+
                     | HEAD |
                     +------+
```
{green}BEFORE CREATING A COMMIT{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER CREATING A COMMIT{/green}
```
                   +-----------+
                   | BRANCH #1 |
                   +-----+-----+
                         |
                         V
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<-----+ COMMIT #2 |<--+--+ COMMIT #3 |
+-----------+      +-----------+   |  +-----------+
                                   |        
                                   |  +-----------+
                                   +--+ COMMIT #4 |
                                      +-----------+
                                            A
                                            |
                                      +-----+-----+
                                      | BRANCH #2 |
                                      +-----------+
                                            A
                                            |
                                        +---+--+
                                        | HEAD |
                                        +------+
```

From now on, all the commits you create will change `BRANCH #2` history instead of `BRANCH #1`.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

As we saw, Git keeps track of your current branch with a pointer called `HEAD`. This pointer is nothing but a file with the same name.

{grey}
.git
├── {/grey}{green}HEAD{/green}{grey}
├── index
├── objects
│   └── …
├── refs
│   ├── heads
│   │   ├── master
│   │   └── my-branch
└   └── tags{/grey}

You can print the contents of the `HEAD` file to see that it only contains the name of the branch its pointing to:

```
> cat .git/HEAD

  ref: refs/heads/master
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
