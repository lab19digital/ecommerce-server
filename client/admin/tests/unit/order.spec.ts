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
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(VueRouter);
const apolloProvider = createApolloTestProvider();
const getInitialState = makeGetInitialState(store);

describe("Router", () => {
  beforeEach(() => {
    store.replaceState(getInitialState());
  });

  const router = new VueRouter({ routes });
  const wrapper: any = mount(App, {
    store,
    router,
    localVue,
    apolloProvider,
  });

  test("should navigate to order/:id and see order", async () => {
    router.push("/orders/1");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Order).exists()).toBe(true);
  });

  test("should navigate to order/:id and see order properties", async (done) => {
    await flushPromises();
    const bar = wrapper.findComponent(Order);
    expect(bar.vm.order.id.length > 0).toBe(true);
    done();
  });
});
