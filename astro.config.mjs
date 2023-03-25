import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import serviceWorker from "astrojs-service-worker";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind(), serviceWorker()]
});