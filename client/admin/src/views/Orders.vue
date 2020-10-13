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
    <div v-if="loadingOrdersResults" class="absolute bottom-0 right-0">
      <SuccessNotification
        title="Loading"
        msg="Updating the orders table with results."
      />
    </div>

    <Table :columns="tableColums" :rows="ordersDisplay" />

    <!-- Settings -->
    <button
      @click="showSettings = !showSettings"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-4"
    >
      <p v-if="!showSettings">Select settings</p>
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
      <div
        v-show="showSettings"
        class="bg-gray-200 rounded p-6 divide-y divide-gray-400"
      >
        <div class="flex flex-wrap">
          <h3 class="p-4 text-lg underline w-full">Columns to display</h3>
          <div v-for="(option, key) in ordersAttributes" :key="key" class="p-4">
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

        <div>
          <h3 class="p-4 text-lg underline">Results per page</h3>
          <input
            class="mx-4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-16"
            id="numResults"
            type="text"
            @change="paginatorResultsPerPageInputChangeHandle"
            v-model="paginatorInfo.first"
          />

          <label for="numResults">results per page.</label>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Table from "@/components/Table.vue";
import { Action, Getter, namespace } from "vuex-class";
import ErrorNotification from "@/components/ErrorNotification.vue";
import SuccessNotification from "@/components/SuccessNotification.vue";
import { transform } from "@/utils/orders";
import { Paginator } from "@/types/paginator";
const OrdersAction = namespace("orders", Action);
const OrdersGetter = namespace("orders", Getter);
const PaginatorGetter = namespace("paginator", Getter);
const PaginatorAction = namespace("paginator", Action);

@Component({
  components: {
    Table,
    ErrorNotification,
    SuccessNotification,
  },
})
export default class Orders extends Vue {
  // Errors array
  private errors: string[] = [];

  private showSettings: Boolean = false;

  private orders: object[] = [];
  private ordersDisplay: object[] = [];

  private ordersAttributes: string[] = [];
  private tableColums: string[] = [];

  @OrdersAction ordersResults!: any;
  @OrdersGetter loadingOrdersResults!: Boolean;
  @PaginatorGetter paginatorInfo!: Paginator;
  @PaginatorAction updatePaginatorInfo!: any;

  private paginatorState: Paginator = this.$store.state["paginator"];

  public resetErrors(): void {
    this.errors = [];
  }

  // Watch when table component changes the pagination state, then update orders
  @Watch("paginatorState", { deep: true })
  onPaginatorStateChanged(state: { reload: Boolean }) {
    if (state.reload == true) {
      this.loadOrders();
    }
  }

  public paginatorResultsPerPageInputChangeHandle() {
    this.loadOrders();
  }

  public checked(event: any): void {
    let checked = event.target.checked;
    let value = event.target.value;

    /**
     * Based on whether the attribute of the order is selected in the settings panel,
     * add or remove the order attribute from the tableColums array
     */

    if (checked) {
      this.tableColums.push(value);
    } else {
      var index = this.tableColums.indexOf(value);
      if (index > -1) {
        this.tableColums.splice(index, 1);
      }
    }

    this.filterOrders();
  }

  async mounted() {
    this.loadOrders();
  }

  public filterOrders() {
    /**
     * I have an original array (this.orders) and another array (this.ordersDisplay) , the orders array will never be
     * changed, only the selected values from the settings panel will be used to filter data from the original orders array
     * back into the ordersDisplay array and then appear in the ui to the user.
     *
     * The orders array will keep all the data from graphql query that returns the order attributes. The ordersDisplay will change
     * each time the user selects more columns or removes columns from the setttings tab. Each column value is a property in the poduct
     * object. So for each order object in the orders array we filter out only the desired keys from the objects and clone them
     * into the ordersDisplay array.
     */
    let tableColums = this.tableColums;

    this.ordersDisplay = this.orders
      .map(function (order: any) {
        return Object.keys(order)
          .filter((k) => tableColums.includes(k))
          .map((k) => Object.assign({}, { [k]: transform(order[k]) }))
          .reduce((res, o) => Object.assign(res, o), {});
      })
      .sort(
        (
          prev: {
            [x: string]: any;
          },
          curr: {
            [x: string]: any;
          }
        ) => Date.parse(prev.created_at) - Date.parse(curr.created_at)
      );
  }

  async loadOrders() {
    this.ordersResults({
      first: this.paginatorInfo.first,
      page: this.paginatorInfo.currentPage,
    })
      .then(
        (data: {
          data: { adminOrders: { data: object[]; paginatorInfo: Paginator } };
          errors: [{ debugMessage: string }];
        }) => {
          // console.log(data);

          try {
            let error = data.errors[0].debugMessage;
            this.errors.push(error);
            console.log(error);
            return;
          } catch (error) {
            // no error
          }

          let dataStore = this.cleanupData(data.data.adminOrders.data);
          this.orders = dataStore;
          this.ordersAttributes = Object.keys(dataStore[0]);

          // Assign paginator information, and set reload to false to prevent infinite loop
          // as this component also watches for state changes in the paginator vuex state
          // because the table component changes the paginator state and this component fetches the result of that change
          let paginatorUpdate: {} = data.data.adminOrders.paginatorInfo;
          this.updatePaginatorInfo({
            ...{ reload: false },
            ...paginatorUpdate,
          });

          // This is to have a few columns displaying on initial view, by pushing the column keys into
          // tableColumns
          if (this.tableColums.length === 0) {
            this.ordersAttributes.slice(0, 4).forEach((key: string) => {
              this.tableColums.push(key);
            });
          }

          // Populate column data
          this.filterOrders();

          return Promise.resolve();
        }
      )
      .catch((error: string) => {
        console.log(error);
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

    data.map((element: {}) => {
      let obj = element;
      removeMeta(obj);
      return obj;
    });

    return data;
  }
}
</script>
