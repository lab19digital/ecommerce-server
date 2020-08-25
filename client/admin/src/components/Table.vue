<template>
  <div>
    <div v-if="errors.length">
      <ErrorNotification :errors="errors" />
    </div>

    <transition
      enter-active-class="transition duration-1000 ease-out"
      leave-active-class="transition duration-75 ease-in"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="showSettings" class="bg-gray-500 rounded p-6 flex flex-wrap">
        <div v-for="(option, key) in productOptions" :key="key" class="p-4">
          <input
            type="checkbox"
            :id="option"
            :name="option"
            :value="option"
            @click="checked"
          />
          <label :for="option" class="p-2">{{ option }}</label
          ><br />
        </div>
      </div>
    </transition>

    <div class="overflow-auto">
      <table class="table-auto">
        <thead>
          <tr>
            <th
              v-for="(productOption, key) in productOptions"
              :key="key"
              class="px-4 py-2"
            >
              {{ productOption }}
            </th>

            <th class="px-4 py-2">
              <button
                @click="showSettings = !showSettings"
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Settings
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, key) in products"
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
  private products: any[] = [];
  private showSettings: Boolean = false;
  private productOptions: any[] = [];

  @Prop() readonly exampleProp!: string;

  public even(key: number): Boolean {
    return key % 2 == 0;
  }

  public checked(event: any): Boolean {
    console.log(event.target.value);
    return true;
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

          console.log(data.data.products.data);

          this.products = data.data.products.data;
          this.productOptions = Object.keys(data.data.products.data[0]);
        });
    } catch (e) {
      console.log(e);
      this.errors.push(e);
    }
  }
}
</script>
