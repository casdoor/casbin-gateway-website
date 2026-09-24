import Image from 'next/image';
import { asfLinkLabel, asfLinks, disclaimer, incubatorUrl, trademarks } from '@/lib/asf';
import { cn } from '@/lib/cn';

export function AsfFooter({ lang, className }: { lang: string; className?: string }) {
  return (
    <footer className={cn('border-t text-xs leading-relaxed text-fd-muted-foreground', className)}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8">
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          {asfLinks.map((link) => (
            <a key={link.url} href={link.url} className="hover:text-fd-foreground">
              {asfLinkLabel(link, lang)}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <a href={incubatorUrl} className="shrink-0">
            <Image
              src="/incubator_feather_egg_logo_sm.png"
              alt="Apache Incubator"
              width={160}
              height={40}
              className="dark:brightness-0 dark:invert dark:opacity-80"
            />
          </a>
          <div className="flex flex-col gap-2">
            <p>{disclaimer}</p>
            <p>
              Copyright © {new Date().getFullYear()} The Apache Software Foundation, Licensed under the{' '}
              <a href="https://www.apache.org/licenses/LICENSE-2.0" className="underline underline-offset-2 hover:text-fd-foreground">
                Apache License, Version 2.0
              </a>
              .
            </p>
            <p>{trademarks}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
