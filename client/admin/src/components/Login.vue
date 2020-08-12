<template>
  <div class="w-full max-w-xs">
    <form
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      @submit="checkForm"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
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
      &copy;2020 Gernzy. All rights reserved.
    </p>

    <!-- Success -->
    <div
      v-if="activeSesssion"
      class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
      role="alert"
    >
      <div class="flex">
        <div class="py-1">
          <svg
            class="fill-current h-6 w-6 text-teal-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
            />
          </svg>
        </div>
        <div>
          <p class="font-bold">You successfully logged in</p>
          <p class="text-sm">Welcome to the admin panel {{ name }}</p>
        </div>
      </div>
    </div>

    <!-- Failed -->
    <div v-if="errors.length" role="alert">
      <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        An error occurred
      </div>
      <div
        class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
      >
        <p v-for="(error, key) in errors" :key="key">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";

export default {
  components: {},
  data: () => ({
    email: "",
    password: "",
    errors: [],
  }),
  computed: mapState({
    name: (state) => state.session.name,
    activeSesssion: (state) => state.session.has_active_session,
  }),
  methods: {
    checkForm: async function (event) {
      event.preventDefault();
      const { email, password } = this;
      if (!email || !password) {
        this.errors = ["Please complete your email and password"];
        return;
      }

      this.errors = [];

      try {
        const result = await this.$apollo.mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              logIn(input: { email: $email, password: $password }) {
                user {
                  id
                  name
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
        });

        const { errors } = this.$store.dispatch("logIn", result);
        if (errors) {
          this.errors = errors;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
