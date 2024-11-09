import presetIcons from "@unocss/preset-icons";
import { defineConfig, presetWind, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({}),
    presetWind({}),
    presetWebFonts({
      provider: "bunny",
      fonts: {
        headline: "Kumbh Sans:400,600",
      },
    }),
  ],
});
