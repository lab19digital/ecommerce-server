<template>
  <div>
    <!-- Error -->
    <div v-if="getPaginatorErrors.length" class="absolute bottom-0 right-0">
      <button
        @click="resetErrors"
        class="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 border rounded"
      >
        Close
      </button>
      <ErrorNotification :errors="getPaginatorErrors" />
    </div>
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
                <div v-html="values"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginator -->
    <div class="inline-flex justify-center content-center items-center">
      <button
        id="pprev"
        @click="paginatorPreviousClick"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Prev
      </button>

      <button
        id="pnext"
        @click="paginatorNextClick"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Next
      </button>
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
        id="ppage"
        type="text"
        placeholder="Page"
        :value="paginatorInfo.currentPage"
        @change="paginatorInputChangeHandle"
      />

      <label for="ppage"> of {{ paginatorInfo.totalPages }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";
import ErrorNotification from "@/components/ErrorNotification.vue";

const PaginatorAction = namespace("paginator", Action);
const PaginatorGetter = namespace("paginator", Getter);

@Component({
  components: { ErrorNotification },
})
export default class Table extends Vue {
  @Prop() readonly rows!: string;
  @Prop() readonly columns!: string;

  public even(key: number): Boolean {
    return key % 2 == 0;
  }

  @PaginatorAction updatePaginatorInfo!: any;
  @PaginatorAction paginatorNext!: any;
  @PaginatorAction paginatorPrevious!: any;
  @PaginatorAction paginatorInputChange!: any;
  @PaginatorAction resetPaginatorInfoError!: Function;
  @PaginatorGetter paginatorInfo!: {};
  @PaginatorGetter getPaginatorErrors!: [];
  @PaginatorAction reloadResults!: Function;

  public paginatorNextClick(): void {
    this.paginatorNext();
    this.reloadResults(true);
  }

  public paginatorPreviousClick(): void {
    this.paginatorPrevious();
    this.reloadResults(true);
  }

  public paginatorInputChangeHandle(event: any): void {
    this.paginatorInputChange(event.target.value);
    this.reloadResults(true);
  }

  public resetErrors(): void {
    this.resetPaginatorInfoError();
  }
}
</script>
