import * as path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from "@vitejs/plugin-legacy";

import virtualConfig from "./build/plugins/virtualConfig";

import type { UserConfig, ConfigEnv } from "vite";

import config from "./build/config";
const { env } = config;
const isDev = env === "development";
const isProd = env === "product";
const rootPath: string = process.cwd();

const viteConfig: UserConfig = {
  mode: isProd ? "production" : "development",
  root: rootPath,
  base: isDev ? "/" : config.publicPath,

  optimizeDeps: {},

  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  plugins: [
    virtualConfig(),
    //
    vue(), //
    vueJsx(),
  ],

  build: {
    target: "es2015",
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true,
      },
    },
    minify: isProd ? "esbuild" : false,
    rollupOptions: {
      output: {
        compact: true,
      },
    },
    commonjsOptions: {
      ignore: ["fs", "crypto", "stream"],
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        sourceMap: isProd ? false : true,
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(viteConfig);
