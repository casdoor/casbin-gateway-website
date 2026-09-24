// What the ASF requires of a project website: the foundation links, the
// incubation disclaimer, and the copyright and trademark notices. The notices
// stay in English in every language, as on casbin.org.

export const projectName = 'Apache Casbin Gateway';
export const podlingName = 'Apache Casbin (Incubating)';

export const asfLinks = [
  { en: 'Foundation', zh: '基金会', url: 'https://www.apache.org/' },
  { en: 'License', zh: '许可证', url: 'https://www.apache.org/licenses/' },
  { en: 'Events', zh: '活动', url: 'https://www.apache.org/events/current-event.html' },
  { en: 'Privacy', zh: '隐私', url: 'https://privacy.apache.org/policies/privacy-policy-public.html' },
  { en: 'Security', zh: '安全', url: 'https://www.apache.org/security/' },
  { en: 'Sponsorship', zh: '赞助', url: 'https://www.apache.org/foundation/sponsorship.html' },
  { en: 'Thanks', zh: '致谢', url: 'https://www.apache.org/foundation/thanks.html' },
  { en: 'Code of Conduct', zh: '行为准则', url: 'https://www.apache.org/foundation/policies/conduct.html' },
];

export function asfLinkLabel(link: (typeof asfLinks)[number], lang: string) {
  return lang === 'zh' ? link.zh : link.en;
}

export const incubatorUrl = 'https://incubator.apache.org/';

export const disclaimer =
  'Apache Casbin (Incubating) is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF.';

export const trademarks =
  'Apache, Apache Casbin, the names of Apache projects, and the feather logo are either registered trademarks or trademarks of The Apache Software Foundation in the United States and/or other countries. All other marks mentioned may be trademarks or registered trademarks of their respective owners.';
