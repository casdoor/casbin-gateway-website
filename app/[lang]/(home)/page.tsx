/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { AsfFooter } from '@/components/asf-footer';
import { InstallCommand } from '@/components/install-command';
import { podlingName, projectName } from '@/lib/asf';
import { getText } from '@/lib/home';
import { alternates } from '@/lib/seo';
import { appName, repoUrl, siteUrl } from '@/lib/shared';

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

export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  const t = getText(lang);
  const description = `${t.title}, ${t.subtitle}`;
  const image = `/${lang}/og/image.png`;
  return {
    title: { absolute: t.seoTitle },
    description,
    alternates: alternates(lang, ''),
    openGraph: { type: 'website', siteName: appName, title: t.seoTitle, description, url: `/${lang}`, images: image },
    twitter: { card: 'summary_large_image', title: t.seoTitle, description, images: image },
  };
}

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  const t = getText(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appName,
    description: `${t.title}, ${t.subtitle}`,
    url: `${siteUrl}/${lang}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Windows, macOS, Linux',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    codeRepository: repoUrl,
    image: `${siteUrl}/logo512.png`,
  };

  return (
    <main className="flex flex-1 flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            src="/casbin-gateway.gif"
            alt={projectName}
            width={1600}
            height={1000}
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
