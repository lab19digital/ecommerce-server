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

    <div v-if="product" class="p-6 w-full break-words">
      <h5 class="text-3xl font-bold mb-1 mt-0">Create Product</h5>

      <label class="md:w-2/3 block text-gray-500 font-bold">
        <input class="mr-2 leading-tight" type="checkbox" />
        <span>Has variant</span>
      </label>

      <!-- Product Begin-->
      <div class="product">
        <div class="flex mb-4">
          <div class="w-1/3">
            <div class="bg-gray-400">
              <img
                class="object-cover h-48 w-full"
                :src="product.featured_image.url"
                :alt="product.featured_image.url"
                :title="product.featured_image.name"
              />
            </div>
          </div>
          <div class="w-1/3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="sku">
              SKU
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sku"
              type="text"
              :placeholder="product.id"
            />
          </div>
          <div class="w-1/3">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="title"
            >
              Title
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              :placeholder="product.title"
            />
          </div>
        </div>

        <!-- Categories -->
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="category"
        >
          Category
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          type="text"
          :placeholder="product.categories[0].title"
        />

        <!-- Short description -->
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Short Description
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          :placeholder="product.short_description"
        />

        <!-- Long description -->
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Long Description
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          :placeholder="product.long_description"
        />

        <!-- Attributes -->
        <h5 class="text-gray-700 text-sm font-bold mb-2">Global attributes</h5>
        <div v-for="(value, key) in product.meta" :key="key">
          <div class="flex mb-4">
            <div class="w-1/2">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="value.key"
              />
            </div>
            <div class="w-1/2">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="value.value"
              />
            </div>
          </div>
        </div>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="addAttributes"
        >
          Add attribute
        </button>

        <!--  -->
        <div class="flex mb-4">
          <div class="w-1/3">
            <!-- Status -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Status
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="product.status"
            />
          </div>
          <div class="w-1/3">
            <!-- Created at -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Created at
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="product.created_at"
            />
          </div>
          <div class="w-1/3">
            <!-- Updated at -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Updated at
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="product.updated_at"
            />
          </div>
        </div>

        <!--  -->
        <div class="flex mb-4">
          <div class="w-1/3">
            <!-- Published -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Published
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="product.published"
            />
          </div>
          <div class="w-1/3">
            <!-- price cents -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Price Cents
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="product.price_cents"
            />
          </div>
          <div class="w-1/3">
            <!-- Price currency -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Price currency
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="product.price_currency"
            />
          </div>
        </div>

        <!-- Prices -->
        <h5 class="text-gray-700 text-sm font-bold mb-2">Prices</h5>
        <div v-for="(value, key) in product.prices" :key="key">
          <div class="flex mb-4">
            <div class="w-1/2">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="value.currency"
              />
            </div>
            <div class="w-1/2">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="value.value"
              />
            </div>
          </div>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="addPrice"
        >
          Add price
        </button>

        <!-- Sizes -->
        <h5 class="text-gray-700 text-sm font-bold mb-2">Sizes</h5>
        <div class="flex mb-4">
          <div v-for="(size, key) in product.sizes" :key="key">
            <div>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="size.size"
              />
            </div>
          </div>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="addSize"
        >
          Add size
        </button>
        <!-- Dimensions -->
        <div class="flex mb-4">
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="length"
            >
              Length
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="length"
              type="text"
              :placeholder="product.dimensions.length"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="height"
            >
              Height
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="height"
              type="text"
              :placeholder="product.dimensions.height"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="width"
            >
              Width
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="width"
              type="text"
              :placeholder="product.dimensions.width"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="unit"
            >
              Unit
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unit"
              type="text"
              :placeholder="product.dimensions.unit"
            />
          </div>
        </div>

        <!-- Weight -->
        <div class="flex mb-4">
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="weight"
            >
              Weight
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="weight"
              type="text"
              :placeholder="product.weight.weight"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="unit"
            >
              Unit
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="unit"
              type="text"
              :placeholder="product.weight.unit"
            />
          </div>
        </div>

        <!-- Images -->
        <h5 class="text-gray-700 text-sm font-bold mb-2">Images</h5>
        <div v-for="(image, key) in product.images" :key="key">
          <div class="flex mb-4">
            <div class="w-1/3">
              <input
                id="url"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="image.url"
              />
            </div>
            <div class="w-1/3">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="image.name"
              />
            </div>
            <div class="w-1/3">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="image.type"
              />
            </div>
          </div>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="addImages"
        >
          Add image
        </button>

        <!-- Tags -->
        <h5 class="text-gray-700 text-sm font-bold mb-2">Tags</h5>
        <div class="flex mb-4">
          <div v-for="(tag, key) in product.tags" :key="key">
            <div>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="tag.name"
              />
            </div>
          </div>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="addTag"
        >
          Add tag
        </button>

        <!-- Fixed Prices -->
        <h5 class="text-gray-700 text-sm font-bold mb-2">Fixed Prices</h5>
        <div v-for="(fixedPrice, key) in product.fixedPrices" :key="key">
          <div class="flex mb-4">
            <div class="w-1/2">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="fixedPrice.price"
              />
            </div>
            <div class="w-1/2">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                :placeholder="fixedPrice.country_code"
              />
            </div>
          </div>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="addFixPrices"
        >
          Add fixed price
        </button>
      </div>
      <!-- Product End -->

      <!-- Variants -->
      <h5 class="text-gray-700 text-sm font-bold mb-2">Variants</h5>
      <div class="bg-white rounded shadow border p-6 w-full break-words">
        <div v-for="(variant, key) in product.variants" :key="key">
          <!-- Product Variant Begin-->
          <div class="product_variant">
            <div class="flex mb-4">
              <div class="w-1/3">
                <div class="bg-gray-400">
                  <img
                    class="object-cover h-48 w-full"
                    :src="variant.featured_image.url"
                  />
                </div>
              </div>
              <div class="w-1/3">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="sku"
                >
                  SKU
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sku"
                  type="text"
                  :placeholder="variant.title"
                />
              </div>
              <div class="w-1/3">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="title"
                >
                  Title
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  :placeholder="variant.title"
                />
              </div>
            </div>

            <!-- Categories -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="category"
            >
              Category
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              :placeholder="variant.categories[0].title"
            />

            <!-- Short description -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Short Description
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="variant.short_description"
            />

            <!-- Long description -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Long Description
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              :placeholder="variant.long_description"
            />

            <!-- Attributes -->
            <h5 class="text-gray-700 text-sm font-bold mb-2">
              Global attributes
            </h5>
            <div v-for="(value, key) in variant.meta" :key="key">
              <div class="flex mb-4">
                <div class="w-1/2">
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    :placeholder="value.key"
                  />
                </div>
                <div class="w-1/2">
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    :placeholder="value.value"
                  />
                </div>
              </div>
            </div>

            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="addAttributes"
            >
              Add attribute
            </button>

            <!--  -->
            <div class="flex mb-4">
              <div class="w-1/4">
                <!-- Status -->
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Status
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  :placeholder="product.status"
                />
              </div>
              <div class="w-1/4">
                <!-- Published -->
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Published
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  :placeholder="product.published"
                />
              </div>
              <div class="w-1/4">
                <!-- price cents -->
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Price Cents
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  :placeholder="product.price_cents"
                />
              </div>
              <div class="w-1/4">
                <!-- Price currency -->
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Price currency
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  :placeholder="product.price_currency"
                />
              </div>
            </div>

            <!-- Stock -->
            <h5 class="text-gray-700 text-sm font-bold mb-2">Stock</h5>
            <div class="flex mb-4">
              <div class="w-1/4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="sku"
                >
                  Quantity
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sku"
                  type="text"
                  :placeholder="variant.title"
                />
              </div>
              <div class="w-1/4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="sku"
                >
                  Cost price
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sku"
                  type="text"
                  :placeholder="variant.title"
                />
              </div>
              <div class="w-1/4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="sku"
                >
                  Price
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sku"
                  type="text"
                  :placeholder="variant.title"
                />
              </div>
              <div class="w-1/4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="sku"
                >
                  Store
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="sku"
                  type="text"
                  :placeholder="variant.title"
                />
              </div>
            </div>
          </div>
          <!-- Product End -->
        </div>
      </div>
      <!-- Variants end -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorNotification from "@/components/ErrorNotification.vue";
