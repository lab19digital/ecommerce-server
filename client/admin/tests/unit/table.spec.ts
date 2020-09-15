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

  test("should render content correctly", () => {
    const wrapper = mount(Table, {
      store,
      localVue,
      apolloProvider,
    });
    // expect(wrapper.find('label[for="email"]').text()).toEqual("Username");
    expect(wrapper.findComponent(Table).exists()).toBe(true);
  });

  test("can handle successful next button is clicked", async function (done) {
    const wrapper = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    // @ts-ignore
    const originalCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
    expect(originalCurrentPage == 0).toBe(false);
    // @ts-ignore
    wrapper.vm.paginatorInfo.currentPage = 1;
    // @ts-ignore
    wrapper.vm.paginatorInfo.hasMorePages = true;

    wrapper.find("#pnext").trigger("click");
    await flushPromises();
    // @ts-ignore
    const newCurrentPage: any = wrapper.vm.paginatorInfo.currentPage;
    expect(originalCurrentPage == newCurrentPage).toBe(false);
    expect(wrapper.findComponent(Table).exists()).toBe(true);

    wrapper.destroy();
    done();
  });
});
