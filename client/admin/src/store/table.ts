import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, TableState } from "./types";
import { apolloClient, onLogin, onLogout } from "@/vue-apollo";
import { ADMIN_PRODUCTS } from "@/graphql/queries";

type TableGetter = GetterTree<TableState, RootState>;

export const state: TableState = {
  loading: false,
};

export const getters: TableGetter = {
  loadingTableResults: (state) => state.loading,
};

export const mutations: MutationTree<TableState> = {
  SET_TABLE_RESULT(state, result) {
    state.loading = result;
  },
};

export const actions: ActionTree<TableState, RootState> = {
  async tableResults({ commit }, paginatorInfo) {
    commit("SET_TABLE_RESULT", true);

    return await apolloClient
      .mutate({
        mutation: ADMIN_PRODUCTS,
        variables: { ...paginatorInfo },
      })
      .then((data: any) => {
        commit("SET_TABLE_RESULT", false);
        return data;
      });
  },
};

export const table: Module<any, any> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
