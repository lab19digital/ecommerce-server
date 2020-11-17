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

      <div class="flex mb-4">
        <div class="w-1/3">
          <div class="bg-gray-400">
            <img
              class="object-cover h-48 w-full"
              src="https://api.time.com/wp-content/uploads/2018/11/sweetfoam-sustainable-product.jpg?quality=85"
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
            :placeholder="product.title"
          />
        </div>
        <div class="w-1/3">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
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

      <!--  -->
      <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
        Category
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="category"
        type="text"
        :placeholder="product.categories[0].title"
      />

      <!--  -->
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Short Description
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        :placeholder="product.short_description"
      />

      <!--  -->
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Long Description
      </label>
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        :placeholder="product.long_description"
      />

      <!--  -->
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
      <h5 class="text-gray-700 text-sm font-bold mb-2">Variants</h5>
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
