import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'Apache Casbin Gateway';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// The product's own repository, which the GitHub buttons point at.
export const repoUrl = 'https://github.com/apache/casbin-gateway';

// This repository, where the manual is written.
export const gitConfig = {
  user: 'casdoor',
  repo: 'casbin-gateway-website',
  branch: 'master',
};

export function getPageSourceUrl(path: string) {
  return `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${path}`;
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
