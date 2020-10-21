import Vue from "vue";
import Vuex from "vuex";
import { session } from "./session";
import { products } from "./products";
import { orders } from "./orders";
import { paginator } from "./paginator";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    session,
    products,
    orders,
    paginator,
  },
});
