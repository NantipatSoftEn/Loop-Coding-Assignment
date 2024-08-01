import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), auth()],
  output: 'server',
  adapter: vercel()
});