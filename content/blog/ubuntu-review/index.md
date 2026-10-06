---
title: "Ubuntu isn't *that* awful!"
# A full timestamp with offset, so a post written today is not treated as
# future-dated (Hugo reads a bare "2026-10-05" as UTC midnight, which can be
# ahead of your local clock and would need `hugo -F` to appear at all).
date: 2026-10-06T18:20:03+05:30
draft: false
tags: []
summary: "ubuntu is better optimised? but snaps and gnome hold it back."
---
I havent used ubuntu as my main OS ever. All the 8+ years of using linux and never have I used ubuntu on anything but computer labs in schools and colleges. 

So I thought of using Ubuntu 26.04 LTS for a few days and see how it fares against Fedora KDE, which is my go-to distribution recently.

When you think of Ubuntu, the first thing that comes to mind is gnome with a few extensions and snaps and a whole lot of bad decisions that they made in the past! I didnt forget that whole amazon spyware thing lol.

As of writing this blog, I have not spent a large amount of time on Ubuntu. I think I have done about a few days and that too light use only. I haven't completely converted everything to Ubuntu because I havent gotten the time to set up every single thing that I have on the Fedora side to ubuntu. So my experience is mostly the basic one. I might make additions to this blog down the line when I have more things to say about ubuntu.

## Positives

### The looks
Modern Ubuntu does look good by default. I used to really really dislike the look of ubuntu, but its much nicer now than it used to look
![Ubuntu rice](ubuntu-rice.png)
I love the new changes to the folder icons as well.
The built-in extensions make GNOME slightly more usable by having quarter tiling, dock and desktop icons.

### Ubuntu/Debian base
since this is debian based, I can simply download a `.deb` file and install it. That is one of the major advantages of using Ubuntu over any other distribution. If any company makes a software available for Linux, the first candidate for support would be Ubuntu. That on top of the vast packages you already have on both ubuntu repos and snaps, you have a majority of software available to you. This becomes more obvious as you try to install stuff that are enterprise related.

Recently `.rpm` also seems to show up on many software I found on the web as well.
### Battery life is insane!
battery life seems to be good. system is idling very low wattage compared to Fedora. I cant figure out why exactly. My fedora machine used to idle at around 5-6W of total power draw (ie; total power draw from the battery), which I thought was good for an AMD CPU with no efficiency cores. But when I installed Ubuntu,  the same machine now idles at 3.5-4W more often. which is absurdly low. I tried adding a few tweaks to the Fedora system with powertop tuning, some kernel tuning and even letting the CPU run at 419Mhz when idling (which it was not able to do in fedora cus somehow the pstate driver locks the system to a minimum of 1.1Ghz)
I can get an pure idle power draw of about 4.5W and light text editing/chatting etc at 5W ish. 
![lowest wattage on Fedora](fedora-lowest-power.png)

Meanwhile stock ubuntu can do an idle draw of just 3.5W (even going as low as 3W once) ![Ubuntu lowest wattage](ubuntu-low-wattage.png)

You might think, oh its just 1-2 Watts. thats so small, almost neglible 🤣, but its not. I have a 45Wh battery, and if my computer hypothetically only uses about 5W of power, then I get a hypothetical battery life of 45/5= 9 hours. Now, if the machine is only using 3.5W instead of 5, now that hypothetical battery life goes up to 45/3.5 ≈ 13h. that is **3 more** hours than 5W. This is the same reason why Apple's laptops have insane battery life. The Macbook Neo only has 36.5Wh battery, but the whole machine only draws about 2.3-3.5W of power on light usage, giving the user about 36.5/3.5 ≈ 10.5h to 36.5/2.3 ≈ 16h of battery life.

This was my normal battery life I was able to achieve just from using the computer for light discord chatting, some web browsing and studying with a pdf open and idling.
![ubuntu battery life](ubuntu-battery-life.png)
One thing that I do not know about Ubuntut is whether or not GNOME Desktop Environment is the reason why I'm getting good battery life because I haven't thoroughly tested the KDE Kubuntu system yet. I just live booted it up on a USB stick and the power usage is similar to what I see on Fedora KDE, maybe slightly higher as well. So, it may or may not be GNOME related as well, I'm not entirely sure.

## negatives
1. **GNOME**
2. One of the first things that I saw as soon as I installed the distro is that, the app icons on the overview is extremely small compared to what it is on GNOME. I was able to fix it by installing an extension (this is going to be a trend lol)
3. Snap do not have the same level of packages that flatpaks have, therefore the chance of you finding an application as flatpaks is significantly higher than the ones you would find on Snap. I tried finding programs like Gnome Tweaks and a few others as snaps from the App Store but they don't exist. Helium browser also does not exist but discord was there so a few programs are there but not a lot of them.
4. sushi (the program that gives you space bar preview in file manager) is not preinstalled for some reason, so is curl and a few other software. 
5. snaps dont work half the time.
    -  I tried installing opencode desktop as a snap, it throws some errors on launch and crashes.
    - I tried installing gnome boxes as a snap, and it will let me create a VM and install and OS to it, but when I want to boot up the installed OS, the app crashes **every single time**
    - I installed Kdenlive to edit a video, and the icon for Kdenlive is not showing up
    
    If snaps worked properly when I installed them, I would've had a better opinion about it.
