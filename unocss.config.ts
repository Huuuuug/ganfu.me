import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      extraProperties: {
        display: "inline-block",
        height: "1.2em",
        width: "1.2em",
        "vertical-align": "text-bottom",
      },
    }),
    presetAttributify(),
    presetUno(),
    presetWebFonts({
      fonts: {
        sans: "Inter:400,600,800",
        mono: "DM Mono:400,600",
      },
    }),
  ],
  safelist: ["i-ri-menu-2-fill"],
});
