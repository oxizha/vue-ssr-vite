import { createSSRApp } from "vue";

import "@/utils/polyfills";

import App from "./App.vue";

import { setupComponents } from "./components";

export const createApp = () => {
  const app = createSSRApp(App);

  setupComponents(app);

  return { app };
};
