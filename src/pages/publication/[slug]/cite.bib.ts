import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { bibOf } from '../../../lib/utils';

// Keeps the old /publication/<name>/cite.bib download links working.
export async function getStaticPaths() {
  return (await getCollection('publication')).filter((e) => bibOf(e.id)).map((e) => ({ params: { slug: e.id } }));
}
export const GET: APIRoute = ({ params }) =>
  new Response(bibOf(params.slug!), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
