<template>
  <div>
    <Navigation />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {}
</script>
