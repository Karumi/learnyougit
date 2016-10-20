{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Description

Now that you are able to create your own repositories, commit and create branches and tags, you must be willing to share your work with others. This is where remotes comes into play. A remote is just a URL where you can upload your work and download others work. You can have as many remotes as you want and give them names.

In order to add a new remote to your repository you'll need to execute `git remote add {remote-name} {remote-url}`, for example, `git remote add origin git@github.com:Karumi/learnyougit.git`. `origin` is a special remote name, it's the one Git uses by default when loading a repository directly from a remote with `git clone`. There are other `git remote` operations like `remove`, `rename` or `prune`. You can check what do they do by typing `git remote --help`.

Once the remote has been added, you can load whatever that remote contains into your local repository. This is done with the command `git fetch {remote-name}`. This won't modify your files or branches in any way. All branches coming from the remote will be kept separated from your local ones and will be prefixed with the name of the remote, e.g. `origin/my-branch`.

Keep in mind that you don't have control over remote branches from your local repository. This means that if you do a checkout to a remote branch (with `git checkout origin/my-branch`), your commits won't affect that branch, that would be a huge synchronization problem!. Instead, Git will point to the latest commit of the remote branch and will warn you of being in detached HEAD state.

In the following lesson we will learn how to upload your changes to a remote.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## In-depth

Remotes information is stored in the `config` file

    {grey}
    .git
    ├── HEAD
    ├── index
    ├── {/grey}{green}config{/green}{grey}
    ├── objects
    │   ├── …
    ├── refs
    │   ├── heads
    └   └── tags{/grey}

Besides the remotes information, the config file contains lots of other things such as settings for your repository. Being a plain text file you can easily take a look:

```
> cat .git/config

  ...
  [remote "origin"]
    url = git@github.com:Karumi/learnyougit.git
    fetch = +refs/heads/*:refs/remotes/origin/*
```

There is an easier way to see all the information stored for a remote:

```
> git remote show origin

  * remote origin
    Fetch URL: git@github.com:Karumi/learnyougit.git
    Push  URL: git@github.com:Karumi/learnyougit.git
    HEAD branch: master
    Remote branch:
      master tracked
    Local branch configured for 'git pull':
      master merges with remote master
    Local ref configured for 'git push':
      master pushes to master (up to date)
```

Besides the URLs used to download and upload information, Git also links local branches with remote ones. It does that so that remote-related calls like `git pull` and `git push` (that we will see in later lessons) can be automatically executed without specifying which remote branches are being updated.

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}

## Task

Link your local repository to the learnyougit repository
```
git remote add {remote-name} git@github.com:Karumi/learnyougit.git
```

Download all the remote information
```
git fetch {remote-name}
```

{cyan}──────────────────────────────────────────────────────────────────────{/cyan}
