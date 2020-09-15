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

  test("should query products correctly", async function (done) {
    const wrapper: any = mount(Table, {
      store,
      localVue,
      apolloProvider,
    });
    await flushPromises();

    expect(wrapper.vm.products.length > 0).toBe(true);
    done();
  });

  test("can handle successful next button is clicked", async function (done) {
    const wrapper: any = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    const originalCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
    expect(originalCurrentPage == 0).toBe(false);
    wrapper.vm.paginatorInfo.currentPage = 1;
    wrapper.vm.paginatorInfo.hasMorePages = true;

    wrapper.find("#pnext").trigger("click");
    await flushPromises();
    const newCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
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

    const originalCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
    expect(originalCurrentPage == 0).toBe(false);
    wrapper.vm.paginatorInfo.currentPage = 2;
    wrapper.vm.paginatorInfo.hasMorePages = true;

    wrapper.find("#pprev").trigger("click");
    await flushPromises();
    const newCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
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

    wrapper.vm.paginatorInfo.hasMorePages = false;

    wrapper.find("#pnext").trigger("click");
    await flushPromises();
    expect(wrapper.vm.errors.length > 0).toBe(true);

    wrapper.vm.resetErrors();

    wrapper.vm.paginatorInfo.currentPage = 0;
    wrapper.find("#pprev").trigger("click");
    await flushPromises();
    expect(wrapper.vm.errors.length > 0).toBe(true);

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

    const originalCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
    expect(originalCurrentPage == 0).toBe(false);
    wrapper.vm.paginatorInfo.currentPage = 1;
    wrapper.vm.paginatorInfo.hasMorePages = true;

    const paginatorInput = wrapper.find("#ppage");
    paginatorInput.element.value = 6;
    paginatorInput.trigger("change");

    await flushPromises();
    const newCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
    expect(originalCurrentPage == newCurrentPage).toBe(false);
    expect(wrapper.findComponent(Table).exists()).toBe(true);

    wrapper.destroy();
    done();
  });

  test("can handle successful settings checkbox select change", async function (done) {
    const wrapper: any = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    const originalDisplayValues = Object.keys(wrapper.vm.productsDisplay[0]);
    const attribute = wrapper.vm.productAttributes[5];

    wrapper.find(`#${attribute}`).trigger("click");

    const checkBox = wrapper.find(`#${attribute}`);
    checkBox.element.selected = false;
    checkBox.trigger("change");
    await Vue.nextTick();

    const mutatedDisplayValues = Object.keys(wrapper.vm.productsDisplay[0]);

    expect(originalDisplayValues.length == mutatedDisplayValues.length).toBe(
      false
    );
    expect(mutatedDisplayValues).toContain(attribute);

    wrapper.destroy();
    done();
  });
});
