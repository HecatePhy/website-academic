import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import figureCaptions from './src/lib/figure-plugin.mjs';

export default defineConfig({
  site: 'https://gaoxiaohan.com',
  build: { format: 'directory' },
  markdown: {
    processor: satteri({ hastPlugins: [figureCaptions] }),
    shikiConfig: { themes: { light: 'github-light', dark: 'dracula' } },
  },
});
