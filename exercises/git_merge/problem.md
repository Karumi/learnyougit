{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Merge two branches where fast-forward can be applied:
```
git checkout merge-lesson/base-branch
git merge merge-lesson/fast-forward-branch
```

Merge two branches with conflicts and solve them taking all the changes from the conflicts-branch:
```
git checkout merge-lesson/base-branch
git merge merge-lesson/conflicts-branch
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

In a previous lesson we learned how to upload your changes and we talked about how your work can have conflicts with others work. The main tool that lets you solve this kind of situations is `git merge`. In essence, the merge command just unifies two branches history into one:

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
+-----------+      +-----------+
| COMMIT #1 |<--+--+ COMMIT #2 |
+-----------+   |  +-----------+
                |
                |  +-----------+
                +--+ COMMIT #3 |
                   +-----------+
                         A
                         |
                   +-----+-----+
                   | BRANCH #2 |
                   +-----------+
```
{green}BEFORE MERGING BRANCH #2 INTO BRANCH #1{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER MERGING BRANCH #2 INTO BRANCH #1{/green}
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
| COMMIT #1 |<--+--+ COMMIT #2 |<--+--+ COMMIT #4 |
+-----------+   |  +-----------+   |  +-----------+
                |                  |
                |  +-----------+   |
                +--+ COMMIT #3 |<--+
                   +-----------+
                         A
                         |
                   +-----+-----+
                   | BRANCH #2 |
                   +-----------+
```

One important thing to notice is that we only modify the branch we are in. The branch we are merging from stays unmodified. In the diagram above we can see how Git creates a new commit with two parents called a merge commit. This merge commit contains a mix of the files of the two branches.

The merge process we've seen is a rather complex one. There are other situations where Git can apply a more simple solution. Imagine we now want to merge `BRANCH #1` into `BRANCH #2`, that means, we want `BRANCH #2` to share history with `BRANCH #1`. In that case, by default, Git will not create a new commit but will just move forwards the commit `BRANCH #2` is pointing to.

```
                                      +-----------+
                                      | BRANCH #1 |
                                      +-----+-----+
                                            |
                                            V
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<--+--+ COMMIT #2 |<--+--+ COMMIT #4 |
+-----------+   |  +-----------+   |  +-----------+
                |                  |
                |  +-----------+   |
                +--+ COMMIT #3 |<--+
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
{green}BEFORE MERGE BRANCH #1 INTO BRANCH #2{/green}
{green}- - - - - - - - - - - - - - - - - - - - - - - - - - - -{/green}
{green}AFTER MERGE BRANCH #1 INTO BRANCH #2{/green}
```
                                      +-----------+
                                      | BRANCH #1 |
                                      +-----+-----+
                                            |
                                            V
+-----------+      +-----------+      +-----------+
| COMMIT #1 |<--+--+ COMMIT #2 |<--+--+ COMMIT #4 |
+-----------+   |  +-----------+   |  +-----------+
                |                  |        A
                |  +-----------+   |        |
                +--+ COMMIT #3 |<--+        |
                   +-----------+            |
                                      +-----+-----+
                                      | BRANCH #2 |
                                      +-----------+
                                            A
                                            |
                                        +---+--+
                                        | HEAD |
                                        +------+
```

There might be conflicts when creating the merge commit if the two branches have modifications over the same files. When this happens, Git will suspend the merge task and let you know which files have conflicts with a message similar to the following:

```
Auto-merging something
CONFLICT (content): Merge conflict in file.txt
Recorded preimage for 'file.txt'
Automatic merge failed; fix conflicts and then commit the result.
```

When this happens, Git marks the conflicting lines with marking characters:

```
<<<<<<< HEAD
Something I wrote just now
=======
Something else I wrote right now
>>>>>>> master
```

The top part is what your current branch has, in this case, the sentence `Something I wrote just now`. The bottom part is the contents of the branch you are merging to. Once you decide which version you like more (you can even create a mix of the two), remove the conflict marks and add the file to your index with `git add`. Remember Git just suspended the merge task? When you finish solving conflicts and marking them as resolved (by adding them to the staging area), just commit your merge changes with `git commit`. Git will know that your commit has been built from a merge and will automatically set a message for you.

Congratulations, now you know how to collaborate with others more efficiently! There is another way to mix your work with others and that is `git rebase`, we will see how it works in our next lesson.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

How the merge tool works can be summarized in the following rules:
1. If one of the branches is subhistory of the other (that means that all commits of one of the two branches are in the other branch as well):
  * Apply `fast-forward`. If your current branch is the one behind, Git will only move it forwards to point to the same commit the merged branch is pointing to. If your current branch already contains all the other branch commits, then Git doesn't modify your branch.
2. Else:
  * Create a new commit with two parents, your current branch and the branch being merged.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
