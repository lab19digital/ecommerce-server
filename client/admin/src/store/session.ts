interface State {
  has_active_session: Boolean;
  token: string | null;
  user: any;
  name: any;
}
export default {
  state: {
    name: null,
    email: null,
    has_active_session: false,
  },

  mutations: {
    logIn(state: State, { user, token }: any) {
      state.has_active_session = true;
      state.name = user.name;
    },
    clearSession(state: State) {
      state.has_active_session = false;
      state.token = null;
      state.user = null;
    },
  },
  actions: {
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
  },
  getters: {},
};
