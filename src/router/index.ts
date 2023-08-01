import {
  createRouter as createVueRouter,
  createMemoryHistory,
  createWebHistory,
  Router,
} from "vue-router";

import Home from "@/views/home/index.vue";

export const createRouter = (type: "client" | "server"): Router =>
  createVueRouter({
    history: type === "client" ? createWebHistory() : createMemoryHistory(),

    routes: [
      {
        path: "/",
        name: "home",
        meta: {
          title: "首页",
        },
        component: Home,
      },
      {
        path: "/blog",
        name: "blog",
        meta: {
          title: "博客",
        },
        component: () => import("@/views/blog/index.vue"),
      },
    ],
  });
