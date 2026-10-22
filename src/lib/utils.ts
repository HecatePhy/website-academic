import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { marked } from 'marked';

// ---- featured images (content/<section>/<Bundle>/featured.jpg) ----
const featuredFiles = import.meta.glob<ImageMetadata>(
  '/content/{post,project,otherworld,publication}/*/featured.{jpg,jpeg,png,JPG,PNG,webp}',
  { eager: true, import: 'default' },
);
const featured = new Map<string, ImageMetadata>();
for (const [path, img] of Object.entries(featuredFiles)) {
  const [, , section, bundle] = path.split('/');
  featured.set(`${section}/${bundle.toLowerCase()}`, img);
}
export const featuredImage = (section: string, id: string) => featured.get(`${section}/${id}`);

const avatars = import.meta.glob<ImageMetadata>('/content/authors/*/avatar.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
});
export const avatarOf = (author: string) =>
  Object.entries(avatars).find(([p]) => p.split('/')[3] === author)?.[1];

const bibs = import.meta.glob<string>('/content/publication/*/cite.bib', {
  eager: true,
  query: '?raw',
  import: 'default',
});
export const bibOf = (id: string) =>
  Object.entries(bibs).find(([p]) => p.split('/')[3].toLowerCase() === id)?.[1];

// ---- collections ----
type Dated = { data: { date?: Date; draft?: boolean } };
export async function sortedEntries<C extends CollectionKey>(name: C) {
  const all = (await getCollection(name)) as (CollectionEntry<C> & Dated)[];
  return all
    .filter((e) => !e.data.draft)
    .sort((a, b) => (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0));
}

export async function sections<C extends 'home' | 'team' | 'friend' | 'otherworlds'>(name: C) {
  const all = await getCollection(name);
  return all.filter((s) => s.data.active).sort((a, b) => a.data.weight - b.data.weight);
}

// ---- authors ----
let authorNames: Map<string, string> | undefined;
export async function authorName(key: string) {
  authorNames ??= new Map((await getCollection('authors')).map((a) => [a.id, a.data.title]));
  return authorNames.get(key) ?? key;
}
export const isMe = (key: string) => key === 'admin';

// ---- formatting ----
export const formatDate = (d?: Date) =>
  d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : '';
export const formatMonth = (d?: Date) =>
  d ? d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : '';

export function readingTime(body = '') {
  const cjk = (body.match(/[぀-ヿ㐀-鿿가-힯]/g) ?? []).length;
  const words = body.replace(/[぀-ヿ㐀-鿿가-힯]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200 + cjk / 500));
}

/** Render a one-line Markdown string (e.g. `In *DAC'24*`) to HTML. */
export const inlineMd = (s = '') => marked.parseInline(s) as string;

/** Font Awesome / Academicons class for a Hugo-style {icon, icon_pack}. */
export function iconClass(icon = '', pack = 'fas') {
  if (pack === 'ai' || pack === 'academicons' || ['cv', 'google-scholar', 'arxiv', 'dblp'].includes(icon))
    return `ai ai-${icon}`;
  const p = pack === 'fa' ? 'fas' : pack;
  return `${p} fa-${icon}`;
}
