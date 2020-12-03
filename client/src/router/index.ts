import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/urls",
    name: "URLs",
    component: () => import("../views/urls/ListUrls.vue"),
  },
  {
    path: "/urls/:id",
    name: "EditURL",
    component: () => import("../views/urls/EditURL.vue"),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
