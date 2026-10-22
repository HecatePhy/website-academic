// The attribute ("taxonomy") system: authors, categories, tags and publication types.
// Every page's front matter can carry these; each value gets its own page listing
// everything that shares it. URLs match the old Hugo site:
//   /authors/<name>/   /category/<name>/   /tag/<name>/   /publication-type/<n>/
import type { CollectionEntry } from 'astro:content';
import { sortedEntries, authorName } from './utils';
import { publicationTypes } from '../site.config';

export type Section = 'publication' | 'post' | 'project' | 'otherworld';
export type Taxonomy = 'authors' | 'categories' | 'tags' | 'publication_types';

export const SECTIONS: { key: Section; title: string }[] = [
  { key: 'publication', title: 'Publications' },
  { key: 'post', title: 'Posts' },
  { key: 'project', title: 'Projects' },
  { key: 'otherworld', title: 'Otherworlds' },
];

export const TAXONOMIES: Record<Taxonomy, { path: string; singular: string; plural: string; icon: string }> = {
  authors: { path: 'authors', singular: 'Author', plural: 'Authors', icon: 'fas fa-user' },
  categories: { path: 'category', singular: 'Category', plural: 'Categories', icon: 'fas fa-folder' },
  tags: { path: 'tag', singular: 'Tag', plural: 'Tags', icon: 'fas fa-tag' },
  publication_types: { path: 'publication-type', singular: 'Type', plural: 'Publication types', icon: 'fas fa-book' },
};

/** Same as Hugo's urlize: "David Z. Pan" -> "david-z.-pan", "AMS" -> "ams". */
export const slugify = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '-');

/** The author key `admin` (the site owner) keeps the `/authors/admin/` URL. */
export const authorSlug = (key: string) => (key === 'admin' ? 'admin' : slugify(key));

export const termUrl = (tax: Taxonomy, value: string) =>
  `/${TAXONOMIES[tax].path}/${tax === 'authors' ? authorSlug(value) : slugify(value)}/`;

export type AnyEntry =
  | CollectionEntry<'publication'>
  | CollectionEntry<'post'>
  | CollectionEntry<'project'>
  | CollectionEntry<'otherworld'>;
export type Item = { section: Section; entry: AnyEntry; url: string };

/** Every content page, newest first within each section. */
let itemsCache: Promise<Item[]> | undefined;
export function allItems() {
  itemsCache ??= (async () => {
    const out: Item[] = [];
    for (const { key } of SECTIONS) {
      for (const entry of await sortedEntries(key)) {
        const ext = (entry.data as { external_link?: string }).external_link;
        out.push({ section: key, entry: entry as AnyEntry, url: ext || `/${key}/${entry.id}/` });
      }
    }
    return out;
  })();
  return itemsCache;
}

/** Raw values of one taxonomy on one page. */
export function valuesOf(item: Item, tax: Taxonomy): string[] {
  const d = item.entry.data as Record<string, unknown>;
  const v = d[tax];
  return Array.isArray(v) ? v.map(String) : [];
}

export type Term = { slug: string; name: string; url: string; items: Item[] };

/** All values of a taxonomy, with the pages that use each one. */
export async function terms(tax: Taxonomy): Promise<Term[]> {
  const map = new Map<string, Term>();
  for (const item of await allItems()) {
    for (const value of valuesOf(item, tax)) {
      const slug = tax === 'authors' ? authorSlug(value) : slugify(value);
      let term = map.get(slug);
      if (!term) {
        const name =
          tax === 'authors'
            ? await authorName(value)
            : tax === 'publication_types'
              ? (publicationTypes[value] ?? value)
              : value;
        term = { slug, name, url: termUrl(tax, value), items: [] };
        map.set(slug, term);
      }
      term.items.push(item);
    }
  }
  return [...map.values()].sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name));
}

/** Group items by section, in the standard section order. */
export function bySection(items: Item[]) {
  return SECTIONS.map((s) => ({ ...s, items: items.filter((i) => i.section === s.key) })).filter(
    (g) => g.items.length,
  );
}
