import Vue from "vue";
import Vuex from "vuex";
import { session } from "./session";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    blah: "blahsfodfnao",
  },
  modules: {
    session,
  },
});
