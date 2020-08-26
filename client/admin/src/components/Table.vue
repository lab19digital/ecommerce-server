<template>
  <div>
    <div v-if="errors.length">
      <ErrorNotification :errors="errors" />
    </div>

    <button
      @click="showSettings = !showSettings"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-4"
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

    <div class="overflow-auto my-4">
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
              v-for="(option, key) in product"
              :key="key"
              class="border px-4 py-2"
            >
              {{ option }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ErrorNotification from "@/components/ErrorNotification.vue";
import gql from "graphql-tag";

@Component({
  components: {
    ErrorNotification,
  },
})
export default class Table extends Vue {
  private errors: any[] = [];
  private showSettings: Boolean = false;

  private products: any[] = [];
  private productsDisplay: any[] = [];

  private productAttributes: any[] = [];
  private tableColums: any[] = [];

  @Prop() readonly exampleProp!: string;

  public even(key: number): Boolean {
    return key % 2 == 0;
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
    try {
      await this.$apollo
        .query({
          query: gql`
            query {
              products(first: 10) {
                data {
                  id
                  title
                  status
                  published
                  price_cents
                  price_currency
                  short_description
                  long_description
                  # created_at
                  # updated_at
                  meta {
                    id
                    group
                    value
                  }
                  prices {
                    currency
                    value
                  }
                  sizes {
                    size
                  }
                  variants {
                    id
                  }
                  categories {
                    id
                    title
                  }
                  dimensions {
                    length
                    width
                    height
                    unit
                  }
                  weight {
                    weight
                    unit
                  }
                  images {
                    id
                    url
                    type
                    name
                  }
                  featured_image {
                    id
                    url
                    type
                    name
                  }
                  tags {
                    id
                    name
                  }
                  fixedPrices {
                    country_code
                    price
                  }
                }
                paginatorInfo {
                  total
                  hasMorePages
                  currentPage
                }
              }
            }
          `,
        })
        .then((data: any) => {
          try {
            let error = data.errors[0].debugMessage;
            this.errors.push(error);
            return;
          } catch (error) {
            // no error
          }

          this.products = data.data.products.data;
          this.productAttributes = Object.keys(data.data.products.data[0]);

          // This is to have a few columns displaying on initial view
          this.helper(this.productAttributes.slice(0, 4));
        });
    } catch (e) {
      console.log(e);
      this.errors.push(e);
    }
  }

  public helper(keys: any[]) {
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
}
</script>
