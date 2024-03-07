import "@/assets/styles/main.css";
import "virtual:uno.css";

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
