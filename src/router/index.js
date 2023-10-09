import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/pages/AboutView.vue"),
  },
  {
    path: "/beranda",
    name: "beranda",
    component: () => import("@/pages/Beranda.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
