import { GetterTree, MutationTree, ActionTree, Module } from "vuex";
import { RootState, PaginatorState } from "@/types/types";
import { apolloClient, onLogin, onLogout } from "@/vue-apollo";
import { ADMIN_PRODUCTS } from "@/graphql/queries";

type PaginatorGetter = GetterTree<PaginatorState, RootState>;

export const state: PaginatorState = {
  total: 0,
  hasMorePages: false,
  currentPage: 1,
  first: 10,
  totalPages: 0,
  errors: [],
  reload: false,
};

export const getters: PaginatorGetter = {
  paginatorInfo: (state) => state,
  getPaginatorErrors: (state) => state.errors,
};

export const mutations: MutationTree<PaginatorState> = {
  UPDATE_PAGINATOR(state, paginatorInfo) {
    state.currentPage = paginatorInfo.currentPage;
    state.hasMorePages = paginatorInfo.hasMorePages;
    state.total = paginatorInfo.total;
    state.reload = paginatorInfo.reload;
    state.totalPages = Math.ceil(state.total / state.first);
  },
  RESET_PAGINATOR_ERROR(state) {
    state.errors = [];
  },
  UPDATE_RELOAD(state, payload) {
    state.reload = payload;
  },
  PAGINATOR_NEXT(state) {
    if (
      state.currentPage >= 1 &&
      state.hasMorePages &&
      state.currentPage <= Math.ceil(state.total / state.first)
    ) {
      state.currentPage++;
    } else {
      state.errors.push(
        "Enter a number up to " + Math.ceil(state.total / state.first)
      );
    }
  },
  PAGINATOR_PREVIOUS(state) {
    if (
      state.currentPage >= 1 &&
      state.currentPage <= Math.ceil(state.total / state.first)
    ) {
      state.currentPage--;
    } else {
      state.errors.push(
        "Enter a number up to " + Math.ceil(state.total / state.first)
      );
    }
  },
  PAGINATOR_INPUT_CHANGE(state, value) {
    const currentPage = value;
    const totalPages = state.total;
    const pagesFirst = state.first;
    const ceiledPages = Math.ceil(totalPages / pagesFirst);

    if (currentPage < 1 || currentPage > ceiledPages) {
      state.errors.push("Enter a number up to " + ceiledPages);
    } else if (currentPage >= 1 && currentPage <= ceiledPages) {
      state.currentPage = currentPage;
    } else {
      state.errors.push("Error occurred");
    }
  },
};

export const actions: ActionTree<PaginatorState, RootState> = {
  updatePaginatorInfo({ commit }, paginatorInfo) {
    commit("UPDATE_PAGINATOR", paginatorInfo);
  },
  resetPaginatorInfoError({ commit }) {
    commit("RESET_PAGINATOR_ERROR");
  },
  paginatorNext({ commit }) {
    commit("PAGINATOR_NEXT");
  },
  paginatorPrevious({ commit }) {
    commit("PAGINATOR_PREVIOUS");
  },
  paginatorInputChange({ commit }, value) {
    commit("PAGINATOR_INPUT_CHANGE", value);
  },
  reloadResults({ commit, state }, value) {
    commit("UPDATE_RELOAD", value);
  },
};

export const paginator: Module<PaginatorState, RootState> = {
  state,
  getters,
  mutations,
  actions,
  namespaced: true,
};
