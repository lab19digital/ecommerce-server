import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, OrdersState } from "@/types/types";
import { apolloClient, onLogin, onLogout } from "@/vue-apollo";
import { ADMIN_ORDERS } from "@/graphql/queries";

type OrdersGetter = GetterTree<OrdersState, RootState>;

export const state: OrdersState = {
  loading: false,
};

export const getters: OrdersGetter = {
  loadingOrdersResults: (state) => state.loading,
};

export const mutations: MutationTree<OrdersState> = {
  SET_TABLE_RESULT(state, result) {
    state.loading = result;
  },
};

export const actions: ActionTree<OrdersState, RootState> = {
  async ordersResults({ commit }, paginatorInfo) {
    commit("SET_TABLE_RESULT", true);

    return await apolloClient
      .mutate({
        mutation: ADMIN_ORDERS,
        variables: { ...paginatorInfo },
      })
      .then((data: []) => {
        commit("SET_TABLE_RESULT", false);
        return data;
      });
  },
};

export const orders: Module<OrdersState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
