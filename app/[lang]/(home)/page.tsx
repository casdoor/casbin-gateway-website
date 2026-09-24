/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Activity, ArrowRight, BadgeCheck, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import { AsfFooter } from '@/components/asf-footer';
import { InstallCommand } from '@/components/install-command';
import { podlingName, projectName } from '@/lib/asf';
import { repoUrl } from '@/lib/shared';

const agents = [
  ['Claude Code', 'claude.com.png'],
  ['Codex', 'openai.com.png'],
  ['Cursor', 'cursor.com.png'],
  ['Gemini CLI', 'gemini.google.com.png'],
  ['Windsurf', 'windsurf.com.png'],
  ['Cline', 'cline.bot.png'],
  ['Qwen Code', 'qwen.ai.png'],
  ['Kimi Code CLI', 'kimi.com.jpg'],
  ['opencode', 'opencode.ai.png'],
  ['Trae', 'trae.ai.png'],
  ['Zed', 'zed.dev.png'],
  ['Aider', 'aider.chat.jpg'],
  ['OpenClaw', 'openclaw.ai.png'],
  ['Droid', 'factory.ai.png'],
];

const text = {
  en: {
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

function getText(lang: string) {
  return text[lang as keyof typeof text] ?? text.en;
}

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const t = getText((await params).lang);
  return { description: `${t.title}, ${t.subtitle}` };
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const t = getText(lang);

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-80 max-w-4xl rounded-full bg-fd-primary/15 blur-3xl"
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-16 pb-12 text-center sm:pt-24">
          <img src="/logo192.png" alt="" width={72} height={72} className="mb-4" />
          <p className="mb-6 text-sm text-fd-muted-foreground">
            <span className="font-semibold text-fd-foreground">{projectName}</span>
            {t.partOf[0]}
            <a href="https://casbin.apache.org/" className="underline underline-offset-4 hover:text-fd-foreground">
              {podlingName}
            </a>
            {t.partOf[1]}
          </p>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-5xl">{t.title}</h1>
          <p className="mt-3 max-w-3xl text-xl text-balance text-fd-primary sm:text-2xl">{t.subtitle}</p>
          <p className="mt-6 max-w-2xl text-base text-balance text-fd-muted-foreground sm:text-lg">{t.lead}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={`/${lang}/docs/1-getting-started/1.2-installation`}
              className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.start}
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={repoUrl}
              className="inline-flex items-center gap-2 rounded-lg border bg-fd-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
              </svg>
              GitHub
            </a>
          </div>

          <div className="mt-10 flex w-full flex-col items-center gap-2">
            <InstallCommand copyLabel={t.copy} />
            <p className="text-sm text-fd-muted-foreground">{t.installNote}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="overflow-hidden rounded-xl border bg-fd-card shadow-lg">
          <Image
            src="https://cdn.casbin.org/img/casbin-gateway.gif"
            alt={projectName}
            width={800}
            height={500}
            className="w-full"
            priority
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 pb-12 md:grid-cols-3">
        {t.features.map(({ icon: Icon, title, body, href }) => (
          <Link
            key={href}
            href={`/${lang}/docs/${href}`}
            className="group flex flex-col rounded-xl border bg-fd-card p-5 transition-colors hover:border-fd-primary/50"
          >
            <Icon className="mb-3 size-5 text-fd-primary" />
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 flex-1 text-sm text-fd-muted-foreground">{body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-fd-primary">
              {t.more}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16 text-center">
        <p className="mb-4 text-sm text-fd-muted-foreground">{t.worksWith}</p>
        <div className="flex flex-wrap justify-center gap-4">
          {agents.map(([name, file]) => (
            <img
              key={name}
              src={`/agents/${file}`}
              alt={name}
              title={name}
              width={32}
              height={32}
              className="rounded-md"
            />
          ))}
        </div>
      </section>

      <AsfFooter lang={lang} className="mt-auto" />
    </main>
  );
}
