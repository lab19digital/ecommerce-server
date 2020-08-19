import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import store from "@/store/store";

export default [
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to: any, from: any, next: any) => {
      // @ts-ignore
      console.log(store.state.blah);

      next();
    },
  },
  {
    path: "/login",
    component: Login,
  },
];
