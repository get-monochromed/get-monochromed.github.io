---
title: "Ranger with sixel support"
date: 2022-12-19
draft: false
tags: [linux, wayland, terminal]
summary: "Building ranger from a sixel-preview fork, because Ueberzug does not work under Wayland."
---
I personally use Sway as my window manager, which means I use wayland. But since wayland works in a different way compared to X11, some X11 programs won't work on wayland. One of which was Ranger's image previews. In my X11 days, I just used Ueberzug, but it won't work on Wayland, but the terminal I was using did support sixel image previews. So I was on the hunt to find a fork of ranger that works with sixel.

There is a chance that ranger will get sixel support soon, but for the time being you will have to compile from source.

```
git clone https://github.com/3ap/ranger
cd ranger
sudo make install
ranger --copy-config=all
vim $HOME/.config/ranger/rc.conf
set preview_images_method sixel
```

But... If you are using Arch Linux, then you only have to do `yay -S ranger-sixel-git`
