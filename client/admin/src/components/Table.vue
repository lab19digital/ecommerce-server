<template>
  <div>
    <div v-if="errors.length" class="absolute bottom-0 right-0">
      <button
        @click="resetErrors"
        class="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 border rounded"
      >
        Close
      </button>
      <ErrorNotification :errors="errors" />
    </div>

    <!-- Loading -->
    <div v-if="loadingTableResults" class="absolute bottom-0 right-0">
      <SuccessNotification
        title="Loading"
        msg="Updating the products table with results."
      />
    </div>

    <div class="overflow-auto my-4 max-h-screen">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(tableColum, key) in tableColums"
              :key="key"
              class="px-4 py-2"
            >
              {{ tableColum }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, key) in productsDisplay"
            :key="key"
            v-bind:class="{ 'bg-gray-200': even(key) }"
          >
            <td
              v-for="(values, key) in product"
              :key="key"
              class="border px-4 py-2"
            >
              <div v-if="!checkIfArray(values) && !checkIfObject(values)">
                {{ values }}
              </div>

              <div class="divide-y divide-gray-800" v-if="checkIfArray(values)">
                <div class="py-2" v-for="(value, key) in values" :key="key">
                  <div v-for="(val, key) in value" :key="key">
                    {{ key }} : {{ val }}
                  </div>
                </div>
              </div>

              <div
                class="divide-y divide-gray-800"
                v-if="!checkIfArray(values) && checkIfObject(values)"
              >
                <div class="py-2" v-for="(val, key) in values" :key="key">
                  {{ key }} : {{ val }}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="inline-flex justify-center content-center items-center">
      <button
        @click="paginatorPrevious"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Prev
      </button>

      <button
        @click="paginatorNext"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Next
      </button>
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
        id="page"
        type="text"
        placeholder="Page"
        v-model="paginatorInfo.currentPage"
        @change="paginatorInputChange"
      />
      <label for="page"> of {{ paginatorInfo.totalPages }}</label>
    </div>

    <button
      @click="showSettings = !showSettings"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-4 mx-6"
    >
      <p v-if="!showSettings">Show settings</p>
      <p v-if="showSettings">Close settings</p>
    </button>

    <transition
      enter-active-class="transition duration-1000 ease-out"
      leave-active-class="transition duration-75 ease-in"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="showSettings" class="bg-gray-500 rounded p-6 flex flex-wrap">
        <div v-for="(option, key) in productAttributes" :key="key" class="p-4">
          <input
            type="checkbox"
            :id="option"
            :name="option"
            :value="option"
            @click="checked"
            :checked="key < 4"
          />
          <label :for="option" class="p-2">{{ option }}</label
          ><br />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorNotification from "@/components/ErrorNotification.vue";
import SuccessNotification from "@/components/SuccessNotification.vue";
import { Action, Getter, namespace } from "vuex-class";

const TableAction = namespace("table", Action);
const TableGetter = namespace("table", Getter);

@Component({
  components: {
    ErrorNotification,
    SuccessNotification,
  },
})
export default class Table extends Vue {
  private errors: any[] = [];
  private showSettings: Boolean = false;

  private products: any[] = [];
  private productsDisplay: any[] = [];

  private productAttributes: any[] = [];
  private tableColums: any[] = [];

  @TableAction tableResults: any;
  @TableGetter loadingTableResults: any;

  private paginatorInfo: any = {
    total: 0,
    hasMorePages: false,
    currentPage: 1,
    first: 15,
    totalPages: 0,
  };

  public resetErrors(): void {
    this.errors = [];
  }

  public even(key: number): Boolean {
    return key % 2 == 0;
  }

  public checkIfArray(value: number): Boolean {
    return Array.isArray(value);
  }

  public checkIfObject(value: number): Boolean {
    return typeof value === "object" && value !== null;
  }

