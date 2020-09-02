import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import routes from "./routes";
import store from "@/store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is logged in
    store.dispatch("session/checkLoggedIn");

    let isUserLoggedIn = store.getters["session/isAuthenticated"];
    let isAdmin = store.getters["session/isAdmin"];

    if (!isUserLoggedIn || isAdmin != 1) {
      // store.dispatch("logOut");
      next({
        path: "/login",
        query: { redirectFrom: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
