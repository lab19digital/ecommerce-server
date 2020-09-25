import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Products from "@/views/Products.vue";
import store from "@/store/store";

export default [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: Login,
    beforeEnter: (to: any, from: any, next: any) => {
      store.dispatch("session/checkLoggedIn");
      const isUserLoggedIn = store.getters["session/isAuthenticated"];
      const isAdmin = store.getters["session/isAdmin"];

      if (isUserLoggedIn && isAdmin == 1) {
        next({
          path: "/dashboard",
        });
      } else {
        next();
      }
    },
  },
];
