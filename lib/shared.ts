import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Apache Casbin Gateway';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'apache',
  repo: 'casbin-gateway',
  branch: 'master',
};

export const repoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

// The manual lives in the gateway repository; content/docs is a synced copy.
export function getPageSourceUrl(path: string) {
  const file = path.replace(/(^|\/)index\.md$/, '$1README.md');
  return `${repoUrl}/blob/${gitConfig.branch}/docs/user-manual/${file}`;
}

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
