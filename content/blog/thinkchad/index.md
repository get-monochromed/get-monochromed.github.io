---
title: "Mekkbook to ThinkChad"
date: 2023-01-17
draft: false
tags: [thinkpad, hardware, linux]
summary: "How I found a bucket of old ThinkPads in Bangalore and walked out with an X220 for 8000 rupees."
---
As you might know, almost all the linux user's end goal is to use an old ThinkPad, that was true even for me, but boy o boy is it hard to find. Almost all the ones in amazon are scams and are marked up really high. The only one that I was thinking of getting was the Liberated ones sold by Libretech.shop, which is a bangalore based libre thinkpad shop, where they sell thinkpads with coreboot and librewifi cards. But they arent cheap either.

## The backstory

One day, I was actually in bangalore, and I found this OLX ad that showed a bucket full of old thinkpads with the ad name being "Lenova Thinkpad". Took me a while to track down the goddamn store, cus the location in google maps was pointing at the middle of a cross section, not the store, so I had to run around asking people if they knew the store. After a few minutes I found the store, went in to get dissapointed af. This is what happened Me: So, I found this OLX ad that you guys are selling ThinkPads! The guy in the store: Oh yeah, you can look at these on the table. (Shows a set of ThinkPad X250, T470 etc) Me: Um.. I dont want the new ones, I am looking for something older, like a ThinkPad X200, X220, T420, W400, W500 etc instead. The guy in the store: Oh.. we dont have those, we had 5 T420s but someone came in last week and bought all 5 of em. I was just walking around restlessly and then the guy said "We do have some X220 and X201s here but they are slightly broken and some parts may not be there. You wanna look?" I was like "Fuck yeah, I do, if its only slightly broken, I dont really mind." Then I put my hands on that bucket of old Thinkpads (the same one I saw in the ad btw), and took out an X220 that was in really decent shape, it was still rigid and not in shambles like the rest of the ones in that bucket. I asked them to do some basic tests to check if the display was broken, the keyboard, trackpoint etc was working etc.. The device worked. Specs was as followed:

- CPU: i5 2520M (2C4T) @ 3.2GHz
- RAM: 2GB DDR3 1333MHz (single channel)
- Screen: 1366x768p TN panel
- No Storage
- No Webcam
- No WWAN
- No FingerPrint Reader

The other issues were:

- Slightly broken plastics
- Dead battery, wont even charge

I paid a total of 8000 for the laptop, they did clean it up before giving me. and 500 for the 90W charger that came with this model.

## Upgrades

I upgraded the RAM from 2gig single channel 1333MHz to 2 4gig sticks of speed 1600MHz,for a total of 8gigs. I know that I can run 16gigs of RAM on it, at a speed of 1800 MHz but I didnt bother that much, since 8 gigs is plenty for me. I got myself a 240 gig SATA SSD as well. SSD gives me faster boot and loading times when I load bigger programs, also uses less energy compared to a HDD. why 240gigs? why not more? Good question, as ive been using linux for atleast a few years now, I realized that I dont really need that much storage.Apart from the occassional movies/anime that I download, there's not much else on my machine that can eat away my storage. So 240 gigs feels huge.

## Is it usable tho?

Thats a question a lot of people ask! "How is a 11-12 year old laptop usable in modern tasks? Wont it be just too slow for your needs? My 6-7th gen laptop is slow for my needs, how can you use a 1st,2nd gen laptop?" The simple answer is, No, its not slow at all, almost all the things I want to do are doable and runs just as snappy as I would want it to be. The only things that really pegs the cpu, is

- Bloated Websites with a lot of Js, eg: Whatsapp web
- Video Editing and rendering

Since the battery it came with was dead, I bought another one off amazon, which isnt as good as the original. The original 6 cell battery will be 63Wh but the 6 cell i bought from amazon only can do 48Wh. So its a downgrade, but still I get around 4-5 Hours of battery life. An original 6 cell might give me 6 hours or so (according to my calculations) and a 9 cell, might give me 12 hours or so.(also just speculations)

## Mods I wanna do in the future

- Coreboot/Libreboot
- IPS Screen swap (X220 ThinkPads did come with a 1366x768p IPS Panel)
- Libre Wifi chip (only if it can connect to 5GHz signals)
- WWAN chip (if it can do 4G or something. It might be easier than having to rely on wifi and my mobile's internet) OPTIONAL
- Fingerprint Reader (Also was available in some X220 models)
- Motherboard swap with the i7 one??? (not sure)
