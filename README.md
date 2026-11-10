# Portfolio-web

Source for the live portfolio of **Rahmat Taufiqurrahman (Taufiq)**, product designer and front-end developer.

It is a static site with no build step, deployed on Cloudflare Pages.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` |
| `/about` | `about.html` |
| `/solide` | `solide.html` |
| `/tasmi` | `tasmi.html` |
| any missing URL | `404.html` |

Cloudflare Pages serves `about.html` at `/about` automatically.

## Structure

- `*.dc.html`: live components that the pages load at runtime (Solide cover and story canvas, Tasmi' phone).
- `support.js`: the page runtime. It loads React from `vendor/`, so the site makes no requests to third-party CDNs.
- `site.js`: links between pages and the resume link.
- `assets/`: images (WebP).
- `fonts/`: self-hosted fonts (Geist, Geist Mono, Plus Jakarta Sans, Inter, Manrope, DM Serif Display), all under the SIL Open Font License 1.1.
- `favicon.svg`, `apple-touch-icon.png`, `og.jpg`: icons and the link preview image.
- `_headers`: cache and security headers for Cloudflare Pages.
- `robots.txt`, `sitemap.xml`: for search engines.

## Resume

To add or update the resume, put the PDF in the repo root as `resume.pdf` and push. The "Download my resume (PDF)" buttons on `/about` stay hidden until that file exists.

## Deploy (Cloudflare Pages)

1. Go to Workers & Pages, then Create, then Pages, then Connect to Git, and pick this repo.
2. Framework preset: None. Build command: leave empty. Build output directory: `/`.
3. Every push to `main` deploys automatically.

## Domain

`sitemap.xml`, `robots.txt` and the `canonical` and `og:url` tags currently point to `https://portfolio-web.pages.dev`. Once the custom domain is live, replace that address in those files.
