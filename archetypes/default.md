---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
# A full timestamp with offset, so a post written today is not treated as
# future-dated (Hugo reads a bare "2026-10-05" as UTC midnight, which can be
# ahead of your local clock and would need `hugo -F` to appear at all).
date: {{ time.Now.Format "2006-01-02T15:04:05-07:00" }}
draft: true
tags: []
summary: ""
---
