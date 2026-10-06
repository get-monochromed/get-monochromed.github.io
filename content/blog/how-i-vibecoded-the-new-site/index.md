---
title: "How I Vibecoded the New Site"
# A full timestamp with offset, so a post written today is not treated as
# future-dated (Hugo reads a bare "2026-10-05" as UTC midnight, which can be
# ahead of your local clock and would need `hugo -F` to appear at all).
date: 2026-10-06T20:50:58+05:30
draft: true
tags: []
summary: "I vibecoded a fresh blog site and automated all the pain points to make blog creation super easy."
---

If you read my blogs, which is probably just the 1% of the friends that I have (or even less), you might know that my site is very very very minimal. Its somewhat on purpose due the the looks and due to my lack of html/css/js knowledge.

Even with my lack of knowledge of HTML, JavaScript and CSS, I tried to make the site somewhat usable for phones as well. But I simply never bothered adding new blogs to the site, mostly because I was writing them manually in HTML every single time. And that is a lot of work.

I did have this idea of just having a Markdown file. You write your blog in a `.md` file and then you use one of those static website generation tools to make it into a webpage. I tried to understand how Hugo and some other tools are supposed to be used, but I'm too dumb to understand any of it properly. I had a few friends who had custom website similar to it with Hugo and another program that I cannot remember, I even tried to follow a tutorial, but I didn't really understand half of it either So I just gave up.

To me, at least, if I want to write something as a blog, I want it to be as friction-free as possible. I just do the bare minimum.I run a small command, I get something to type the text in, Once that done, I run a small command and it is generated into a website and then pushed to the Github repository to the account. I just made that happened today with the help of Hugo and an AI agent.

I have Hermes set up as my main AI agent for almost all of my tasks and it is really really really useful with Linux. I have used Hermes to make some plugins for KDE but that is not part of this context so I'm not going to explain about it. Maybe I'll make a separate blog for Hermes instead. But here I just asked Hermes to create this setup where I just create an MD file and then it will just create the website for me. And on top of that I wanted a different look, so I worked with Muse Spark (which is an AI model that is provided by Meta, the people behind Facebook) on Open Code because I didn't really want to waste a lot of my money burning DeepSeek tokens when I could do it for free on opencode. So I used Open Code to generate me a style. I told it to generate something similar to Apple's liquid glass or older Apple's kind of frosted design with a little bit of design cues taken from nothing where they have the the N-Dot fonts here and there. They have a little bit of frosting happening here and there as well. So I wanted something similar to it. I gave that as my prompt and then I made few changes like making the whole background of frosted glass and then some slight adjustments here and there. I'm really happy with the pill that is on the top. That has some animations when you move your mouse around. That was a little bit of work to get properly done but it is really good at the end.

Since the people who are reading the blog is not me, I have sent the link to a few friends of mine to see if they can find me any bugs or issues or recommendations. ProAdmin on discord gave me a recommendation to have the pillbox on the bottom for the phone, which made sense. It's easier to reach on the bottom. So I did that and added a scroll up button as well, integrated that onto the bottom pill.

You may or may not know but the pillbox actually has blur in it. When you scroll down, it does disappear but when you scroll up, the whole thing comes down and if you are going through an image or something colorful, you can see the blur in action.

Yes, of course the theme has both dark and light modes and it automatically changes based on your system's dark or light theme instead of having a hideous button on the top right which you have to manually click every single time. I find it really annoying when people do that.

As of right now, I don't really have any telemetry on the website at all. I do want to have the bare minimum, but I think you have to host it somewhere else or do some complex work for it to happen. I just want to know if people actually read this shit and where they are reading it from and that's kind of it. Like three people reading it from India, two people in Germany, one in America, something like that. That would be nice, but probably someday in the future, I don't really want to add any hideous cookie marker or any of that. Maybe I'll add a small section where people could just add in the message saying "hi, I was here, etc. Maybe that's nice. I don't know. Maybe I could add that.

I don't think any of this would happen if it wasn't for vibecoding, like being able to open an AI agent and just giving it some instructions and it just giving you what you wanted. I feel like it's really useful for a lot of people who have no technical knowledge for something like this but want something similar to it.

To make my life even even easier, since this is Hugo in the backend, I made hermes create a program called `blog`. If I type in a command like `blog add blog: this Spiderman movie is amazing` Then it will go to my website's folder, use hugo commands to create the required empty md file inside the blog folder. If I run the command `blog add tutorial:How to setup distro box`, it will create that title inside the tutorials folder etc. Then it launches a very simple text editor called kwrite where I can type in my blog. It will launch the hugo server in the background, and launch the local server URL on my browser as well, so I can see how the blog will look. Once im done with everything. I save my md file. run `blog push` and it will do all the stuff to convert that md file into html, then push that to github with a commit message taken from the `blog add` command. 
