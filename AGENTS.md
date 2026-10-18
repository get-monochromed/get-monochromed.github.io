# AGENTS.md

Agent-facing notes for Monochrome's website — <https://get-monochromed.github.io>.

## What this is

Hugo static site with a frosted-liquid-glass design: pill nav dock that sticks to the
bottom on phones (thumb reach, back-to-top arrow last) and the top on desktop, plus a
lightbox with pinch zoom. Content is markdown; the look lives in `assets/css/main.css`,
`assets/js/dock.js`, and `assets/js/lightbox.js`. Hugo v0.167.0 extended
(`~/.local/bin/hugo`), config in `hugo.toml`.

## Two locations, three branches

- **EDIT HERE:** `~/Projects/website-frosted-liquid-glass` — the Hugo source. This is
  **not a git repo**. All editing, previewing, and building happens here.
- **PUBLISHED HERE:** `~/Documents/Git/pages` — the git repo, remote
  `git@github.com:get-monochromed/get-monochromed.github.io.git`, with three branches:
  - `main` — built HTML output, served directly by GitHub Pages. **There is no CI and
    nothing is generated server-side. NEVER hand-edit `main`.**
  - `hugo` — rebuildable copy of the source, mirrored automatically by `blog push`.
  - `old-site` — the previous design, kept only because publish re-checks out
    `LICENSE` from it.

Anything added only to `main` is deleted by the next publish (AGENTS.md is the one
exception, preserved by the publish script). To persist a change, put it in the source
directory and publish; repo-only files belong on `hugo`.

## Writing and publishing — the only supported path

`~/.local/bin/blog` is the only supported way to add posts or publish. Do not
reimplement it, and do not hand-edit or manually push the pages repo.

```bash
blog add "blog: my title"        # content/blog/my-title/index.md → /blog/my-title/
blog add "tutorial: fzf magic"   # content/tutorials/fzf-magic/ → /tutorials/fzf-magic/
blog push                        # newest draft → draft: false, build, mirror, push, verify
```

- The prefix picks an existing section under `content/`; no prefix means `blog`. The
  folder name is the URL, so renaming a slug breaks links.
- `blog add` starts `hugo server -D` and opens the post in kwrite (`BLOG_EDITOR`
  overrides). `blog push` takes an optional commit message; the default is exactly the
  title given to `blog add`, or `blog: update posts` when there is no draft.
- `blog push` refuses on a dirty pages repo, off `main`, or with a warning-laden or
  dev/nested build. It wipes the pages repo except `.git` (and `AGENTS.md`), copies
  `public/` in, re-checks out `LICENSE` from `old-site`, touches `.nojekyll`, commits
  and pushes `main`, then mirrors the source into a throwaway clone of `hugo` and
  pushes that too.
- With no draft, `blog push` republishes current content — use it after editing a
  live post.

## Content layout and rules

```
content/_index.md                  home page (headline, lede, eyebrow)
content/systeminfo/_index.md       SystemInfo page
content/<section>/_index.md        optional section listing intro
content/<section>/<slug>/index.md  one post (blog/, tutorials/)
```

Frontmatter:

```yaml
---
title: "Shown as the page heading and in listings"
date: 2026-02-14T02:04:53+05:30   # full timestamp, offset included
draft: true
tags: [linux, thinkpad]            # stored only; taxonomy pages are disabled
summary: "Listing line and post intro; falls back to the first ~70 words."
---
```

- **The date must be a full timestamp.** A bare `date: 2026-10-05` is parsed as
  midnight UTC, which can be future-dated locally, and Hugo hides future content.
  `-D` does not cover that (`-F` does). `hugo new content` writes a correct offset
  timestamp — leave the date it generates alone.
- Body: `##` for sections, `###` for subsections. **Never `#`** — the title is already
  the page `h1`.
- Images go in `assets/images/` and are referenced by bare filename:
  `![what it shows](name.png)`. Names must be unique site-wide. Hugo emits resized
  WebP, `srcset`, dimensions, and lazy loading. A wrong name produces a build warning
  naming the file and post.
- `summary` is both the listing line and the intro under the post title.

## Build and preview

```bash
cd ~/Projects/website-frosted-liquid-glass
hugo server -D                    # http://localhost:1313, live reload
hugo server -D -F                 # also render future-dated content
pkill -x hugo                     # kill stray servers (only one at a time)
hugo --gc --cleanDestinationDir   # production build into public/
```

- A clean build prints **no WARN or ERROR**. Fix any that appear; `blog push` refuses
  to publish them.
- `--cleanDestinationDir` matters: without it stale fingerprinted CSS/JS accumulate in
  `public/` and get published.
- CSS and JS run through Hugo's asset pipeline, so filenames are content-hashed
  automatically — no manual cache-busting.

## Gotchas and invariants

- There is deliberately **no `[markup.highlight]` block** in `hugo.toml`. Code blocks
  are plain `<pre><code>` from `layouts/_default/_markup/render-codeblock.html`;
  adding a Chroma style would break the custom `.bg` background.
- `goldmark.renderer.unsafe = true` is intentional — raw HTML in markdown works.
- `disableKinds = ["taxonomy", "term"]`: tags are frontmatter only, with no tag UI or
  tag pages.
- Never hand-edit `public/`, and never copy the `public` directory itself into the
  pages repo (that nests a `public/` inside it).
- Leave the pages repo clean and on `main`; `blog push` depends on both.
- Do not add CI or hand-written files to `main`. Generated output only.
