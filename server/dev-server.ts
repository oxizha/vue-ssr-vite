import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";

import * as vite from "vite";

import config from "./config/index.js";
import renderer from "./core/renderer.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

(async () => {
  const app = express();

  // 创建 vite 服务
  const viteServer = await vite.createServer({
    root: process.cwd(),
    logLevel: "error",
    server: {
      middlewareMode: "ssr",
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  });

  //
  app.use(viteServer.middlewares);

  //

  /*
--------------------------------------------
服务端渲染中间件
--------------------------------------------
*/
  app.use(cookieParser());

  //   app.use(
  //     `${config.routerPath}${config.ajaxPrefix}`,
  //     createProxyMiddleware({
  //       target: config.devProxy,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         [`^${config.routerPath}${config.ajaxPrefix}`]: `/`,
  //       },
  //     })
  //   );

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    const ctx = {
      path: url,
    };

    try {
      // 1. 获取index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );

      // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
      // template = await viteServer.transformIndexHtml(url, template);

      // 3. 加载服务器入口, vite.ssrLoadModule 将自动转换
      const { render } = await viteServer.ssrLoadModule("/src/entry-server.ts");

      //  4. 渲染应用的 HTML
      const [renderedHtml, state] = await render(ctx, {});

      const tempRenderer = renderer(template);

      const htmlTemplate = tempRenderer({
        platformConfig: {},
        scriptConfig: {},
      });

      console.log(htmlTemplate);

      const html = htmlTemplate
        .replace("<!--app-html-->", renderedHtml)
        .replace("<!--pinia-state-->", state);

      res.status(200);
      res.set({ "Content-Type": "text/html" });
      res.end(html);
    } catch (error) {
      viteServer && viteServer.ssrFixStacktrace(error);
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  app.listen(8877, () => {
    console.log("server is listening in 8877");
  });
})();
