<template>
  <div class="mx-auto px-6 py-6">
    <!-- Error -->
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
    <div v-if="loadingProductsResults" class="absolute bottom-0 right-0">
      <SuccessNotification
        title="Loading"
        msg="Updating the products table with results."
      />
    </div>

    <Table :columns="tableColums" :rows="productsDisplay" />

    <div class="inline-flex justify-center content-center items-center">
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
import Table from "@/components/Table.vue";
import { Action, Getter, namespace } from "vuex-class";
import ErrorNotification from "@/components/ErrorNotification.vue";
import SuccessNotification from "@/components/SuccessNotification.vue";

const ProductsAction = namespace("products", Action);
const ProductsGetter = namespace("products", Getter);

@Component({
  components: {
    Table,
    ErrorNotification,
    SuccessNotification,
  },
})
export default class Products extends Vue {
  private errors: any[] = [];

  private showSettings: Boolean = false;

  private products: any[] = [];
  private productsDisplay: any[] = [];

  private productAttributes: any[] = [];
  private tableColums: any[] = [];

  @ProductsAction productsResults: any;
  @ProductsGetter loadingProductsResults: any;

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

  // public even(key: number): Boolean {
  //   return key % 2 == 0;
  // }

  // public checkIfArray(value: number): Boolean {
  //   return Array.isArray(value);
  // }

  // public checkIfObject(value: number): Boolean {
  //   return typeof value === "object" && value !== null;
  // }

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
    let currentPage = this.paginatorInfo.currentPage;
    let totalPages = this.paginatorInfo.total;
    let pagesFirst = this.paginatorInfo.first;
    let ceiledPages = Math.ceil(totalPages / pagesFirst);

    if (currentPage < 1 || currentPage > ceiledPages) {
      this.errors.push("Enter a number up to " + ceiledPages);
      this.paginatorInfo.currentPage = 1;
    } else if (currentPage >= 1 && currentPage <= ceiledPages) {
      this.loadProducts();
    } else {
      this.errors.push("Error ");
      this.paginatorInfo.currentPage = 1;
    }
  }

  public checked(event: any): void {
    let checked = event.target.checked;
    let value = event.target.value;

    /**
     * Based on whether the attribute of the product is selected in the settings panel,
     * add or remove the product attribute from the tableColums array
     */

    if (checked) {
      this.tableColums.push(value);
    } else {
      var index = this.tableColums.indexOf(value);
      if (index > -1) {
        this.tableColums.splice(index, 1);
      }
    }

    this.helper();
  }

  async mounted() {
    this.loadProducts();
  }

  public helper() {
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

  async loadProducts() {
    this.productsResults({
      first: this.paginatorInfo.first,
      page: this.paginatorInfo.currentPage,
    }).then((data: any) => {
      try {
        let error = data.errors[0].debugMessage;
        this.errors.push(error);
        return;
      } catch (error) {
        // no error
      }

      let dataStore = this.cleanupData(data.data.adminProducts.data);
      this.products = dataStore;
      this.productAttributes = Object.keys(dataStore[0]);

      // Assign paginator information
      this.paginatorInit(data.data.adminProducts.paginatorInfo);

      // This is to have a few columns displaying on initial view
      if (this.tableColums.length === 0) {
        this.productAttributes.slice(0, 4).forEach((key: any) => {
          this.tableColums.push(key);
        });
      }

      // Populate column data
      this.helper();

      return Promise.resolve();
    });
  }

  cleanupData(data: any) {
    // This recursively removes the __typename from the array of objects that is returned from the backend
    function removeMeta(obj: any) {
      for (const prop in obj) {
        if (prop === "__typename") delete obj[prop];
        else if (typeof obj[prop] === "object") removeMeta(obj[prop]);
      }
    }

    data.map((element: any) => {
      let obj = element;
      removeMeta(obj);
      return obj;
    });

    return data;
  }

  paginatorInit(data: any) {
    this.paginatorInfo.currentPage = data.currentPage;
    this.paginatorInfo.hasMorePages = data.hasMorePages;
    this.paginatorInfo.total = data.total;
    this.paginatorInfo.totalPages = Math.ceil(
      this.paginatorInfo.total / this.paginatorInfo.first
    );
  }
}
</script>
