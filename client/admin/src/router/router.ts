import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import routes from "./routes";
import { beforeEachGernzy } from "./helper";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => beforeEachGernzy(to, from, next));

export default router;
