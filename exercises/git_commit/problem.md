{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Commit your staged files with the command
```
git commit -m {message}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Now that you have, at least, one file ready to be tracked, we can tell Git to create a snapshot. This means that we are going to store the state of all tracked files at this moment. To do that we use the command `git commit`.

If we execute it with no additional parameters Git will open a text editor asking you for a message to describe what you are about to store. You can also tell Git what your message is directly from command line with the parameter `-m {message}`.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

To store the tracked files, Git builds `tree` and `commit` objects. Tree objects are a like directories, they store names, permissions and pointers to other objects, be it blobs or other trees. In the other hand, commit objects store a pointer to a tree and all the metadata related to the snapshot, that means, committer name, creation timestamp, message, etc.

If we take a look at your Git directory you can see there are more objects now. These are the tree and commit objects you just created:

```
.git
├── HEAD
├── index
├── objects
│   ├── 18
│   │   └── 611beb72…
│   ├── 87
│   │   └── 1e25a902…
│   └── a1
│       └── 9abfea0f…
└── refs
    ├── heads
    └── tags
```

You can take a look at the tree object by executing the following command:

```
> git ls-tree 18611beb72

  100644 blob a19abfea0… file.txt
```

As we've already seen, a tree stores a list with all its contents. From left to right, that means file permissions, type of the object, hash of the file and name.

Commit objects can be inspected as follows:

```
> git show -s --pretty=raw 871e25a902

  commit 871e25a902ed4309e94c2f39aa7102557a380f49
  tree 18611beb7265e1af0b87190179be4d78ef80862a
  author Sergio Gutierrez <sergio@gokarumi.com> 1458666886 +0100
  committer Sergio Gutierrez <sergio@gokarumi.com> 1458666886 +0100

    First commit
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
