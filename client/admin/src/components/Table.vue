<template>
  <div>
    <div class="overflow-auto my-4 max-h-screen">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(tableColum, key) in columns"
              :key="key"
              class="px-4 py-2"
            >
              {{ tableColum }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, key) in rows"
            :key="key"
            v-bind:class="{ 'bg-gray-200': even(key) }"
          >
            <td
              v-for="(values, key) in row"
              :key="key"
              class="border px-4 py-2 pt-12"
              style="vertical-align: top"
            >
              <div v-if="values">
                {{ values }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Table extends Vue {
  @Prop() readonly rows!: string;
  @Prop() readonly columns!: string;

  public even(key: number): Boolean {
    return key % 2 == 0;
  }
}
</script>
