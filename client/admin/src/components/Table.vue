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
              <div v-if="!checkIfArray(values) && !checkIfObject(values)">
                {{ values }}
              </div>

              <div class="divide-y divide-gray-800" v-if="checkIfArray(values)">
                <div class="py-2" v-for="(value, key) in values" :key="key">
                  <div
                    v-for="(val, key) in value"
                    :key="key"
                    style="white-space: pre"
                  >
                    {{ key }} : {{ val }}
                  </div>
                </div>
              </div>

              <div
                class="divide-y divide-gray-800"
                v-if="!checkIfArray(values) && checkIfObject(values)"
              >
                <div
                  class="py-2"
                  v-for="(val, key) in values"
                  :key="key"
                  style="white-space: pre"
                >
                  {{ key }} : {{ val }}
                </div>
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

  public checkIfArray(value: number): Boolean {
    return Array.isArray(value);
  }

  public checkIfObject(value: number): Boolean {
    return typeof value === "object" && value !== null;
  }

  public even(key: number): Boolean {
    return key % 2 == 0;
  }
}
</script>
