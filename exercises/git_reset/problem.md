{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Create a new commit in your current branch with

`touch {some-file}`
`git add {some-file}`
`git commit -m "Add a brand new file"`

Then move to the `master` branch

`git checkout master`

Reset `master` to point to the new commit

`git reset --hard {branch-name}`

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

We need to make a stop in the road to explain one of the most useful tools in Git, that is, `git reset`. Generally speaking, this tool lets you take files from one commit or branch and bring them to your working directory.

There is a lot to say about `git reset`, if you feel like learning how does it work go directly to the `Internals` section. If not, here are some useful examples of how git reset can be used.

`git reset HEAD` "Unstages" changes. It can be seen as the opposite operation of `git add`.
`git reset --hard HEAD` Cleans up all your current work, staged or not (Be careful, this means you won't be able to recover your changes).
`git reset --soft HEAD~` Moves your branch to the previous commit. All the changes in the current commit will be "moved" to the staging area.
`git reset --hard {commit|branch}` Moves your current branch to point to the specified commit or branch. Cleans your current changes.

Just a quick note on the `HEAD` notation we used. Besides using branch names and commit hashes, Git can also resolve commits by moving relatively to other commits. `HEAD` means the commit our current branch is pointing to. The `~` modifier is telling Git to use the parent commit of whatever is suffixing, `HEAD~` is the parent of the commit pointed by HEAD but we can also use `master~` or even `5628cd3~`. You use the `~` operator as many times you want, this is a valid commit `HEAD~~~~~` but there is a shorter way of writing that which is `HEAD~5`. There are several other ways of referencing commits, you can find more details in https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

We already learnt how Git has a special place for every change that is about to be committed: the index or the staging area. Besides that, Git also handles two more places, sort of speak. One is the working directory area, that corresponds with all the files living in your filesystem. The last one is whatever your HEAD pointer is pointing to.

All your git commands modify at least one of the three areas in one way or another. We can see how they evolve when doing regular work.

{green}> touch new.txt{/green}
```
+-----------+---------+---------+
|  WORKING  |  INDEX  |  HEAD   |
| DIRECTORY |         |         |
+-----------+---------+---------+
| new.txt   |         |         |
+-----------+---------+---------+
```
{green}> git add new.txt{/green}
```
+-----------+---------+---------+
|  WORKING  |  INDEX  |  HEAD   |
| DIRECTORY |         |         |
+-----------+---------+---------+
| new.txt   | new.txt |         |
+-----------+---------+---------+
```
{green}> git commit{/green}
```
+-----------+---------+---------+
|  WORKING  |  INDEX  |  HEAD   |
| DIRECTORY |         |         |
+-----------+---------+---------+
| new.txt   | new.txt | new.txt |
+-----------+---------+---------+
```

What does `git reset` have to do with all this? It basically is the tool that lets you modify your repository areas as you wish.

Reset can be thought as a three steps process. Each step affecting one of the three described areas. Imagine we start with the following state:

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
| COMMIT #1 |<-----+ COMMIT #2 |
+-----------+      +-----------+
```

```
+-----------+---------+---------+
|  WORKING  |  INDEX  |  HEAD   |
| DIRECTORY |         |         |
+-----------+---------+---------+
| v2.txt    | v2.txt  | v2.txt  |
+-----------+---------+---------+
```

### Step 1: Update your HEAD

Takes your current branch (the one HEAD is pointing to) and moves it to the specified commit. Notice how the HEAD area now has a different version of the files.

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
| COMMIT #1 |<-----+ COMMIT #2 |
+-----------+      +-----------+
```

```
+-----------+---------+---------+
|  WORKING  |  INDEX  |  HEAD   |
| DIRECTORY |         |         |
+-----------+---------+---------+
| v2.txt    | v2.txt  | v1.txt  |
+-----------+---------+---------+
```

### Step 2: Update your index

Now Git resets your index area to be exactly like the specified commit.

```
+-----------+---------+---------+
|  WORKING  |  INDEX  |  HEAD   |
| DIRECTORY |         |         |
+-----------+---------+---------+
| v2.txt    | v1.txt  | v1.txt  |
+-----------+---------+---------+
```

### Step 3: Update your working directory

Finally, it makes your working directory looks exactly like the specified commit. This means it will wipe out whatever your files were and replace them by the ones you stored in the given commit.

```
+-----------+---------+---------+
|  WORKING  |  INDEX  |  HEAD   |
| DIRECTORY |         |         |
+-----------+---------+---------+
| v1.txt    | v1.txt  | v1.txt  |
+-----------+---------+---------+
```

In which step the reset command stops is up to you and is configurable. `--soft` Stops after executing step 1, `--mixed` (or nothing) stops after executing step 2, `--hard` executes the three steps.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

Let's go back to some of the examples I wrote before and see what do they do:

`git reset HEAD`

In this case, the `--mixed` option is used because is the default configuration.
    [1] Git will first reset the current branch to point to whatever is already pointing (that means it does nothing in the first step).
    [2] Git will leave the index exactly as it is in the current commit. That means all the changes you included with `git add` won't be staged.

`git reset --soft HEAD~`

    [1] Git will move the current branch to the previous commit. Because your index and your staging area won't be affected that means that you will still have all your changes present in both areas. This is why the changes of the previous HEAD will be displayed in your index along with the modifications you already had in your working directory.

`git reset --hard {commit|branch}`

    [1] Git will move your current branch to point to the specified commit.
    [2] It will then update your staging area to look exactly as the selected commit.
    [3] Finally, it will make your working directory exactly as it is in the commit.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
