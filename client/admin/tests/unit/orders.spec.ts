import Vue from "vue";
import { mount, shallowMount } from "@vue/test-utils";
import Orders from "@/views/Orders.vue";

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

describe("Orders", () => {
  beforeEach(() => {
    store.replaceState(getInitialState());
  });

  test("should render content correctly", async function (done) {
    const wrapper = mount(Orders, {
      store,
      localVue,
      apolloProvider,
    });
    await flushPromises();
    expect(wrapper.findComponent(Orders).exists()).toBe(true);
    done();
  });

  test("should query orders correctly", async function (done) {
    const wrapper: any = mount(Orders, {
      store,
      localVue,
      apolloProvider,
    });
    await flushPromises();
    expect(wrapper.vm.orders.length > 0).toBe(true);
    done();
  });

  test("can handle successful settings checkbox select change", async function (done) {
    const wrapper: any = shallowMount(Orders, {
      store,
      localVue,
      apolloProvider,
    });
    await flushPromises();
    const originalDisplayValues = Object.keys(wrapper.vm.ordersDisplay[0]);
    const attribute = wrapper.vm.ordersAttributes[4];
    wrapper.find(`#${attribute}`).trigger("click");
    const checkBox = wrapper.find(`#${attribute}`);
    checkBox.element.selected = false;
    checkBox.trigger("change");
    await Vue.nextTick();
    const mutatedDisplayValues = Object.keys(wrapper.vm.ordersDisplay[0]);
    expect(originalDisplayValues.length == mutatedDisplayValues.length).toBe(
      false
    );
    expect(mutatedDisplayValues).toContain(attribute);
    wrapper.destroy();
    done();
  });
});
