import { mount } from "@vue/test-utils";
import VueRouter from "vue-router";
import App from "@/components/App.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import routes from "@/router/routes.ts";
import store from "@/store/store";
import flushPromises from "flush-promises";
import {
  createLocalVue,
  createApolloTestProvider,
  makeGetInitialState,
} from "./helper";
// @ts-ignore
import { beforeEachGernzy } from "@/router/helper";
import { auth } from "@/router/auth";

jest.mock("@/router/auth.ts");

const localVue = createLocalVue();
localVue.use(VueRouter);
const apolloProvider = createApolloTestProvider();
const getInitialState = makeGetInitialState(store);

describe("Router", () => {
  beforeEach(() => {
    store.replaceState(getInitialState());
  });

  test("should not navigate to dashboard unless logged in", async () => {
    const to = {
      matched: [{ meta: { requiresAuth: true } }],
    };

    const next = jest.fn();

    beforeEachGernzy(to, undefined, next);

    expect(auth).toHaveBeenCalled();
  });
});
