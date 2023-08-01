import { createApp } from "./main";
import { createRouter } from "./router";
import createStore from "@/store";

const router = createRouter("client");
const store = createStore();

const { app } = createApp();

app.use(router);
app.use(store);

// 初始化 pinia
// 注意：__INITIAL_STATE__需要在 src/types/shims-global.d.ts中定义
if (window.__INITIAL_STATE__) {
  store.state.value = JSON.parse(window.__INITIAL_STATE__);
}

// 
router.isReady().then(() => {
  app.mount("#app", true);
});
