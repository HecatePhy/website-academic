import type { APIRoute } from 'astro';
import { sortedEntries, authorName } from '../lib/utils';
import { terms, TAXONOMIES } from '../lib/taxonomy';

// Small index used by the Spotlight search (src/components/Spotlight.astro).
const plain = (s = '') =>
  s
    .replace(/\{\{[<%].*?[%>]\}\}/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const GET: APIRoute = async () => {
  const docs = [];
  const sections = [
    ['publication', 'Publication'],
    ['post', 'Post'],
    ['project', 'Project'],
    ['otherworld', 'Otherworld'],
  ] as const;
  for (const [section, kind] of sections) {
    for (const e of await sortedEntries(section)) {
      const d = e.data as any;
      const authors = await Promise.all((d.authors ?? []).map(authorName));
      // One-line subtitle shown under the title.
      const sub =
        section === 'publication'
          ? [authors.join(', '), plain(d.publication_short ?? '').replace(/^In /, ''), d.date?.getUTCFullYear()].filter(Boolean).join(' · ')
          : plain(d.summary ?? '');
      docs.push({
        title: d.title,
        url: `/${section}/${e.id}/`,
        kind,
        sub,
        text: plain(
          [d.summary, d.abstract, authors.join(', '), ...(d.tags ?? []), ...(d.categories ?? []), e.body].filter(Boolean).join(' '),
        ).slice(0, 4000),
      });
    }
  }
  // Attribute pages (tags, categories, authors) are searchable too.
  for (const [tax, kind] of [['tags', 'Tag'], ['categories', 'Category'], ['authors', 'Author']] as const) {
    for (const t of await terms(tax)) {
      const n = t.items.length;
      docs.push({ title: t.name, url: t.url, kind, sub: `${TAXONOMIES[tax].singular} · ${n} page${n > 1 ? 's' : ''}`, text: '' });
    }
  }
  return new Response(JSON.stringify(docs), { headers: { 'Content-Type': 'application/json' } });
};
