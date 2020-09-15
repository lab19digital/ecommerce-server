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

  test("can handle successful paginator input change", async function (done) {
    const wrapper = shallowMount(Table, {
      store,
      localVue,
      apolloProvider,
    });

    await flushPromises();

    // @ts-ignore
    const originalDisplayValues = Object.keys(wrapper.vm.productsDisplay[0]);
    // @ts-ignore
    const attribute = wrapper.vm.productAttributes[5];

    wrapper.find(`#${attribute}`).trigger("click");

    const checkBox = wrapper.find(`#${attribute}`);
    // @ts-ignore
    checkBox.element.selected = false;
    checkBox.trigger("change");
    await Vue.nextTick();

    // @ts-ignore
    const mutatedDisplayValues = Object.keys(wrapper.vm.productsDisplay[0]);

    expect(originalDisplayValues.length == mutatedDisplayValues.length).toBe(
      false
    );
    expect(mutatedDisplayValues).toContain(attribute);

    wrapper.destroy();
    done();
  });
});
