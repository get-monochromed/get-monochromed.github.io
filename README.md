# Monochrome's Website — frosted liquid glass

Hugo site. Content is markdown; the visual language (frosted glass background,
the pill nav with a sliding indicator, dot-matrix labels) lives in
`assets/css/main.css` and `assets/js/dock.js`.

On a phone the pill hangs off the **bottom** edge of the screen instead (thumb
reach), with a back-to-top arrow as its last item; on a wider window it is back
at the top with the same four links.

Everything below assumes you are in the project directory:

```bash
cd ~/Projects/website-frosted-liquid-glass
```

---

## Live preview

Start it:

```bash
hugo server -D
```

Open <http://localhost:1313>. Every time you save a file the browser
refreshes itself.

Stop it with `Ctrl+C`.

Notes:

- **`-D` includes drafts.** Without it, any post with `draft: true` is
  invisible and you will think your new post vanished. Keep `-D` while
  writing, drop it if you want to see exactly what the public sees.
- **Never hand-write a bare date.** Hugo reads `date: 2026-10-05` as midnight
  **UTC**, which can be several hours ahead of your local clock — making the
  post "future-dated", and Hugo hides future content as well. `-D` does *not*
  cover that case; you would need `-F`. `hugo new content` writes a proper
  timestamp (`2026-10-05T02:04:53+05:30`) so this cannot happen — so leave the
  date field as generated. If a post mysteriously refuses to appear, this is
  the reason, and the fix is `hugo server -D -F`.
- If a port is already taken, Hugo adds 1 automatically; the console prints
  the real URL. To force one: `hugo server -D -p 1314`.
- Only one server at a time. If you get a "port already in use" error, an old
  one is still running — see below.

Stop *any* stray Hugo servers:

```bash
pkill -x hugo
```

Check what is running, and from which project:

```bash
pgrep -x hugo | xargs -I{} sh -c 'echo {} $(readlink /proc/{}/cwd)'
```

---

## Editing content

```
content/
  _index.md                     home page (headline, lede, eyebrow)
  blog/_index.md                the /blog/ listing page intro
  blog/<slug>/index.md          one blog post
  tutorials/_index.md           the /tutorials/ listing page intro
  tutorials/<slug>/index.md     one tutorial
  systeminfo/_index.md          the SystemInfo page
```

The folder name is the URL, so `content/blog/thinkchad/index.md` becomes
`/blog/thinkchad/`. Renaming the folder changes the link — and breaks any
existing bookmark, so prefer leaving it alone once published.

### Frontmatter

```yaml
---
title: "The title shown as the page heading and in listings"
date: 2026-02-14          # drives ordering, newest first. Use a full timestamp — see the date note above.
draft: true               # true = only visible with `hugo server -D`
tags: [linux, thinkpad]   # stored but not displayed yet; safe to leave []
summary: "One line shown in the blog listing and as the intro on the post page."
---
```

`summary` does double duty: it is the grey description line in list rows and
the intro paragraph under the post title. Leave it out and Hugo falls back to
the first ~70 words of the post.

### Body

Plain markdown. The only things worth knowing:

| want | write |
|---|---|
| section heading | `## Section` — do NOT use `#`; the title is already the page's `h1` |
| sub-heading | `### Sub-section` |
| image | `![what it shows](filename.png)` — see below |
| code block | three backticks, optionally with a language: ```` ```sh ```` |
| quote | `> text` |
| inline code | `` `command` `` |

### Images

Put the file in **`assets/images/`** and reference it by filename only:

```markdown
![GNOME 49 desktop on Fedora](gnome.png)
```

Hugo resizes it to 1400px and 760px WebP at build time, adds `srcset`,
`width`/`height` (prevents the page jumping as it loads) and lazy loading.

Filenames must be **unique across the whole site**, because they share one
folder. If a name is wrong, the build prints a warning naming the file and the
post that referenced it.

### Writing a new post

```bash
hugo new content blog/my-new-post/index.md
```

That creates the folder and a file with the frontmatter above already filled
in, `draft: true`. Write, look at it at <http://localhost:1313>, then set
`draft: false` when you want it public.

---

## Building the real site

Preview mode serves from memory. To produce the actual files:

```bash
hugo --gc --cleanDestinationDir
```

Output lands in `public/`. `--gc` clears stale generated images, and
`--cleanDestinationDir` deletes files left over from *previous* builds —
without it, old fingerprinted CSS/JS versions accumulate in `public/` and get
published alongside the current ones. A clean build prints no `WARN` or
`ERROR` lines; if it does, fix them before publishing.

After editing CSS or JS you do not need to do anything special: both go
through Hugo's asset pipeline, so the filenames are content-hashed
automatically and browsers are forced to fetch the new version.

---

## Tuning the look

Both knobs are commented in `assets/css/main.css`:

- **Blob blur** — the `48px` in `.blob`. Higher is softer and more expensive.
- **Grain strength** — `opacity` on `.grain`.
- **Frost on the nav pill** — the `24px` and `180%` in `.dock`'s
  `backdrop-filter`. This is what blurs page content as it scrolls under the bar.
- **Hover delay on the pill** — `HOVER_INTENT` at the top of
  `assets/js/dock.js`, in milliseconds. How long the pointer must rest on a nav
  item before the pill slides to it. Raise it if the pill feels twitchy when you
  sweep across the bar, lower it for snappier tracking.
- **Touch delay on the pill** — `TOUCH_NAV_DELAY`, also at the top of
  `assets/js/dock.js`. A phone has no hover, so a tap is the only chance the pill
  gets to move; this is how long the navigation is held back so the slide can be
  seen before the page changes. Set it to `0` for immediate navigation, or raise
  it if the pill still looks like it jumps. It is ignored under
  `prefers-reduced-motion`, where there is no slide to wait for.
- **Where the dock sits** — the `max-width:640px` block at the bottom of
  `assets/css/main.css` moves it to the bottom edge (and flips the
  hide-on-scroll direction). Change the breakpoint there if a tablet should get
  the phone layout too.

The blobs drift but no longer scale (scaling a blurred layer forced the blur
to be re-rendered every frame). To get the "breathing" back, add
`scale(1.16)` to the `to` line of `@keyframes drift`.
