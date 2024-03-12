import { resolve } from "node:path";
import { defineConfig } from "vite";
import fs from "fs-extra";
import matter from "gray-matter";
import Markdown from "unplugin-vue-markdown/vite";
import UnoCSS from "unocss/vite";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
import MarkdownItShiki from "@shikijs/markdown-it";
import anchor from "markdown-it-anchor";
import { rendererRich, transformerTwoslash } from "@shikijs/twoslash";

// @ts-expect-error missing types
import TOC from "markdown-it-table-of-contents";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@/", replacement: `${resolve(__dirname, "src")}/` }],
  },
  plugins: [
    UnoCSS(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ["vue", "md"],
      dirs: "pages",
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1));
        if (!path.includes("projects.md") && path.endsWith(".md")) {
          const md = fs.readFileSync(path, "utf-8");
          const { data } = matter(md);
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        }
        return route;
      },
    }),
    Markdown({
      headEnabled: true,
      wrapperClasses: (id, code) => {
        return "prose";
      },
      async markdownItSetup(md) {
        md.use(
          await MarkdownItShiki({
            themes: {
              dark: "vitesse-dark",
              light: "vitesse-light",
            },
            defaultColor: false,
            cssVariablePrefix: "--s-",
            transformers: [
              transformerTwoslash({
                explicitTrigger: true,
                renderer: rendererRich(),
              }),
            ],
          })
        );
        md.use(TOC, {
          includeLevel: [1, 2, 3, 4],
          containerHeaderHtml:
            '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
        });

        md.use(anchor, {
          permalink: anchor.permalink.linkInsideHeader({
            symbol: "#",
            renderAttrs: () => ({ "aria-hidden": "true" }),
          }),
        });
      },
    }),
  ],
});
