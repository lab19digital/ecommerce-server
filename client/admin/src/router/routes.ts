import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store/store";

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: Login,
    beforeEnter: (to: any, from: any, next: any) => {
      let isUserLoggedIn = store.getters["session/isAuthenticated"];
      let isAdmin = store.getters["session/isAdmin"];

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
