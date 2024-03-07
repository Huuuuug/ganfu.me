import { resolve } from "node:path";
import { defineConfig } from "vite";
import fs from "fs-extra";
import matter from "gray-matter";
import Markdown from "unplugin-vue-markdown/vite";
import UnoCSS from "unocss/vite";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";

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
      dirs: "src/pages",
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
    }),
  ],
});
