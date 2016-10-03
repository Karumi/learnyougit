{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Add a new file to your newly created Git repository with the command
```
git add {filename}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Right now your repository isn't tracking anything at all. Let's change that by adding a single file.

In order to do that you must first create a file. Use your favorite editor or the command `touch {filename}` to create an empty file.

Now we need to tell Git that we want to add that file to our repository by typing `git add {filename}` and voilà! Git now recognizes the file and has added it to its tracking system.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

When the command `git add` is executed, Git creates a `blob` object, which is nothing but the contents of the tracked file conveniently compressed. The path to this blob object is defined by the SHA1 of the contents of the file.

Git also creates all the metadata of the tracked file such as:
* Name of the file
* File permissions
* ...

You will notice your Git folder has changed. The two main differences are the index file and the objects folder:

    {grey}
    .git
    ├── HEAD
    ├── {/grey}{green}index{/green}{grey}
    ├── {/grey}{green}objects{/green}{grey}
    │   └── {/grey}{green}a1{/green}{grey}
    |       └── {/grey}{green}9abfea0f…{/green}{grey}
    ├── refs
    │   ├── heads
    └   └── tags{/grey}

The index file is just a description of what is going to be saved in the next snapshot. This is usually called the `index` or the `staging` area. It contains all the metadata for the files that have been added. You can take a look to your index with the following command:

```
> git ls-files --stage

  100644 a19abfea0… 0 file.txt

```

There is also a new `objects` directory. All Git objects follow the same naming format which is the SHA1 of its contents, 40 digits (2 in the folder name + 38 in the file name). In this case, the object is the blob object with the contents of the file we added to the index. You can see the data stored in a blob with the following command:

```
> git show a19abfea0

  Hello git-workshopper
```
{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
