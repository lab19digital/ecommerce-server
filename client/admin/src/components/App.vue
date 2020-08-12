<template>
  <div>
    <ul class="uk-navbar-nav">
      <li><router-link to="/">Root</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
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
