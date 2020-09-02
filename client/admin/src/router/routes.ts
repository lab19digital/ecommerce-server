import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: Login,
  },
];
