<div align="center">
  <img src="public/plustube-icon.svg" alt="PlusTube" width="88" />
  <h1>PlusTube Website</h1>
  <h3>The official website for PlusTube (Gothwad Tube) — a privacy-respecting YouTube and YouTube Music client for Android by Gothwad Tech.</h3>

  <p>
    <a href="https://tube.gothwadtech.com"><b>tube.gothwadtech.com</b></a> ·
    <a href="https://github.com/GothwadTech/tubeapp"><b>App repository</b></a> ·
    <a href="https://www.gothwadtech.com"><b>Gothwad Tech</b></a>
  </p>
</div>

---

## About

This is the marketing and download site for **PlusTube** (also known as **Gothwad Tube**),
built with **Vite + React + TypeScript + Tailwind CSS**. It covers the landing page, downloads,
changelog, the PlusTube Neuro explainer, and the legal pages (`/privacy`, `/terms`, `/dmca`).

PlusTube is built on the open-source [Flow](https://github.com/A-EDev/Flow) project by
A-EDev and its contributors, rebranded and maintained by
[Gothwad Tech](https://github.com/GothwadTech) under the same GPL-3.0 license.

## Development

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # preview the production build
```

## Deploying to Cloudflare Pages

The site is a static SPA, ready for **Cloudflare Pages** out of the box:

| Setting | Value |
| :--- | :--- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `18` or newer (set `NODE_VERSION` env var if needed) |

SPA routing is handled by [`public/_redirects`](public/_redirects) (`/* → /index.html 200`),
and cache headers live in [`public/_headers`](public/_headers) — both are copied into `dist/`
on build, so `/privacy`, `/terms`, `/download`, etc. all work on the custom domain
**[tube.gothwadtech.com](https://tube.gothwadtech.com)**.

## Live data (stats, downloads, changelogs)

The JSON files in `public/` drive the site and are refreshed hourly by the GitHub Action in
[`.github/workflows/update-stats.yml`](.github/workflows/update-stats.yml):

| File | What it holds | Script |
| :--- | :--- | :--- |
| `public/downloads.json` | Latest + nightly release APKs | `.github/scripts/fetch-downloads.sh` |
| `public/changelogs.json` | Release notes from the app repo | `.github/scripts/fetch-changelogs.sh` |
| `public/contributors.json` | Gothwad Tech + PlusTube + upstream Flow contributors | `.github/scripts/fetch-contributors.sh` |
| `public/stats.json` | Stars, downloads, contributor count | inlined in the workflow |

You can also run any script locally (needs the `gh` CLI):

```bash
bash .github/scripts/fetch-downloads.sh public/downloads.json
```

## Credits

**PlusTube** is built on the open-source **[Flow](https://github.com/A-EDev/Flow)** project by
**A-EDev** and its contributors — full credit and thanks to everyone who built Flow.
Website design was inspired by [Zen Browser's website](https://zen-browser.app).

## License

GPL-3.0 — see [LICENSE](LICENSE).

<div align="center">
  <sub>PlusTube · Gothwad Tube — a Gothwad Tech product · Made with ❤️ by <a href="https://github.com/GothwadTech">Gothwad Tech</a></sub>
</div>
