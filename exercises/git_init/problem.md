{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Create a new Git repository

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

To start using Git you first need to create a new repository.

A repository is nothing but a filesystem where you can keep track of all the changes performed on it.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

Internally, Git creates a folder where it stores all the information it needs with:
* All the files tracked in the filesystem (including all their versions)
* A tree-like data structure pointing to snapshots of the filesystem in a specific moment in time.
* Meta information such as descriptions, authors, etc.

You can take a look to all the things Git created for you, we will explain every folder and file in detail in the following exercises:
```
.git
├── HEAD
├── objects
└── refs
    ├── heads
    └── tags
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
