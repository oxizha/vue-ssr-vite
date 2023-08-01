import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";

import { createProxyMiddleware } from "http-proxy-middleware";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

import config from "./config/index.js";
import renderer from "./core/renderer.js";
//
export async function setup() {
  const app = express();

  const clientRoot = resolve("../dist/client");
  const template = fs.readFileSync(
    resolve("../dist/client/index.html"),
    "utf-8"
  );
  const tempRenderer = renderer(template);
  const manifest =
    JSON.parse(
      fs.readFileSync(resolve("../dist/client/ssr-manifest.json"), "utf-8")
    ) || {};

  const { render } = await import("../dist/server/entry-server.js");

  const staticMiddleware = (await import("serve-static")).default;
  app.use(
    staticMiddleware(resolve("../dist/client"), {
      index: false,
    })
  );
  /*
  --------------------------------------------
  挂载代理
  --------------------------------------------
  */
  //
  //   app.use(
  //     `${config.routerPath}`,
  //     createProxyMiddleware({
  //       target: config.,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         [`^${config.routerPath}`]: "/",
  //       },
  //     })
  //   );

  /*
  --------------------------------------------
  挂载中间件
  --------------------------------------------
  */
  //
  app.use(compression({ threshold: 0 }));

  app.use(cookieParser());

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    const ctx = {
      path: url,
    };

    try {
      const [renderedHtml, state, preloadLinks] = await render(ctx, manifest);

    const htmlTemplate = tempRenderer({
        platformConfig: {},
        scriptConfig: {},
      });

      const html = htmlTemplate
        .replace("<!--preload-links-->", preloadLinks) //
        .replace("<!--pinia-state-->", state)
        .replace("<!--app-html-->", renderedHtml);

      res.status(200);
      res.set({ "Content-Type": "text/html" });
      res.end(html);
    } catch (error) {
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  app.listen(config.port, () => {
    console.log(`服务器已启动 地址...... :${config.port}`);
  });
}
