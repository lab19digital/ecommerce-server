import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, PaginatorState } from "@/types/types";
import { apolloClient, onLogin, onLogout } from "@/vue-apollo";
import { ADMIN_PRODUCTS } from "@/graphql/queries";

type PaginatorGetter = GetterTree<PaginatorState, RootState>;

export const state: PaginatorState = {
  total: 0,
  hasMorePages: false,
  currentPage: 1,
  first: 15,
  totalPages: 0,
  errors: [],
};

export const getters: PaginatorGetter = {
  getPaginatorState: (state) => state,
};

export const mutations: MutationTree<PaginatorState> = {
  UPDATE_PAGINATOR(state, paginatorInfo) {
    state = paginatorInfo;
  },
};

export const actions: ActionTree<PaginatorState, RootState> = {
  updatePaginatorInfo({ commit }, paginatorInfo) {
    commit("UPDATE_PAGINATOR", paginatorInfo);
  },
  paginatorNext({ commit, state }, paginatorInfo) {
    if (
      state.currentPage >= 1 &&
      state.hasMorePages &&
      state.currentPage <= Math.ceil(state.total / state.first)
    ) {
      state.currentPage++;
      // this.loadProducts();
    } else {
      state.errors.push(
        "Enter a number up to " + Math.ceil(state.total / state.first)
      );
    }
  },

  paginatorPrevious({ commit, state }, paginatorInfo) {
    if (
      state.currentPage >= 1 &&
      state.currentPage <= Math.ceil(state.total / state.first)
    ) {
      state.currentPage--;
      // this.loadProducts();
    } else {
      state.errors.push(
        "Enter a number up to " + Math.ceil(state.total / state.first)
      );
    }
  },

  paginatorInputChange({ commit, state }, paginatorInfo) {
    const currentPage = state.currentPage;
    const totalPages = state.total;
    const pagesFirst = state.first;
    const ceiledPages = Math.ceil(totalPages / pagesFirst);

    if (currentPage < 1 || currentPage > ceiledPages) {
      state.errors.push("Enter a number up to " + ceiledPages);
      state.currentPage = 1;
    } else if (currentPage >= 1 && currentPage <= ceiledPages) {
      // this.loadProducts();
    } else {
      state.errors.push("Error ");
      state.currentPage = 1;
    }
  },
};

export const paginator: Module<PaginatorState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
