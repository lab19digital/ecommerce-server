import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to: any, from: any, next: any) => {
      next();
    },
  },
  {
    path: "/login",
    component: Login,
  },
];
