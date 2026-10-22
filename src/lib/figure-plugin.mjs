// Markdown plugin: an image that sits alone in a paragraph and has a title,
// `![alt](photo.jpg "Caption")`, becomes <figure><img><figcaption>Caption</figcaption></figure>
// (the same output Hugo produced).
import { defineHastPlugin } from 'satteri';

function captionOf(img) {
  const p = img.properties ?? {};
  if (p.title) return String(p.title);
  // Astro may already have moved the image props into a JSON attribute.
  const raw = p.__ASTRO_IMAGE_;
  if (raw) {
    try { return JSON.parse(raw).title; } catch {}
  }
}

// Article images are resized to at most this width (2x the 760px text column).
const MAX_WIDTH = 1200;

export default defineHastPlugin({
  name: 'figure-captions',
  element: [{
    filter: ['img'],
    visit(node, ctx) {
      const p = node.properties ?? {};
      if (p.__ASTRO_IMAGE_) {
        const props = JSON.parse(p.__ASTRO_IMAGE_);
        if (!props.width && !props.height) ctx.setProperty(node, '__ASTRO_IMAGE_', JSON.stringify({ ...props, width: MAX_WIDTH }));
      } else if (!p.width && !p.height && !/^https?:/.test(p.src ?? '')) {
        ctx.setProperty(node, 'width', MAX_WIDTH);
      }
    },
  }, {
    filter: ['p'],
    visit(node, ctx) {
      const kids = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
      if (kids.length !== 1 || kids[0].type !== 'element' || kids[0].tagName !== 'img') return;
      const caption = captionOf(kids[0]);
      if (!caption) return;
      ctx.replaceNode(node, {
        type: 'element',
        tagName: 'figure',
        properties: {},
        children: [
          kids[0],
          { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] },
        ],
      });
    },
  }],
});
