# Apache Casbin Gateway Website

The documentation site for [Apache Casbin Gateway](https://github.com/apache/casbin-gateway), a subproject of [Apache Casbin (Incubating)](https://casbin.apache.org/), in English and Chinese, built with [Fumadocs](https://fumadocs.dev) on Next.js.

## Where the content comes from

The manual is not written here. It lives in the gateway repository under [`docs/user-manual`](https://github.com/apache/casbin-gateway/tree/master/docs/user-manual), so it changes in the same pull request as the code it describes. `npm run sync` copies it into `content/docs/` (which is not committed), and both `npm run dev` and `npm run build` run it first.

The sync script looks for the gateway repository in this order:

1. `GATEWAY_REPO_DIR`, if set
2. `../casbin-gateway`, a checkout next to this one
3. a sparse clone of `apache/casbin-gateway` in `.cache/`, made on first use and pulled after that

On the way in, each page's `# Heading` becomes its title, the first paragraph its description, `README.md` becomes the section index, and a link that leaves the manual is pointed at the file on GitHub.

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
| `lib/i18n.ts` | The two languages; content is split by folder (`content/docs/en`, `content/docs/zh`) |
| `lib/layout.shared.tsx` | Navigation, and the Chinese strings for Fumadocs' own UI |
| `lib/asf.ts`, `components/asf-footer.tsx` | The ASF links, incubation disclaimer, copyright and trademark notices |
| `scripts/sync-docs.mjs` | The sync described above |

The colours are the Amber & Ink palette of the Gateway web UI, set in `app/global.css`.

## ASF website rules

Every page carries the links, disclaimer and notices the ASF asks of a podling's site: the **ASF** menu in the header, and the footer under the home page and every docs page. The disclaimer and notices stay in English in both languages, as on casbin.org.

The [ASF privacy policy](https://privacy.apache.org/policies/privacy-policy-public.html) rules out third-party requests from the visitor's browser, so nothing here loads from another host: Inter is downloaded at build time by `next/font`, the agent icons are in `public/agents/`, and the screenshots from `cdn.casbin.org` go through Next's image optimizer. Keep it that way — no analytics, no font or icon CDNs.
