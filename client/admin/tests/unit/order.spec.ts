import { mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/components/App.vue";
import Order from "@/views/Order.vue";
import routes from "@/router/routes.ts";
import store from "@/store/store";
import {
  createLocalVue,
  createApolloTestProvider,
  makeGetInitialState,
} from "./helper";

const localVue = createLocalVue();
localVue.use(VueRouter);
const apolloProvider = createApolloTestProvider();
const getInitialState = makeGetInitialState(store);

describe("Router", () => {
  beforeEach(() => {
    store.replaceState(getInitialState());
  });

  test("should mount the router and see login", async () => {
    const router = new VueRouter({ routes });

    const wrapper = mount(App, {
      store,
      router,
      localVue,
      apolloProvider,
    });

    router.push("/orders/1");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Order).exists()).toBe(true);
  });
});
