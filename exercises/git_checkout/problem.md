{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Now that we know what branches are, we probably want to start moving between them. That's what `git checkout` is for. Try to move to your newly created branch adding its name to the end of the command: `git checkout {branch-name}`.

Git will always store a reference to your working branch called `HEAD`. When you create a new repository, `HEAD` will be pointing to the master branch. Doing a checkout to a branch only means updating that pointer to reference the specified branch.

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

Git also lets you move to specific commits by using their hash (or partial hash if there is no conflict with other hashes), e.g. `git checkout 871e25a9`. Git calls this situation to be in a `detached HEAD` state, meaning, your HEAD isn't pointing to a branch but a commit. If Git finds itself in this situation, it won't update any branch when creating new commits.

```
+-----------+        +------+
| BRANCH #1 |        | HEAD |
+-----+-----+        +---+--+
      |                  |
      V                  V
+-----------+      +-----------+
+ COMMIT #1 |<-----+ COMMIT #2 |
+-----------+      +-----------+
```
{green}BEFORE CREATING A COMMIT{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER CREATING A COMMIT{/green}
```
+-----------+                           +------+
| BRANCH #1 |                           | HEAD |
+-----+-----+                           +---+--+
      |                                     |
      V                                     V
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<-----+ COMMIT #2 |<-----+ COMMIT #3 |
+-----------+      +-----------+      +-----------+
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## In-depth

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

If your HEAD is pointing to a commit, it will contain its hash instead:
```
> cat .git/HEAD

  d57d319c4057b02c8095c2e7c7daedc9c6194f93
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Move to another branch using
```
git checkout {branch-name|commit}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
