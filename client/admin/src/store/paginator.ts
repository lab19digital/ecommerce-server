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
  getPaginatorErrors: (state) => state.errors,
};

export const mutations: MutationTree<PaginatorState> = {
  UPDATE_PAGINATOR(state, paginatorInfo) {
    state.currentPage = paginatorInfo.currentPage;
    state.hasMorePages = paginatorInfo.hasMorePages;
    state.total = paginatorInfo.total;
    state.totalPages = Math.ceil(state.total / state.first);
  },
  RESET_PAGINATOR_ERROR(state) {
    state.errors = [];
  },
};

export const actions: ActionTree<PaginatorState, RootState> = {
  updatePaginatorInfo({ commit }, paginatorInfo) {
    commit("UPDATE_PAGINATOR", paginatorInfo);
  },
  resetPaginatorInfoError({ commit }) {
    commit("RESET_PAGINATOR_ERROR");
  },
  paginatorNext({ commit, state }, paginatorInfo) {
    console.log("store paginatorNext");

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
    console.log("store paginatorPrevious");

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
    console.log("store paginatorInputChange");

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
