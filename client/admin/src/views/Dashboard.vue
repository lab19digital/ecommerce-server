<template>
  <div class="container mx-auto px-6 py-6">
    <h1 class="text-5xl">Dashboard</h1>
    <Table class="pt-10" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Table from "@/components/Table.vue";

@Component({
  components: {
    Table,
  },
})
export default class Dashboard extends Vue {}
</script>
