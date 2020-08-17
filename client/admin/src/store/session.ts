import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
// import { RootState, SessionState, Session } from "../types";

// type SessionGetter = GetterTree<SessionState, RootState>;

export const state: any = {
  name: null,
  email: null,
  has_active_session: false,
  token: null,
  user: null,
};

export const getters: GetterTree<any, any> = {
  has_active_session: (state) => state.has_active_session,
  name: (state) => state.name,
};

export const mutations: MutationTree<any> = {
  logIn(state, { user, token }) {
    state.has_active_session = true;
    state.name = user.name;
  },
  clearSession(state) {
    state.has_active_session = false;
    state.token = null;
    state.user = null;
  },
};

export const actions: ActionTree<any, any> = {
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
