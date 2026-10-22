# gaoxiaohan.com

Personal website, built with [Astro](https://astro.build) (free, MIT-licensed) and hosted on Netlify's free tier.
It used to run on Hugo + HugoBlox/Wowchemy; the look is recreated with plain CSS so everything can be edited here.

## Run it locally

Requires Node.js 22.23 or newer (24 recommended, see `.nvmrc`).

```sh
npm install        # once
npm run dev        # live-reloading preview at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

To stop the dev/preview server, press Ctrl+C in its terminal.

## Deploying (Netlify)

- Every push to `main` makes Netlify run `npm run build` and publish `dist/` to gaoxiaohan.com (see `netlify.toml`).
- To try a change first, push it to another branch and open a pull request into `main`: Netlify posts a
  **Deploy Preview** link on the PR. Merging the PR publishes it.
- To undo a bad release, open the site's **Deploys** page in Netlify and re-publish an earlier deploy (one click),
  then fix things in git.

## The old Hugo version (backup)

The site ran on Hugo + Wowchemy until October 2026. That version is kept untouched on the `hugo-backup` branch.
To look at it locally:

```sh
./scripts/preview-hugo-backup.sh     # http://localhost:1313 (Ctrl+C to stop)
```

The script checks the branch out into a separate temporary folder (your work is not touched) and runs the exact
Hugo version it was built with (0.108.0, downloaded once). It needs Go (`brew install go`). Afterwards you can remove
the temporary checkout with `git worktree remove --force "$TMPDIR/website-hugo-backup"`.

## Where things are

| You want to change…                     | Edit                                                     |
| --------------------------------------- | -------------------------------------------------------- |
| Bio, name, role, interests, education, social icons | `content/authors/admin/_index.md` (+ `avatar.jpg`)   |
| Homepage sections (order = `weight`)    | `content/home/*.md`                                      |
| A publication                           | `content/publication/<Name>/index.md` (+ `cite.bib`)     |
| A news post                             | `content/post/<name>/index.md` (+ `featured.jpg`)        |
| A project                               | `content/project/<Name>/index.md`                        |
| A travel / hobby story                  | `content/otherworld/<name>/index.md`                     |
| Team / friends pages                    | `content/team/*.md`, `content/friend/*.md`               |
| Otherworlds page (title, filter buttons)| `content/otherworlds/*.md`                               |
| Menu, site title, analytics, footer     | `src/site.config.ts`                                     |
| Colours, fonts, spacing (light + dark)  | `src/styles/global.css` (variables at the top)           |
| Page layouts                            | `src/pages/**` and `src/components/**`                   |
| Redirects for old URLs                  | `public/_redirects`                                      |
| Static files (CV PDF, …)                | `public/` (e.g. `public/uploads/resume.pdf` → `/uploads/resume.pdf`) |

Each page folder becomes a URL with a lower-cased name: `content/publication/DAC24_EasyACIM/` → `/publication/dac24_easyacim/`.
Front matter fields are the same as before (`title`, `date`, `authors`, `publication_short`, `doi`, `links`, `tags`, …);
`src/content.config.ts` lists them all.

### Markdown notes

- Images: put the file next to `index.md` and write `![alt](photo.jpg)`. They are resized and converted to WebP automatically.
- Captions: `![alt](photo.jpg "Caption text")` renders as a figure with a caption (replaces Hugo's `{{< figure >}}`).
- `featured.jpg` / `featured.png` in a page folder is used as its thumbnail and header image.
- `draft: true` hides a page.
- Hugo shortcodes (`{{< … >}}`) no longer work; use plain Markdown or HTML.

### Attributes: authors, categories, tags

Front-matter `authors`, `categories`, `tags` (and `publication_types` on papers) are clickable everywhere and
each value gets its own page listing every publication, post, project and otherworld that has it:
`/authors/<name>/`, `/category/<name>/`, `/tag/<name>/`, `/publication-type/<n>/`, plus `/tags/`, `/categories/`
and `/authors/` overviews. Use `admin` in `authors:` for yourself. The logic lives in `src/lib/taxonomy.ts`.

### Adding a new homepage-style section

Any `.md` file in `content/home/` (or `team/`, `friend/`, `otherworlds/`) becomes a block on that page.
The `widget` field picks the layout: `about`, `pages` (recent posts), `contact`, `portfolio`, or leave it out for
"title on the left, Markdown on the right". New layouts go in `src/components/widgets/` and are wired up in
`src/components/Sections.astro`.
