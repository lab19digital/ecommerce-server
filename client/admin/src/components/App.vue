<template>
  <div>
    <ul class="flex">
      <li class="mr-6">
        <router-link class="text-blue-500 hover:text-blue-800" to="/"
          >Root</router-link
        >
      </li>
      <li class="mr-6">
        <router-link class="text-blue-500 hover:text-blue-800" to="/login"
          >Login</router-link
        >
      </li>
    </ul>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

export default class App extends Vue {}
</script>
