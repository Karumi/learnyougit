{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Create a new tag using the command
```
git tag {tag-name}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Git branches are updated when creating commits, but sometimes, we want to store a reference to a very specific version of our files and keep it there. Tags are the solution to that problem. Like branches, tags are also a pointer to a commit but they are not updated when creating new snapshots.

There are two types of tags, `lightweight` and `annotated`. The key difference being that the former are just a reference to a commit while the latter can be signed or have a message of their own. To create a lightweight tag just use the command `git tag {tag-name}`. If you want to create an annotated tag instead, use `git tag -a {tag-name}`.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

Inside Git, tags are just another type of reference:

    {grey}
    .git
    ├── HEAD
    ├── index
    ├── objects
    │   ├── {/grey}{green}f1{/green}{grey}
    │       └── {/grey}{green}25c5e653…{/green}{grey}
    │   └── …
    ├── refs
    │   ├── heads
    │   └── {/grey}{green}tags{/green}{grey}
    │       └── {/grey}{green}my-annotated-tag{/green}{grey}
    └       └── {/grey}{green}my-lightweight-tag{/green}

In the case of lightweight tags, Git stores a reference to the commit it's pointing:

```
> cat .git/refs/tags/my-lightweight-tag

  f366dcd55917499fe56b5f17a20e738f90214d6d
```

In the case of annotated tags, they hold a reference to a new `tag` object. Is in this tag object where all the metadata is stored:

```
> cat .git/refs/tags/my-annotated-tag

  f125c5e653cadd84c491200c0f4d78574c1a03e0

> git show -s --pretty=raw f125c5e653cadd84c491200c0f4d78574c1a03e0

  tag my-annotated-tag
  Tagger: Sergio Gutierrez <sergio@gokarumi.com>

  This is an annotated tag

  commit f366dcd55917499fe56b5f17a20e738f90214d6d
  tree 993f122c6730b0cba7800dbeace3772f788fd5ae
  parent 8015528d2189f64f814a0e022d37b6ccbd3fedb3
  author Sergio Gutierrez <sergio@gokarumi.com> 1470482062 +0200
  committer Sergio Gutierrez <sergio@gokarumi.com> 1470482062 +0200

    This is a commit
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
