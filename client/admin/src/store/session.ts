import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, SessionState } from "./types";
import { apolloClient } from "@/vue-apollo";
import { LOGGED_IN_USER } from "@/graphql/queries";
import { LOGIN_USER, REGISTER_USER } from "@/graphql/mutations";

type SessionGetter = GetterTree<SessionState, RootState>;

export const state: SessionState = {
  email: null,
  token: null,
  user: {},
  authStatus: false,
};

export const getters: SessionGetter = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.authStatus,
  user: (state) => state.user,
};

export const mutations: MutationTree<SessionState> = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  LOGIN_USER(state, user) {
    state.authStatus = true;
    state.user = { ...user };
  },
  LOGOUT_USER(state) {
    state.authStatus = false;
    state.token = "" && localStorage.removeItem("apollo-token");
  },
};

export const actions: ActionTree<SessionState, RootState> = {
  async register({ commit, dispatch }, authDetails) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: REGISTER_USER,
        variables: { ...authDetails },
      });
      const token = data.createUser.token;
      commit("SET_TOKEN", token);
      localStorage.setItem("apollo-token", token);
      dispatch("setUser");
    } catch (e) {
      console.log(e);
    }
  },
  async logIn({ commit, dispatch }, authDetails) {
    try {
      // const { data } = await apolloClient.mutate({
      //   mutation: LOGIN_USER,
      //   variables: { ...authDetails },
      // });

      // const token = data.logIn.token;
      // commit("SET_TOKEN", token);
      // localStorage.setItem("apollo-token", token);
      dispatch("setUser");
    } catch (e) {
      console.log("THE ERROR" + e);
    }
  },
  async setUser({ commit }) {
    try {
      const { data } = await apolloClient.query({ query: LOGGED_IN_USER });
      console.log(data);

      commit("LOGIN_USER", data.me);
    } catch (error) {
      console.log(error);
    }
  },
  async logOut({ commit, dispatch }) {
    commit("LOGOUT_USER");
  },
};

export const session: Module<any, any> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
