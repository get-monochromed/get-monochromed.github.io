---
title: "Gaming on Linux Is Not That Bad (terms and conditions apply*)"
# A full timestamp with offset, so a post written today is not treated as
# future-dated (Hugo reads a bare "2026-10-05" as UTC midnight, which can be
# ahead of your local clock and would need `hugo -F` to appear at all).
date: 2026-10-22T23:08:32+05:30
draft: false
tags: []
summary: "I got an old gaming laptop as a hand made on from my younger brother, I installed Fedora on it and gaming on it is mostly fine (except for some initial issues)"
---

So recently my younger brother got himself a new gaming laptop Laptop, HURAAAYY (mfer needed a new machine for a while now), Lenovo LOQ something something, I don't remember the rest of it's name. Its decent, an Intel core i7 and RTX 5060 GPU.

His previous machine, an HP Victus (yes it has a fucked hinge as well, classic HP) from 5 years ago was retired. So I took it from him. its older, and a notch lower in quality and performance compared to his new one. but it should be fine for basic gaming that I do.

It has the crazy, over-the-top, ultra-high end specs of....
- Ryzen 5 5600H 6 core CPU
- RTX 3050 4GB VRAM card @ 75W
- 16 GB DDR4 3200 MT/s (came stock with 8 gigs)
- 2 x 512 GB SSD (2nd drive I added later)
- 16 inch 1080p 45% NTSC **piss tier** screen at 60Hz

I did a whole thermal paste and putty redo as my first job since the system was running at 100°C on both CPU and GPU before hand. the fans were clogged, the termal paste and putty have more resemblance to concrete than paste. That side quest took a week extra than needed. Think of it as a DnD game where you roll a 2 instead of the required 5, so you gotta do the long route. Tough luck I guess. I had thermal paste with me, but I wasnt expecting the thermal putty on the machine. I had thermal pads and I thought that would be fine, but then realised that the pads being 1mm thick is actually thicker than it should be (im assuming it needs 0.5mm) so the GPU die simply wont touch the heatsink at all. Yikes, almost killed the GPU chip altogether lol cus it shutdown instantly when I tried to run a game on it. So ordered new paste and putty and that took a while to arrive. 

I initially considered sticking with Windows 11. It came preinstalled with the necessary drivers and software, so I could simply download my games, and start playing.
However, Windows has a habit of accumulating leftover files over time. After years of installing and uninstalling programs, I could barely fit 200–250 GB worth of games and other software on a 512 GB drive, despite trying my level best to clean up unnecessary files and software etc.
RAM was another problem. Windows idled at around 7–8 GB, leaving little for games. Running Cyberpunk used about 95% RAM. Upgrading to 32 GB of DDR4 would cost nearly $200, which I couldn't justify currently.

2 options: 
- perform a fresh, lightweight Windows installation using something like AtlasOS or Tiny11
- or switch to Linux... 

DUHHH DUHHHH DUHHHHHHHHHH....

My experience with gaming on linux had been hit or miss (I guess they never miss, huh!). I once got Cyberpunk 2077 running surprisingly smoothly on my ThinkPad, which isn't even a gaming machine, but games installed through Bottles or Steam had often gave me trouble.

I wanted to give Linux gaming another shot to see whether things had improved. Previously, I'd been using tiling window managers like Sway, which might have contributed to some of the issues (probably most of it tbh). I figured Fedora KDE would provide a more conventional gaming experience, especially since SteamOS also uses KDE Plasma.

So I installed Fedora KDE on the Victus.

# my GPU was stuck at 30W
My experience with Fedora KDE had been pretty mint on my ThinkPad, so I installed the same setup on the Victus. Unfortunately, **the first issue....** (oh maa gaawd bruuuh) **SIGH... this gonna be long..** The RTX 3050 refuses to draw more than 30 watts, Previously from my fucked up thermal pad work, it didnt pull beyond 20W due to risk of frying itself, but after doing it properly, I did run games on windows and the system did pull the whole 75W cleanly. so it aint me this time, I fucking swear!

So, this made absolutely no sense. I double-checked the power profiles, set everything to performance mode, and even installed Omen Space (cool program btw), an alternative to HP's Omen Gaming Hub, to configure performance modes and force the fans to run at maximum speed.

Nothing worked.

I was so incredibly frustrated and seriously considered ditching Linux and going back to Windows. I even left an AI agent working on the problem for **several FUCKING hours**, using maximum reasoning effort. I switched models from DeepSeek Max to GLM Max, but neither managed to identify the issue.
About five or six hours into troubleshooting, I thought... fuck it...lemme try free version of ChatGPT in the browser. final try, if this aint working, I'm packing bags and going back to Windows.

Within **15 FUCKING minutes**, it had figured out the problem.

It turned out to be related to HP's power-management driver, which apparently didn't recognise my laptop's particular product identifier. As a result, the expected power limits weren't being applied correctly.
ChatGPT wrote me a patch for the driver, and once I applied it, the GPU's power limits behaved as expected:

- **Low power mode:** 30 W
- **Balanced mode:** 60 W
- **Performance mode:** 75 W

