// Site-wide settings. This replaces Hugo's config/_default/*.yaml.

export const site = {
  title: 'Xiaohan Gao',
  description: 'Xiaohan Gao Personal Website.',
  url: 'https://gaoxiaohan.com',
  googleAnalytics: 'G-SX8SNSVECP',
  // Footer licence (CC BY-NC-ND 4.0, like before).
  copyright: `© ${new Date().getFullYear()} Me. This work is licensed under`,
  license: { name: 'CC BY NC ND 4.0', url: 'https://creativecommons.org/licenses/by-nc-nd/4.0' },
};

export type MenuItem = { name: string; url?: string; children?: MenuItem[] };

// Top navigation bar. Order here = order on screen.
export const menu: MenuItem[] = [
  { name: 'Home', url: '/#about' },
  { name: 'Posts', url: '/post/' },
  { name: 'Publications', url: '/publication/' },
  { name: 'Projects', url: '/project/' },
  { name: 'Contact', url: '/#contact' },
  {
    name: 'Personal',
    children: [
      { name: 'Blogs', url: 'https://blog.gaoxiaohan.com/' },
      { name: 'Team', url: '/team/' },
      { name: 'Connectivity', url: '/friend/' },
      { name: 'Otherworlds', url: '/otherworlds/' },
    ],
  },
];

export const publicationTypes: Record<string, string> = {
  '0': 'Uncategorized',
  '1': 'Conference paper',
  '2': 'Journal article',
  '3': 'Preprint',
  '4': 'Report',
  '5': 'Book',
  '6': 'Book section',
  '7': 'Thesis',
  '8': 'Patent',
};
