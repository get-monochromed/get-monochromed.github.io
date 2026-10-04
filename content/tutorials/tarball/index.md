---
title: "Tarballing without any fuzz"
date: 2023-02-01
draft: false
tags: [linux, cli]
summary: "tar xzf, tar czf, and the mnemonic that actually makes them stick."
---
Ok.. Here's a quickie.

> you get a tarball from github or some shit

> You: how extract? (insert confused oonga boonga here)

Dont be that guy!

### This is the actual command

```
# Extracting a tarball
tar xzf file.tar

# Creating a tarball
tar czf file.tar Folder
```

### This is how you remember (by becoming Ze German)

```
# Extracting a tarball
# tar Xtract Ze File file.tar i.e;
tar xzf file.tar

# Creating a tarball
# tar Create Ze File file.tar
tar czf file.tar Folder
```

If you want the verbose output as well, which you always want to have, the thing becomes

```
# Extracting a tarball
# tar Xtract Ze Vucking File file.tar i.e;
tar xzvf file.tar

# Creating a tarball
# tar Create Ze Vucking File file.tar
tar czvf file.tar Folder
```

Now open tarballs without doing `tar --help`
