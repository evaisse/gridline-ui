// Harvests the list of documented components from each UI library's public documentation site
// and writes it to src/catalog/sources.generated.json.
//
//   node scripts/harvest-refs.mjs            fetch every library
//   node scripts/harvest-refs.mjs mui antd   fetch only these
//
// Each library is read from one or more index pages (or its sitemap); every link matching the
// library's component URL pattern becomes one entry. Nothing is guessed: a URL is listed only
// because the site links to it. Requires `curl` (it honours HTTPS_PROXY, which Node's fetch does not).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = new URL('../src/catalog/sources.generated.json', import.meta.url);

/**
 * pages:   where to look for links.
 * pattern: a path regex with one capture group, the component slug.
 * url:     how to build the documentation URL from the slug.
 * skip:    slugs that are not components (overview pages, guides).
 * drop:    a regex for the same purpose.
 */
const LIBRARIES = {
  shadcn: { name: 'shadcn/ui', pages: ['https://ui.shadcn.com/sitemap.xml'], pattern: /ui\.shadcn\.com\/docs\/components\/(?:radix\/|base\/)?([a-z0-9-]+)(?=[<"])/g, url: (s) => `https://ui.shadcn.com/docs/components/${s}` },
  radix: { name: 'Radix Primitives', pages: ['https://www.radix-ui.com/primitives/docs/components/accordion'], pattern: /\/primitives\/docs\/components\/([a-z0-9-]+)/g, url: (s) => `https://www.radix-ui.com/primitives/docs/components/${s}` },
  baseui: { name: 'Base UI', pages: ['https://base-ui.com/react/components/accordion'], pattern: /\/react\/components\/([a-z0-9-]+)/g, url: (s) => `https://base-ui.com/react/components/${s}` },
  ark: { name: 'Ark UI', pages: ['https://ark-ui.com/sitemap.xml'], pattern: /ark-ui\.com\/docs\/components\/([a-z0-9-]+)/g, url: (s) => `https://ark-ui.com/docs/components/${s}` },
  headless: { name: 'Headless UI', pages: ['https://headlessui.com/react/menu'], pattern: /\/react\/([a-z-]+)(?=["\\])/g, url: (s) => `https://headlessui.com/react/${s}`, skip: ['forward'] },
  aria: { name: 'React Aria', pages: ['https://react-aria.adobe.com/Button', 'https://react-aria.adobe.com/'], pattern: /href="(?:https:\/\/react-aria\.adobe\.com)?\/([A-Z][A-Za-z]+)"/g, url: (s) => `https://react-aria.adobe.com/${s}` },
  spectrum: { name: 'React Spectrum', pages: ['https://react-spectrum.adobe.com/Button'], pattern: /href="(?:https:\/\/react-spectrum\.adobe\.com)?\/([A-Z][A-Za-z]+)"/g, url: (s) => `https://react-spectrum.adobe.com/${s}` },
  mui: { name: 'Material UI', pages: ['https://mui.com/material-ui/all-components/', 'https://mui.com/material-ui/react-button/'], pattern: /\/material-ui\/react-([a-z0-9-]+)\//g, url: (s) => `https://mui.com/material-ui/react-${s}/` },
  antd: { name: 'Ant Design', pages: ['https://ant.design/sitemap.xml'], pattern: /ant\.design\/components\/([a-z0-9-]+)(?=[<"/])/g, url: (s) => `https://ant.design/components/${s}`, skip: ['overview', 'changelog'], drop: /-cn$/ },
  chakra: { name: 'Chakra UI', pages: ['https://chakra-ui.com/docs/components/accordion'], pattern: /\/docs\/components\/([a-z0-9-]+)/g, url: (s) => `https://chakra-ui.com/docs/components/${s}`, skip: ['concepts'] },
  mantine: { name: 'Mantine', pages: ['https://mantine.dev/sitemap.xml'], pattern: /mantine\.dev\/((?:core|dates|charts)\/[a-z0-9-]+)\/?(?=[<"])/g, url: (s) => `https://mantine.dev/${s}/`, skip: ['core/package', 'dates/getting-started', 'charts/getting-started'] },
  carbon: { name: 'Carbon', pages: ['https://carbondesignsystem.com/components/overview/components/'], pattern: /\/components\/([a-z0-9-]+)(?=["/])/g, url: (s) => `https://carbondesignsystem.com/components/${s}/usage/`, skip: ['overview'] },
  polaris: { name: 'Polaris', pages: ['https://shopify.dev/docs/api/app-home/polaris-web-components'], pattern: /\/docs\/api\/app-home\/latest\/web-components\/([a-z0-9-]+\/[a-z0-9-]+)/g, url: (s) => `https://shopify.dev/docs/api/app-home/latest/web-components/${s}` },
  primer: { name: 'Primer', pages: ['https://primer.style/sitemap.xml'], pattern: /primer\.style\/product\/components\/([a-z0-9-]+)\/?(?=[<"])/g, url: (s) => `https://primer.style/product/components/${s}/` },
  atlassian: { name: 'Atlassian Design System', pages: ['https://atlassian.design/components'], pattern: /\/components\/([a-z0-9-]+)(?=["/\\])/g, url: (s) => `https://atlassian.design/components/${s}`, drop: /^(eslint|stylelint|storybook|css|tokens$|primitives$|entry-points|app-provider|motion$|object$|logo$|portal$|popper$|pragmatic)/ },
  fluent: { name: 'Fluent 2', pages: ['https://fluent2.microsoft.design/components/web/react', 'https://fluent2.microsoft.design/sitemap.xml'], pattern: /\/components\/web\/react\/core\/([a-z0-9-]+)\/usage/g, url: (s) => `https://fluent2.microsoft.design/components/web/react/core/${s}/usage` },
  heroui: { name: 'HeroUI', pages: ['https://www.heroui.com/docs/components/accordion'], pattern: /\/docs\/react\/components\/([a-z0-9-]+)/g, url: (s) => `https://www.heroui.com/docs/react/components/${s}` },
  daisy: { name: 'daisyUI', pages: ['https://daisyui.com/sitemap.xml'], pattern: /daisyui\.com\/components\/([a-z0-9-]+)\/(?=[<"])/g, url: (s) => `https://daisyui.com/components/${s}/` },
  assistant: { name: 'assistant-ui', pages: ['https://www.assistant-ui.com/sitemap.xml'], pattern: /assistant-ui\.com\/((?:elements|docs\/api-reference\/primitives)\/[a-z0-9-]+)(?=[<"])/g, url: (s) => `https://www.assistant-ui.com/${s}`, skip: ['docs/api-reference/primitives/composition'] },
};

const curl = (url) => {
  try {
    return execFileSync('curl', ['-sSL', '-m', '40', '--compressed', '-A', 'Mozilla/5.0 (compatible; docs-index)', url], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  } catch {
    return '';
  }
};

const only = process.argv.slice(2);
let previous = {};
try { previous = JSON.parse(readFileSync(OUT, 'utf8')).libraries ?? {}; } catch { /* first run */ }

const libraries = {};
for (const [id, lib] of Object.entries(LIBRARIES)) {
  if (only.length > 0 && !only.includes(id)) { if (previous[id]) libraries[id] = previous[id]; continue; }
  const slugs = new Set();
  for (const page of lib.pages) for (const match of curl(page).matchAll(lib.pattern)) slugs.add(match[1]);
  for (const slug of [...slugs]) if ((lib.skip ?? []).includes(slug) || lib.drop?.test(slug)) slugs.delete(slug);
  const components = [...slugs].sort().map((slug) => ({ slug, url: lib.url(slug) }));
  // Keep the earlier harvest when a site is unreachable, rather than wiping its entries.
  libraries[id] = components.length > 0 || !previous[id] ? { name: lib.name, components } : previous[id];
  console.log(`${id.padEnd(10)} ${String(libraries[id].components.length).padStart(4)} components`);
}

writeFileSync(OUT, `${JSON.stringify({ note: 'Generated by scripts/harvest-refs.mjs. Do not edit by hand.', libraries }, null, 1)}\n`);
