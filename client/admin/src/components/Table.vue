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

    <button
      id="pprev"
      @click="testFire"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
    >
      Test
    </button>
    <!-- Paginator -->
    <!-- <div class="inline-flex justify-center content-center items-center">
      <button
        id="pprev"
        @click="paginatorPrevious"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Prev
      </button>

      <button
        id="pnext"
        @click="paginatorNext"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Next
      </button>
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
        id="ppage"
        type="text"
        placeholder="Page"
        v-model="paginatorInfo.currentPage"
        @change="paginatorInputChange"
      />
      <label for="page"> of {{ paginatorInfo.totalPages }}</label>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter, namespace } from "vuex-class";

const PaginatorAction = namespace("paginator", Action);
const PaginatorGetter = namespace("paginator", Getter);

@Component({
  components: {},
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
  @PaginatorGetter getPaginatorState!: Boolean;

  // public paginatorNext(): void {
  //   if (
  //     this.paginatorInfo.currentPage >= 1 &&
  //     this.paginatorInfo.hasMorePages &&
  //     this.paginatorInfo.currentPage <=
  //       Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
  //   ) {
  //     this.paginatorInfo.currentPage++;
  //     this.loadProducts();
  //   } else {
  //     this.errors.push(
  //       "Enter a number up to " +
  //         Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
  //     );
  //   }
  // }

  // public paginatorPrevious(): void {
  //   if (
  //     this.paginatorInfo.currentPage >= 1 &&
  //     this.paginatorInfo.currentPage <=
  //       Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
  //   ) {
  //     this.paginatorInfo.currentPage--;
  //     this.loadProducts();
  //   } else {
  //     this.errors.push(
  //       "Enter a number up to " +
  //         Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
  //     );
  //   }
  // }

  // public paginatorInputChange(): void {
  //   let currentPage = this.paginatorInfo.currentPage;
  //   let totalPages = this.paginatorInfo.total;
  //   let pagesFirst = this.paginatorInfo.first;
  //   let ceiledPages = Math.ceil(totalPages / pagesFirst);

  //   if (currentPage < 1 || currentPage > ceiledPages) {
  //     this.errors.push("Enter a number up to " + ceiledPages);
  //     this.paginatorInfo.currentPage = 1;
  //   } else if (currentPage >= 1 && currentPage <= ceiledPages) {
  //     this.loadProducts();
  //   } else {
  //     this.errors.push("Error ");
  //     this.paginatorInfo.currentPage = 1;
  //   }
  // }
}
</script>
