<template>
  <div class="container mx-auto max-w-lg p-6">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit="checkForm"
    >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          v-model="authDetails.email"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          v-model="authDetails.password"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;{{ dateYear }} Gernzy. All rights reserved.
    </p>

    <!-- Success login admin user-->
    <div v-if="false">
      <SuccessNotification
        title="You successfully logged in"
        v-bind:msg="'Welcome to the admin panel ' + user.name"
      />
    </div>

    <!-- Failed -->
    <div v-if="errors.length">
      <ErrorNotification :errors="errors" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
import SuccessNotification from "@/components/SuccessNotification.vue";
import ErrorNotification from "@/components/ErrorNotification.vue";

const SessionAction = namespace("session", Action);

@Component({
  components: {
    SuccessNotification,
    ErrorNotification,
  },
})
export default class Login extends Vue {
  private errors: string[] = [];
  private authDetails: { email: string; password: string } = {
    email: "",
    password: "",
  };

  @SessionAction logIn: any;

  public async checkForm(event: any): Promise<any> {
    event.preventDefault();
    if (!this.authDetails.email || !this.authDetails.password) {
      this.errors.push("Please complete your email and password");
      return null;
    }
    this.errors = [];

    this.logIn(this.authDetails)
      .then(() => {
        try {
          this.$router.push("/dashboard");
        } catch (error) {
          console.log(error);
        }
      })
      .catch((e: string) => {
        // Error message contains unwanted words from bubbling up with promise chain
        let er = e.toString().replace(/(error|:|GraphQL)/gi, "");
        this.errors.push(er);
        console.log(e);
      });
  }

  get dateYear(): number {
    const today: Date = new Date();
    const date: number = today.getFullYear();
    return date;
  }

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(to: { query: { redirectFrom: string } }) {
    try {
      if (to.query.redirectFrom) {
        this.errors.push("Sorry, you have to login first!");
      }
    } catch (error) {
      console.log("Login.vue onUrlChange(to)   " + error);
    }
  }
}
</script>
