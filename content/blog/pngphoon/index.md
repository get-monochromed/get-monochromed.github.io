---
title: "PNGPHOON: Kinda cool Moonphase wallpaper generator"
date: 2023-01-03
draft: false
tags: [tools, wallpaper, unixporn]
summary: "A bitmap moon-phase wallpaper generator, and why X11 root-window tools still have a place on Wayland."
---
So, I was scrolling through reddit like usual, and found [this post](https://libreddit.kavin.rocks/r/unixporn/comments/zzqgjz/xmonad_bullshit_as_usual/) on r/unixporn of this person on XMonad on Gentoo setup. No bar, just black and white terminal, and this really cool bitmap moon wallpaper. In the description it said something like "Wallpaper is made with Xphoon".

I was like * Nani sore? * (￣▽￣*)ゞ. So, I did a bit of digging and found out that there's this program called [phoon](https://acme.com/software/phoon/) (PHase of mOON) which prints out the current phase of the moon in an ASCII art format.Then someone made a cooler version of it called [Xphoon](https://acme.com/software/xphoon/) (X PHase of mOON) which generates really high quality bitmap image of the phase of the moon and puts that as the background of the root X11 window.

"X11 root window". Boy I've'nt heard that name in ages, For the uninitiated, X11, the display server can have a background image, but you can only see it if you use a minimal window manager like XMonad, DWM etc, so chances that you will be able to see that background is pretty small if you are on a DE and such, also if you're on Wayland (like me), then, X11 is out of the question anyway.

So I looked again for similar shit, and found [pngphoon](https://svolli.de/software/pngphoon/) which is exactly like Xphoon but it generates the image as png and wont set it as a wallpaper, which is great, now I can use it anywhere!!!. Its super easy to install as well, both pngphoon and Xphoon are available in debian's main repo. (idk about other distros, I only use Debian now.) So the only thing I had to do was `sudo apt install pngphoon` and create a wallpaper using `pngphoon -w 1366 -h 768 -f moon768p.png -s 100` w,h & h flag are mandatory, use the exact resolution of your screen to get pixel perfect bitmap image, if you use a resolution thats not native then the wallpaper wont "pop" . -f is to give the file a name and its mandatory, -s is star density, increase the number for more stars.

Since I set my wallpaper using my own script, I have added pngphoon to it as well, so I can just do setbg -x to set that wallpaper on demand.
