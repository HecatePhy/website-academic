import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Content stays in the top-level `content/` folder (same layout as the Hugo site).
// Each page bundle `content/<section>/<Name>/index.md` becomes `/<section>/<name>/`.
const bundleId = ({ entry }: { entry: string }) => entry.split('/')[0].toLowerCase();
const bundles = (section: string) =>
  glob({ base: `./content/${section}`, pattern: '*/index.md', generateId: bundleId });

// Front-matter fields may be left empty (`abstract:`), so treat null like "not set".
const str = z.string().nullish().transform((v) => v ?? undefined);
const strList = z.array(z.string()).nullish().transform((v) => v ?? undefined);
const date = z.coerce.date().nullish().transform((v) => v ?? undefined);

const link = z.object({
  icon: str,
  icon_pack: str,
  name: z.string(),
  url: z.string(),
});

// Fields shared by every page bundle.
const common = {
  title: z.string(),
  summary: str,
  date,
  lastmod: date,
  draft: z.boolean().optional(),
  tags: strList,
  categories: strList,
  image: z.object({ caption: str, placement: z.number().optional() }).loose().optional(),
};

const publication = defineCollection({
  loader: bundles('publication'),
  schema: z
    .object({
      ...common,
      authors: z.array(z.string()).default([]),
      author_notes: strList,
      publication_types: z.array(z.string()).default(['0']),
      publication: str,
      publication_short: str,
      abstract: str,
      doi: str,
      featured: z.boolean().optional(),
      projects: strList,
      url_pdf: str,
      url_code: str,
      url_dataset: str,
      url_slides: str,
      url_video: str,
      url_poster: str,
    })
    .loose(),
});

const post = defineCollection({
  loader: bundles('post'),
  schema: z
    .object({
      ...common,
      subtitle: str,
      authors: z.array(z.string()).default([]),
      projects: strList,
    })
    .loose(),
});

const showcase = { ...common, links: z.array(link).nullish().transform((v) => v ?? []), external_link: str };
const project = defineCollection({ loader: bundles('project'), schema: z.object(showcase).loose() });
const otherworld = defineCollection({ loader: bundles('otherworld'), schema: z.object(showcase).loose() });

// "Section" files: content/home/*.md, content/team/*.md, ... Each one is a block on the page,
// ordered by `weight`; its `widget` field picks the layout (see src/components/Sections.astro).
const sections = (dir: string) =>
  defineCollection({
    loader: glob({ base: `./content/${dir}`, pattern: ['*.md', '!index.md'] }),
    schema: z
      .object({
        title: str,
        subtitle: str,
        weight: z.number().default(0),
        active: z.boolean().default(true),
      })
      .loose(),
  });

const authors = defineCollection({
  loader: glob({ base: './content/authors', pattern: '*/_index.md', generateId: bundleId }),
  schema: z.object({ title: z.string() }).loose(),
});

export const collections = {
  publication,
  post,
  project,
  otherworld,
  home: sections('home'),
  team: sections('team'),
  friend: sections('friend'),
  otherworlds: sections('otherworlds'),
  authors,
};
