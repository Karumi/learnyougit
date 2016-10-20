{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

To start using Git you first need to create a new repository.

A repository is nothing but a filesystem where, besides storing all your data, you can keep track of all the changes performed on it.

There are several ways of creating a repository, we will use the simplest one though, which is to create it with the command `git init`

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## In-depth

When we run `git init`, Git creates a folder in your current directory called `.git`. This folder stores, among other things:
* All the files contents tracked by Git (including all the different versions of the same file)
* A tree-like data structure representing folders at specific points in time.
* Metadata such as descriptions, authors, file permissions, etc.

You can take a look to all the things Git created for you, we will see what most of the folders and files are in detail in the following exercises:

    {grey}
    .git
    ├── HEAD
    ├── objects
    └── refs
        ├── heads
        └── tags{/grey}

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Create a new Git repository with the command
```
git init
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
