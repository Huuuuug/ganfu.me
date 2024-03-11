import "@unocss/reset/tailwind.css";
// import "markdown-it-github-alerts/styles/github-colors-light.css";
// import "markdown-it-github-alerts/styles/github-colors-dark-class.css";
// import "markdown-it-github-alerts/styles/github-base.css";
import "@shikijs/twoslash/style-rich.css";

import "@/assets/styles/main.css";
import "@/assets/styles/prose.css";
import "@/assets/styles/markdown.css";

import "uno.css";

import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import routes from "~pages";

import App from "./App.vue";

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, isClient, initialState }) => {
    app.use(createPinia());
  }
);
