<template>
  <div class="mx-auto px-6 py-6">
    <Table />
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
