// Copies the user manual out of the casbin-gateway repository into content/docs.
// The manual is written for GitHub, so each page gets frontmatter, loses its H1,
// and has links that leave its language folder rewritten.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const repoUrl = 'https://github.com/apache/casbin-gateway';
const branch = 'master';
const manualDir = 'docs/user-manual';
const languages = ['en', 'zh'];
const outDir = path.join(root, 'content/docs');

function findRepo() {
  const fromEnv = process.env.GATEWAY_REPO_DIR;
  if (fromEnv) return path.resolve(fromEnv);

  const sibling = path.resolve(root, '../casbin-gateway');
  if (fs.existsSync(path.join(sibling, manualDir))) return sibling;

  const cache = path.join(root, '.cache/casbin-gateway');
  if (fs.existsSync(path.join(cache, '.git'))) {
    execFileSync('git', ['-C', cache, 'pull', '--ff-only', '-q'], { stdio: 'inherit' });
  } else {
    fs.mkdirSync(path.dirname(cache), { recursive: true });
    execFileSync(
      'git',
      ['clone', '-q', '--depth=1', '--filter=blob:none', '--sparse', '-b', branch, `${repoUrl}.git`, cache],
      { stdio: 'inherit' },
    );
    execFileSync('git', ['-C', cache, 'sparse-checkout', 'set', manualDir], { stdio: 'inherit' });
  }
  return cache;
}

const toPosix = (p) => p.split(path.sep).join('/');
const siteName = (file) => (path.basename(file) === 'README.md' ? path.join(path.dirname(file), 'index.md') : file);

// Plain text of the first paragraph, used as the page description.
function firstParagraph(body) {
  const para = body
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^([#>|!\-*`<[]|\d+\.)/.test(block));
  if (!para) return undefined;
  return para
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function rewriteLinks(body, lang, relFile) {
  const fileDir = path.posix.dirname(`${manualDir}/${lang}/${relFile}`);
  return body.replace(/(\]\()([^)\s]+)(\))/g, (match, open, target, close) => {
    if (/^([a-z]+:|#|\/)/i.test(target)) return match;

    const [file, hash = ''] = target.split('#');
    const resolved = path.posix.normalize(path.posix.join(fileDir, file));
    const anchor = hash ? `#${hash}` : '';

    for (const other of languages) {
      const prefix = `${manualDir}/${other}/`;
      if (!resolved.startsWith(prefix)) continue;
      const inLang = siteName(resolved.slice(prefix.length));
      if (other === lang) {
        const relative = path.posix.relative(path.posix.dirname(`${manualDir}/${lang}/${siteName(relFile)}`), `${prefix}${inLang}`);
        return `${open}${relative.startsWith('.') ? relative : `./${relative}`}${anchor}${close}`;
      }
      const slug = inLang.replace(/(^|\/)index\.md$/, '').replace(/\.md$/, '');
      return `${open}/${other}/docs${slug ? `/${slug}` : ''}${anchor}${close}`;
    }
    return `${open}${repoUrl}/blob/${branch}/${resolved}${anchor}${close}`;
  });
}

function convertPage(src, lang, relFile) {
  let body = fs.readFileSync(src, 'utf8').replace(/\r\n/g, '\n');
  const h1 = body.match(/^# (.+)\n/m);
  const title = h1 ? h1[1].trim() : path.basename(relFile, '.md');
  if (h1) body = body.replace(h1[0], '');

  // The index links to its own translation; the site has a language switcher for that.
  if (path.basename(relFile) === 'README.md') {
    body = body.replace(/^\[[^\]]+\]\(\.\.\/[a-z]+\/README\.md\)\n\n?/m, '');
  }

  body = rewriteLinks(body, lang, relFile).replace(/^\n+/, '');
  const description = firstParagraph(body);
  const front = [`title: ${JSON.stringify(title)}`];
  if (description) front.push(`description: ${JSON.stringify(description)}`);
  return `---\n${front.join('\n')}\n---\n\n${body}`;
}

// Chapter titles come from the bold lines in each language's README contents list.
function chapterTitles(readme) {
  const titles = {};
  for (const [, num, title] of readme.matchAll(/^\*\*(\d+)\.\s*(.+?)\*\*\s*$/gm)) titles[num] = title;
  return titles;
}

function sync() {
  const repo = findRepo();
  fs.rmSync(outDir, { recursive: true, force: true });

  for (const lang of languages) {
    const langSrc = path.join(repo, manualDir, lang);
    const langOut = path.join(outDir, lang);
    const titles = chapterTitles(fs.readFileSync(path.join(langSrc, 'README.md'), 'utf8'));
    const chapters = [];

    for (const entry of fs.readdirSync(langSrc, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const rel = entry.name;
        fs.mkdirSync(langOut, { recursive: true });
        fs.writeFileSync(path.join(langOut, siteName(rel)), convertPage(path.join(langSrc, rel), lang, rel));
        continue;
      }
      if (!entry.isDirectory()) continue;

      chapters.push(entry.name);
      const chapterOut = path.join(langOut, entry.name);
      fs.mkdirSync(chapterOut, { recursive: true });
      const pages = fs
        .readdirSync(path.join(langSrc, entry.name))
        .filter((name) => name.endsWith('.md'))
        .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
      for (const name of pages) {
        const rel = toPosix(path.join(entry.name, name));
        fs.writeFileSync(path.join(chapterOut, name), convertPage(path.join(langSrc, entry.name, name), lang, rel));
      }

      const num = entry.name.split('-')[0];
      const meta = { title: titles[num] ? `${num}. ${titles[num]}` : entry.name, pages: pages.map((p) => p.replace(/\.md$/, '')), defaultOpen: true };
      fs.writeFileSync(path.join(chapterOut, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);
    }

    chapters.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
    const rootMeta = { title: lang === 'zh' ? '文档' : 'Docs', pages: ['index', ...chapters] };
    fs.writeFileSync(path.join(langOut, 'meta.json'), `${JSON.stringify(rootMeta, null, 2)}\n`);
  }

  console.log(`synced ${manualDir} from ${repo}`);
}

sync();
