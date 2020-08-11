import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "../../src/components/App.vue";
import Login from "@/components/Login.vue";
import routes from "@/routes.js";

const localVue = createLocalVue();
localVue.use(VueRouter);

describe("Router", () => {
  test("should mount the router and see login", async () => {
    const router = new VueRouter({ routes });
    const wrapper = mount(App, { localVue, router });
    router.push("/login");
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(Login).exists()).toBe(true);
  });
});
