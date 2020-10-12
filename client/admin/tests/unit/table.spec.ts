import Vue from "vue";
import { mount, shallowMount } from "@vue/test-utils";
import Table from "@/components/Table.vue";
import store from "@/store/store";
import {
  createLocalVue,
  createApolloTestProvider,
  makeGetInitialState,
} from "./helper";
import "isomorphic-fetch";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
const apolloProvider = createApolloTestProvider();
const getInitialState = makeGetInitialState(store);

describe("Table", () => {
  beforeEach(() => {
    store.replaceState(getInitialState());
  });

  test("should render content correctly", async function (done) {
    const wrapper = mount(Table, {
      store,
      localVue,
      apolloProvider,
    });
    await flushPromises();
    expect(wrapper.findComponent(Table).exists()).toBe(true);
    done();
  });

  test("can handle successful next button is clicked", async function (done) {
    const wrapper: any = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    const originalCurrentPage: any = store.state.paginator.currentPage;
    expect(originalCurrentPage == 0).toBe(false);
    store.state.paginator.currentPage = 1;
    store.state.paginator.hasMorePages = true;
    store.state.paginator.total = 100;

    wrapper.find("#pnext").trigger("click");
    await flushPromises();
    const newCurrentPage: any = store.state.paginator.currentPage;

    expect(originalCurrentPage == newCurrentPage).toBe(false);
    expect(wrapper.findComponent(Table).exists()).toBe(true);

    wrapper.destroy();
    done();
  });

  test("can handle successful prev button is clicked", async function (done) {
    const wrapper: any = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    const originalCurrentPage: any = store.state.paginator.currentPage;
    expect(originalCurrentPage == 0).toBe(false);
    store.state.paginator.currentPage = 3;
    store.state.paginator.hasMorePages = true;
    store.state.paginator.total = 100;

    wrapper.find("#pprev").trigger("click");
    await flushPromises();
    const newCurrentPage: any = store.state.paginator.currentPage;
    expect(originalCurrentPage == newCurrentPage).toBe(false);
    expect(wrapper.findComponent(Table).exists()).toBe(true);

    wrapper.destroy();
    done();
  });

  test("can handle failed prev/next button is clicked", async function (done) {
    const wrapper: any = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    store.state.paginator.hasMorePages = false;

    wrapper.find("#pnext").trigger("click");
    await flushPromises();
    expect(store.state.paginator.errors.length > 0).toBe(true);

    store.dispatch("paginator/resetPaginatorInfoError");

    store.state.paginator.currentPage = 0;
    wrapper.find("#pprev").trigger("click");
    await flushPromises();
    expect(store.state.paginator.errors.length > 0).toBe(true);

    wrapper.destroy();
    done();
  });

  test("can handle successful paginator input change", async function (done) {
    const wrapper: any = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    const originalCurrentPage: any = store.state.paginator.currentPage;
    expect(originalCurrentPage == 0).toBe(false);
    store.state.paginator.currentPage = 1;
    store.state.paginator.hasMorePages = true;
    store.state.paginator.total = 100;

    const paginatorInput = wrapper.find("#ppage");
    paginatorInput.element.value = 3;
    paginatorInput.trigger("change");

    await flushPromises();
    const newCurrentPage: any = store.state.paginator.currentPage;
    expect(originalCurrentPage == newCurrentPage).toBe(false);
    expect(wrapper.findComponent(Table).exists()).toBe(true);

    wrapper.destroy();
    done();
  });
});
