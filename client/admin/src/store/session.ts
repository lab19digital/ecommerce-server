import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, SessionState } from "./types";
import { apolloClient, onLogin, onLogout } from "@/vue-apollo";
import { LOGGED_IN_USER } from "@/graphql/queries";
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER } from "@/graphql/mutations";

type SessionGetter = GetterTree<SessionState, RootState>;

const AUTH_TOKEN = "apollo-token";

export const state: SessionState = {
  email: null,
  token: null,
  user: { is_admin: 0 },
  authStatus: false,
};

export const getters: SessionGetter = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.authStatus,
  user: (state) => state.user,
  isAdmin: (state) => state.user.is_admin,
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
    state.token = "";
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
      localStorage.setItem(AUTH_TOKEN, token);
      dispatch("setUser");
    } catch (e) {
      console.log(e);
    }
  },
  async logIn({ commit, dispatch }, authDetails) {
    try {
      const { data } = await apolloClient.mutate({
        mutation: LOGIN_USER,
        variables: { ...authDetails },
      });

      const token = data.logIn.token;
      const user = data.logIn.user;

      commit("SET_TOKEN", token);
      await onLogin(apolloClient, token);

      dispatch("setUser", user);
    } catch (e) {
      console.log("THE ERROR" + e);
    }
  },
  async setUser({ commit }, user) {
    try {
      // Can't query current user, incorrect permissions or user not found, TODO: figure out why
      // const { data } = await apolloClient.query({ query: LOGGED_IN_USER });
      commit("LOGIN_USER", user);
    } catch (error) {
      console.log(error);
    }
  },
  async logOut({ commit }) {
    commit("LOGOUT_USER");
    await onLogout(apolloClient);
  },
  async checkLoggedIn({ commit }) {
    if (localStorage.getItem(AUTH_TOKEN) != null) {
      let token = localStorage.getItem(AUTH_TOKEN);
      commit("LOGIN_USER", { is_admin: true });
      commit("SET_TOKEN", token);
    }
  },
};

export const session: Module<any, any> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
