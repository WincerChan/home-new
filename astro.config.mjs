import solidJs from "@astrojs/solid-js";
import { defineConfig } from 'astro/config';
import serviceWorker from 'astrojs-service-worker';

import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), UnoCSS({ injectReset: true }), serviceWorker()]
});