**FUCKING FINALLY!!!!!!**
## The war against Bottles
Bottles is a pain. Sometimes, a game works brilliantly with no configuration or tweaking needed. Other times, something breaks, and I have absolutely no idea why. One issue I encountered appeared to involve filesystem permissions. Bottles is a Flatpak, so its access to files is severely limited.

For example, I could try launching a Windows executable from a folder, I see nothing..., I open btop to check for exe stuff, I see something showing up for a second and dissapearing again. Bottles just needs the permissions to access that folder but it doesnt tell you that it needs it in the first place.. BRUH...
At some point, something else in bottles also broke, and I couldn't figure out what exactly happened. Thankfully,an agent managed to troubleshoot and fix it

Once bottles is set-up correctly, its great!

## Cyberpunk 2077 on Bottles
*Cyberpunk 2077* was the first game I properly tested after fixing everything. I put the game in my games directory, launched it through Bottles, and it launched without any other issues. I was getting anywhere from 60-100 FPS (with framegen lol) on SteamDeck preset, 1080p DLSS Balanced. I only got 4 gigs of vram, so it does dip to 30-40 fps at times, but mostly its about 60 ish or a bit more.

Cyberpunk ran at 40 FPS on my ThinkPad with the same setup, so its better than my previous try, and now I can use DLSS rather than FSR. FSR is soo ass bro, im not even joking. ugh.... I'm all team red, but DLSS is sooooo miles ahead you have no idea. I could run the game at DLSS performance and not see much of a degradation. FSR on balanced looks like dogshit.

## Celeste on Steam
Next up, I had *Celeste* on steam, ngl I fuckng hate that game, its sooo hard, so I dont even play it anymore. Game installed and launched fine, but there was some sort of graphical glitch around the lighting bloom around the charecters and lamps werent working either. Took a while to figure which issue it was as well, cus the traditional googling is incredibly slow and useless.
ChatGPT to the rescue again, 10-15 minutes with it, and it recommended me to just try the OpenGL version of the game in Steam. That fixed it for me.


## Cotrol on Epic games
I then moved on to Epic Games, another platform where I already had games. I installed Heroic Games Launcher, logged into my Epic account, and downloaded *Control*. The game launched without any issues, which was encouraging, but.... as always, has to have some issues.. **right!** **RIGHT!!**
At the beginning of the game, there's an FBI logo with a big ass eagle on the floor. With DLSS enabled, the logo looked like an indistinguishable, extremely low-resolution 32x32 pixel smear. Nobody could identify what that would be from that smear of an iamge. But that only exists with DLSS enabled. Turning that off seems to fix all the issues.
I'm not entirely sure whether this is a Linux-specific issue, a problem with DLSS, or simply a bug in the game itself. Either way, *Control* was perfectly playable once I turned DLSS off.

## Red Dead Redemption 2 on Bottles
Finally, I tried *Red Dead Redemption 2*. I was expecting to fix a ton of issues, but tbh. it ran fine. zero issues. I just had to change graphics to "optimised settings" to get solid 60 FPS. without it, it looked worse while running at 30 FPS.
I suppose I can't complain about that 🤣.

## But broooo! Hybrid Graphics issues?
There's a lot of discussion online about problems with laptops that have both integrated and dedicated graphics,  when running Linux. I haven't encountered those problems so far. I have no fucking clue what Nvidia Optimus Prime transformers shit even is.

Games launched through Steam, Heroic and Bottles seem to automatically use the Nvidia GPU when needed. I didn't have to manually configure anything at all. At least on my particular setup, hybrid graphics has worked well

## Battery Life is not awful, but it aint no ultra light.
Battery life is kinda dogshit on gaming laptops typically. While doing basic light weight tasks, its using about 10-15W. meanwhile the same kinda job would use only 6-7W (hahahahahaha.. i fucking hate this number) and being more snappy overall.
I'm not particularly concerned about it. This is a gaming laptop, and its performance is kneecapped when running on battery power. Anything beyond basic browsing or lightweight tasks is best done while plugged in. For lighter use, I used it for 3 or so hours and still had about 30% of charge remaining. So probably 4.5 ish hours before it goes down to very low levels.

## I might keep linux for a while

Gaming on Linux is a little bit more annoying than gaming on Windows, but the overall operating system experience is much nicer, so its a compromise I can live with. Once I fixed HP's GPU power-management issue and sorted out the Bottles configuration, most games worked well. Cyberpunk 2077, Celeste, Control, and Red Dead Redemption 2 all became playable, with only a few game-specific quirks to work around.
Cyberpunk ran with roughly 9-10 GB of total system memory use compared to 15 gigs on Windows.So I can actually run a browser or discord while the game is running.

My laptop is about 5 years old now. Linux support on random obscure hardware generally is already on the kernel since day 1 or takes 6 months to a year or so to show up on it. My desktop had a wifi chip with no linux support, but now there is one! (after a year or 2.) So a more modern machine might have more issues than I had. I had that weird HP driver bug which shouldnt be there, this shit is old bro, but thats just how it is.

I will keep running this machine on linux until I find something I really need windows to do.
