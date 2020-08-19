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
          v-model="email"
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
          v-model="password"
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
    <div v-if="activeSesssion && user.is_admin">
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
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import gql from "graphql-tag";
import SuccessNotification from "@/components/SuccessNotification.vue";
import ErrorNotification from "@/components/ErrorNotification.vue";

const SessionGetter = namespace("session", Getter);
const SessionAction = namespace("session", Action);

@Component({
  components: {
    SuccessNotification,
    ErrorNotification,
  },
})
export default class Login extends Vue {
  private email: string = "";
  private password: string = "";
  private errors: any[] = [];

  @SessionGetter("has_active_session") activeSesssion: any;
  @SessionAction logIn: any;
  @SessionAction clearSession: any;
  @SessionGetter user: any;

  public async checkForm(event: any): Promise<any> {
    event.preventDefault();
    const { email, password } = this;
    if (!email || !password) {
      this.errors.push("Please complete your email and password");
      return;
    }
    this.errors = [];
    try {
      await this.$apollo
        .mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              logIn(input: { email: $email, password: $password }) {
                user {
                  id
                  name
                  is_admin
                }
                token
              }
            }
          `,
          // Parameters
          variables: {
            email,
            password,
          },
        })
        .then((data: any) => {
          const { errors } = this.logIn(data);
          if (errors) {
            console.log(JSON.stringify(data));
            this.errors = errors;
          }
        });
    } catch (e) {
      console.log(e);
      this.errors.push(e);
    }
  }

  get dateYear(): string {
    const today: any = new Date();
    const date: any = today.getFullYear();
    return date;
  }
}
</script>
