# Apache Casbin Gateway Website

The documentation site for [Apache Casbin Gateway](https://github.com/apache/casbin-gateway), a subproject of [Apache Casbin (Incubating)](https://casbin.apache.org/), in English and Chinese, built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Writing the docs

The manual is in `content/docs/`, one folder per language with the same chapters and file names in each, so `2.3` is the same page in English and Chinese. Change both languages in the same pull request.

- Each page starts with frontmatter. `title` is the heading shown on the page, so the body has no `# Heading` of its own. `description` is a plain-text summary for search results and the preview image, usually the opening paragraph with the formatting taken out.
- `index.md` is a language's front page. Each chapter folder has a `meta.json` holding its title and page order, and the language folder's own `meta.json` lists the chapters.
- Link to another page by its file, relatively, such as `[Permissions](../4-governance/4.1-permissions.md)`; the site turns that into the page URL. To link to the other language, use the site path, such as `/zh/docs/2-agents/2.1-agents`.
- Screenshots are served from `cdn.casbin.org`.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `/` sends the visitor to `/en` or `/zh` by their browser language.

## Layout

| Path | What it is |
| --- | --- |
| `app/[lang]/(home)` | The landing page |
| `app/[lang]/docs` | The manual |
| `app/[lang]/og` | Social preview images, one per page |
| `app/[lang]/llms.mdx`, `app/llms.txt`, `app/llms-full.txt` | The manual as Markdown, for agents; append `.md` to any page URL to get it |
| `app/api/search` | Search over both languages |
| `content/docs` | The manual, as described above |
| `lib/i18n.ts` | The two languages; content is split by folder (`content/docs/en`, `content/docs/zh`) |
| `lib/layout.shared.tsx` | Navigation, and the Chinese strings for Fumadocs' own UI |
| `lib/asf.ts`, `components/asf-footer.tsx` | The ASF links, incubation disclaimer, copyright and trademark notices |

The colours are the Amber & Ink palette of the Gateway web UI, set in `app/global.css`.

## ASF website rules

Every page carries the links, disclaimer and notices the ASF asks of a podling's site: the **ASF** menu in the header, and the footer under the home page and every docs page. The disclaimer and notices stay in English in both languages, as on casbin.org.

The [ASF privacy policy](https://privacy.apache.org/policies/privacy-policy-public.html) rules out third-party requests from the visitor's browser, so nothing here loads from another host: Inter is downloaded at build time by `next/font`, the agent icons are in `public/agents/`, and the screenshots from `cdn.casbin.org` go through Next's image optimizer. Keep it that way — no analytics, no font or icon CDNs.
