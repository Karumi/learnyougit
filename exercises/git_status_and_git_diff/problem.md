{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

No task for this lesson. You can go to the next lesson by simply running `git-workshopper verify`.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

So far, we've been doing lots of changes in our file history but we have no way of knowing, for example, which files are in staging. This is where `git status` and `git diff` come into play.

One of the many things `git status` lets us do is to tell you the state of your files. Let's see what its output looks like:

    {grey}
    # On branch master                                  ] <- {/grey}{green}Current branch{/green}{grey}
    # Changes to be committed:                          ┐
    # (use "git reset HEAD <file>..." to unstage)       |
    #                                                   |
    #modified: file.txt                                 | <- {/grey}{green}Files in the repository with staged changes{/green}{grey}
    #                                                   ┘
    # Changes not staged for commit:                    ┐
    # (use "git add <file>..." to update what will ...  |
    # (use "git checkout -- <file>..." to discard ...   |
    #                                                   |
    #modified: other_file.txt                           | <- {/grey}{green}Files in the repository with non staged files{/green}{grey}
    #                                                   ┘
    # Untracked files:                                  ┐
    # (use "git add <file>..." to include in what ...   |
    #                                                   |
    #another_file.txt                                   ┘ <- {/grey}{green}Files not found in the repository{/green}

In the other hand, `git diff` lets us see exactly what changes are being done in the repository. When no arguments are provided, this command will show us the changes that have not been staged. If you want to see what is staged use `git diff --staged` instead. Here is an example of what `git diff` outputs:

    {grey}
    diff --git a/text.txt b/text.txt                    ] <- {/grey}{green}File name changes{/green}{grey}
    index 30e6813..8c7c8d2 100644                       ] <- {/grey}{green}Revisions being compared{/green}{grey}
    --- a/text.txt                                      ┐
    +++ b/text.txt                                      |
    @@ -1 +1,2 @@                                       | <- {/grey}{green}Content changes{/green}{grey}
        -Hello people!                                  |
        +Hello world!.                                  ┘
    {/grey}

Lines starting with the `-` symbol are lines that have been removed whereas lines starting with `+` has been added.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Internals

These two tools work with the same trees we studied in the previous lesson: `working directory`, `index` and `HEAD`. What we see when running any of the two commands are the differences between those trees. Staged changes are the ones present in the `index` tree but not in `HEAD`. Unstaged changes are the ones present in the `working directory` but not in the `index`.

Keep in mind that we are talking about "changes" and not files. That's intentional, we can add some changes in a file to staging and, afterwards, modify it even more. In that case, a file can appear in the two first sections of the `git status` output. What Git is trying to tell us is that there are some changes in that file that are staged and others than don't.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