import SuccessNotification from "@/components/SuccessNotification.vue";
import { apolloClient } from "@/vue-apollo";
import { PRODUCT } from "@/graphql/queries";
import Table from "@/components/Table.vue";
import { cleanupData } from "@/utils/helper";

@Component({
  components: {
    ErrorNotification,
    SuccessNotification,
    Table,
  },
})
export default class Product extends Vue {
  // Errors array
  private errors: string[] = [];
  private product: {} = {};

  private tableColums: string[] = [];

  public resetErrors(): void {
    this.errors = [];
  }

  public addAttributes() {
    //@ts-ignore
    this.product.meta.push({ key: "...", value: "..." });
  }

  public addPrice() {
    //@ts-ignore
    this.product.prices.push({ currency: "currency...", value: "value..." });
  }

  public addSize() {
    //@ts-ignore
    this.product.sizes.push({ size: "size..." });
  }

  public addTag() {
    //@ts-ignore
    this.product.tags.push({ name: "tag..." });
  }

  public addFixPrices() {
    //@ts-ignore
    this.product.fixedPrices.push({
      country_code: "currency...",
      price: "price...",
    });
  }

  public addImages() {
    //@ts-ignore
    this.product.images.push({
      url: "url...",
      name: "name...",
      type: "type...",
    });
  }

  async mounted() {
    let data = await apolloClient.query({
      query: PRODUCT,
      variables: { id: this.$route.params.id },
    });
    console.log(data);

    try {
      let error = data.errors[0].debugMessage;
      this.errors.push(error);
      console.log(error);
      return;
    } catch (error) {
      // no error
    }

    this.product = cleanupData(data.data.product);
  }
}
</script>
