import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, ProductsState } from "@/types/types";
import { apolloClient, onLogin, onLogout } from "@/vue-apollo";
import { ADMIN_PRODUCTS } from "@/graphql/queries";

type ProductsGetter = GetterTree<ProductsState, RootState>;

export const state: ProductsState = {
  loading: false,
};

export const getters: ProductsGetter = {
  loadingProductsResults: (state) => state.loading,
};

export const mutations: MutationTree<ProductsState> = {
  SET_TABLE_RESULT(state, result) {
    state.loading = result;
  },
};

export const actions: ActionTree<ProductsState, RootState> = {
  async productsResults({ commit }, paginatorInfo) {
    commit("SET_TABLE_RESULT", true);

    return await apolloClient
      .mutate({
        mutation: ADMIN_PRODUCTS,
        variables: { ...paginatorInfo },
      })
      .then((data: []) => {
        commit("SET_TABLE_RESULT", false);
        return data;
      });
  },
};

export const products: Module<any, any> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
