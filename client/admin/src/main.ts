import Vue from "vue";
import App from "./components/App.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "@/router/router";
import "@/assets/scss/app.scss";
import store from "@/store/store";
import { createProvider } from "./vue-apollo";
import "@/assets/styles/tailwindcss.css";

Vue.use(Vuex);

// Configure development tools
Vue.config.devtools = process.env.NODE_ENV === "development";

// Instantiate and render the app
const app = new Vue({
  el: "#app",
  router,
  store,
  render: (ce) => ce(App),
  apolloProvider: createProvider(),
});

// Configure development tools
// @ts-ignore
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