  public paginatorNext(): void {
    if (
      this.paginatorInfo.currentPage >= 1 &&
      this.paginatorInfo.hasMorePages &&
      this.paginatorInfo.currentPage <=
        Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
    ) {
      this.paginatorInfo.currentPage++;
      this.loadProducts();
    } else {
      this.errors.push(
        "Enter a number up to " +
          Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
      );
    }
  }

  public paginatorPrevious(): void {
    if (
      this.paginatorInfo.currentPage >= 1 &&
      this.paginatorInfo.currentPage <=
        Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
    ) {
      this.paginatorInfo.currentPage--;
      this.loadProducts();
    } else {
      this.errors.push(
        "Enter a number up to " +
          Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
      );
    }
  }

  public paginatorInputChange(): void {
    if (
      this.paginatorInfo.currentPage >= 1 &&
      this.paginatorInfo.currentPage <=
        Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
    ) {
      this.loadProducts();
    } else {
      this.errors.push(
        "Enter a number up to " +
          Math.ceil(this.paginatorInfo.total / this.paginatorInfo.first)
      );
    }
  }

  public checked(event: any): void {
    let checked = event.target.checked;
    let value = event.target.value;

    /**
     * Based on whether the attribute of the product is selected in the settings panel, add or remove the product attribute from the
     * tableColums array
     */

    if (checked) {
      this.tableColums.push(value);
    } else {
      var index = this.tableColums.indexOf(value);
      if (index > -1) {
        this.tableColums.splice(index, 1);
      }
    }

    /**
     * I have an original array (this.products) and another array (this.productsDisplay) , the products array will never be
     * changed, only the selected values from the settings panel will be used to filter data from the original products array
     * back into the productsDisplay array and then appear in the ui to the user.
     *
     * The products array will keep all the data from graphql query that returns the product attributes.
     */

    let tableColums = this.tableColums;

    let newArray = this.products.map(function (product: any) {
      let returnObject: any = {};

      tableColums.forEach((element: any) => {
        returnObject[element] = product[element];
      });

      return returnObject;
    });

    this.productsDisplay = newArray;
  }

  async mounted() {
    this.loadProducts();
  }

  public helper(keys: any[]) {
    this.tableColums = [];
    keys.forEach((key: any) => {
      this.tableColums.push(key);
    });

    let tableColums = this.tableColums;

    let newArray = this.products.map(function (product: any) {
      let returnObject: any = {};

      tableColums.forEach((element: any) => {
        returnObject[element] = product[element];
      });

      return returnObject;
    });

    this.productsDisplay = newArray;
  }

  async loadProducts() {
    this.tableResults({
      first: this.paginatorInfo.first,
      page: this.paginatorInfo.currentPage,
    }).then((data: any) => {
      console.log(data);

      try {
        let error = data.errors[0].debugMessage;
        this.errors.push(error);
        return;
      } catch (error) {
        // no error
      }

      // This recursively removes the __typename from the array of objects that is returned from the backend
      function removeMeta(obj: any) {
        for (const prop in obj) {
          if (prop === "__typename") delete obj[prop];
          else if (typeof obj[prop] === "object") removeMeta(obj[prop]);
        }
      }

      data.data.adminProducts.data.map((element: any) => {
        let obj = element;
        removeMeta(obj);

        return obj;
      });

      this.products = data.data.adminProducts.data;
      this.productAttributes = Object.keys(data.data.adminProducts.data[0]);

      // Assign paginato information
      this.paginatorInfo.currentPage =
        data.data.adminProducts.paginatorInfo.currentPage;
      this.paginatorInfo.hasMorePages =
        data.data.adminProducts.paginatorInfo.hasMorePages;
      this.paginatorInfo.total = data.data.adminProducts.paginatorInfo.total;
      this.paginatorInfo.totalPages = Math.ceil(
        this.paginatorInfo.total / this.paginatorInfo.first
      );

      // This is to have a few columns displaying on initial view
      this.helper(this.productAttributes.slice(0, 4));
    });
  }
}
</script>
