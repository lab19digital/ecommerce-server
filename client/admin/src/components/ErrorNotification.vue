<template>
  <div>
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

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ErrorNotification extends Vue {
  @Prop() readonly errors!: any[];
}
</script>
