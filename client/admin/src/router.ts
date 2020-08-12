import routes from "./routes";
import VueRouter from "vue-router";
export default (App: any) =>
  new VueRouter({
    mode: "abstract",
    routes,
    // @ts-ignore
    components: [App],
  });
