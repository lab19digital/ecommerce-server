import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, SessionState } from "./types";

type SessionGetter = GetterTree<SessionState, RootState>;

export const state: SessionState = {
  email: null,
  has_active_session: false,
  token: null,
  user: null,
};

export const getters: SessionGetter = {
  has_active_session: (state) => state.has_active_session,
  user: (state) => state.user,
};

export const mutations: MutationTree<SessionState> = {
  logIn(state, { user, token }) {
    state.has_active_session = true;
    state.token = token;
    state.user = user;
  },
  clearSession(state) {
    state.has_active_session = false;
    state.token = null;
    state.user = null;
  },
};

export const actions: ActionTree<SessionState, RootState> = {
  logIn({ commit }: any, { errors, data }: any) {
    if (!errors && data.logIn.user) {
      const { user, token } = data.logIn;
      commit("logIn", {
        user,
        token,
      });
      return {
        success: true,
        error: null,
      };
    }

    return {
      success: false,
      error: {
        msg: errors ? errors[0].message : "Unknown failure",
        code: "403",
      },
    };
  },
  clearSession({ commit }: any) {
    commit("clearSession");
  },
};

export const session: Module<any, any> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
