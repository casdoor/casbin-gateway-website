import { Activity, BadgeCheck, LayoutGrid } from 'lucide-react';

// The landing page's copy, shared by the page, its metadata and its preview image.
const text = {
  en: {
    seoTitle: 'Apache Casbin Gateway: Local Gateway for AI Coding Agents',
    title: 'See what every AI coding agent on your machine is doing',
    subtitle: 'and whether the API behind it is the one you paid for.',
    lead: 'One local gateway for Claude Code, Codex, Cursor, Gemini CLI and the rest: the providers they talk to, what they may do and what they spend.',
    start: 'Get started',
    copy: 'Copy command',
    installNote: 'One command. No database, no Go, no Node, no configuration.',
    worksWith: 'Works with the agents already on your machine',
    features: [
      {
        icon: BadgeCheck,
        title: 'Is that API key what it was sold as?',
        body: 'A reseller can serve a cheaper model, fake a cache hit, or quietly drop a parameter it claims to support. Authenticity probes every provider on its own and grades it A–F.',
        href: '3-providers/3.4-authenticity',
      },
      {
        icon: Activity,
        title: 'What every agent did, spent and sent',
        body: "Every prompt and tool call, the spend read from the agents' own transcripts, and on Windows, where each agent's own processes upload data.",
        href: '2-agents/2.3-monitoring',
      },
      {
        icon: LayoutGrid,
        title: 'One place for all of them',
        body: 'Point every agent at any of 44 model vendors, say what each may do, and install, upgrade or roll back the agents themselves.',
        href: '2-agents/2.1-agents',
      },
    ],
    more: 'Read more',
    partOf: [', a subproject of ', ''],
  },
  zh: {
    seoTitle: 'Apache Casbin Gateway：AI编程Agent的本地网关',
    title: '看清你机器上每个AI编程Agent在做什么',
    subtitle: '以及它背后的API是不是你花钱买的那个。',
    lead: '一个本地网关，管住Claude Code、Codex、Cursor、Gemini CLI等所有Agent：它们连哪个供应商、能做什么、花了多少。',
    start: '开始使用',
    copy: '复制命令',
    installNote: '一条命令。不需要数据库，不需要Go，不需要Node，不需要配置。',
    worksWith: '直接接管你机器上已有的Agent',
    features: [
      {
        icon: BadgeCheck,
        title: '这个API Key，真是卖给你的那个吗？',
        body: '中转商可以拿便宜模型冒充、伪造缓存命中，或者悄悄丢掉它声称支持的参数。真伪检测会主动探测每个供应商，给出A–F评级。',
        href: '3-providers/3.4-authenticity',
      },
      {
        icon: Activity,
        title: '每个Agent做了什么、花了多少、发到了哪里',
        body: '每条提示词和工具调用，从Agent自己的会话记录里读出的花费；在Windows上还能看到每个Agent自己的进程把数据上传到了哪里。',
        href: '2-agents/2.3-monitoring',
      },
      {
        icon: LayoutGrid,
        title: '所有Agent，一个地方管',
        body: '把每个Agent接到44个模型厂商中的任意一个，规定它能做什么，并直接安装、升级或回滚这些Agent本身。',
        href: '2-agents/2.1-agents',
      },
    ],
    more: '了解更多',
    partOf: ['是', '的子项目'],
  },
};

export function getText(lang: string) {
  return text[lang as keyof typeof text] ?? text.en;
}
