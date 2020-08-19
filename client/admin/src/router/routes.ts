import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store/store";

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to: any, from: any, next: any) => {
      // @ts-ignore
      if (store.state.session.has_active_session === false) {
        next({
          path: "/login", // back to safety
          query: {
            redirectFrom: to.fullPath,
          },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    component: Login,
  },
];
