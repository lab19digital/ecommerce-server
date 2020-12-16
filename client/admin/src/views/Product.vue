<template>
  <div class="mx-auto px-6 py-6">
    <!-- Error -->
    <div v-if="errors.length" class="fixed bottom-0 right-0">
      <button
        @click="resetErrors"
        class="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 border rounded"
      >
        Close
      </button>
      <ErrorNotification :errors="errors" />
    </div>

    <!-- Success -->
    <div v-if="productUpdated" class="fixed bottom-0 right-0">
      <button
        @click="resetProductUpdated"
        class="bg-teal-500 hover:bg-teal-500 text-white font-bold py-2 px-4 border rounded"
      >
        Close
      </button>
      <SuccessNotification title="Product" :msg="productUpdated" />
    </div>

    <div v-if="product" class="p-6 w-full break-words">
      <h5 class="text-3xl font-bold">Create Product</h5>

      <label class="md:w-2/3 block text-gray-500 font-bold">
        <input
          class="mr-2 leading-tight"
          type="checkbox"
          @click="toggleHasVariant"
          :checked="productHasVariant"
        />
        <span>Has variant</span>
      </label>

      <!-- Product Begin-->
      <div class="product">
        <!-- top row -->
        <div class="flex mt-8">
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
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="product_sku"
            >
              SKU
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="product_sku"
              type="text"
              v-model="product.id"
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
              v-model="product.title"
            />
          </div>
        </div>

        <!-- Categories -->
        <div class="mt-8">
          <h5 class="text-gray-700 text-sm font-bold mb-2">Categories</h5>
          <div class="flex flex-wrap mb-4">
            <div v-for="(category, key) in product.categories" :key="key">
              <div class="flex mr-6 mb-6">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="category.title"
                />

                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  :data-key="key"
                  @click="removeCategory"
                >
                  x
                </button>
              </div>
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="addCategory"
          >
            Add category
          </button>
        </div>

        <!-- Short description -->
        <div class="mt-8">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="short_description"
          >
            Short Description
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="short_description"
            type="text"
            v-model="product.short_description"
          />
        </div>

        <!-- Long description -->
        <div class="mt-8">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="long_description"
          >
            Long Description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="long_description"
            type="text"
            v-model="product.long_description"
          />
        </div>

        <!-- Feature image url -->
        <div class="mt-8">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="feature_image_url"
          >
            Feature image url
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feature_image_url"
            type="text"
            v-model="product.featured_image.url"
          />
        </div>

        <!-- Attributes -->
        <div class="mt-8">
          <h5 class="text-gray-700 text-sm font-bold mb-2">
            Global attributes
          </h5>
          <div v-for="(value, key) in product.meta" :key="key">
            <div class="flex mb-4">
              <div class="w-1/2">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="value.key"
                />
              </div>
              <div class="w-1/2">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="value.value"
                />
              </div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                :data-key="key"
                @click="removeAttributes"
              >
                x
              </button>
            </div>
          </div>

          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="addAttributes"
          >
            Add attribute
          </button>
        </div>

        <!-- group of fields -->
        <div class="flex mt-8">
          <div class="w-1/3">
            <!-- Status -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="status"
            >
              Status
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              type="text"
              v-model="product.status"
            />
          </div>
          <div class="w-1/3">
            <!-- Created at -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="created_at"
            >
              Created at
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="created_at"
              type="text"
              v-model="product.created_at"
            />
          </div>
          <div class="w-1/3">
            <!-- Updated at -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="updated_at"
            >
              Updated at
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="updated_at"
              type="text"
              v-model="product.updated_at"
            />
          </div>
        </div>

        <!-- group of fields  -->
        <div class="flex mt-8">
          <div class="w-1/3">
            <!-- Published -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="published"
            >
              Published
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="published"
              type="text"
              v-model="product.published"
            />
          </div>
          <div class="w-1/3">
            <!-- price cents -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="price_cents"
            >
              Price Cents
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price_cents"
              type="text"
              v-model="product.price_cents"
            />
          </div>
          <div class="w-1/3">
            <!-- Price currency -->
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="price_currency"
            >
              Price currency
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price_currency"
              type="text"
              v-model="product.price_currency"
            />
          </div>
        </div>

        <!-- Prices -->
        <div class="mt-8">
          <h5 class="text-gray-700 text-sm font-bold mb-2">Prices</h5>
          <div v-for="(value, key) in product.prices" :key="key">
            <div class="flex mb-4">
              <div class="w-1/2">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="value.currency"
                />
              </div>
              <div class="w-1/2">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="value.value"
                />
              </div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                :data-key="key"
                @click="removePrices"
              >
                x
              </button>
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="addPrice"
          >
            Add price
          </button>
        </div>

        <!-- Sizes -->
        <div class="mt-8">
          <h5 class="text-gray-700 text-sm font-bold mb-2">Sizes</h5>
          <div class="flex flex-wrap mb-4">
            <div v-for="(size, key) in product.sizes" :key="key">
              <div class="flex mr-6 mb-6">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="size.size"
                />

                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  :data-key="key"
                  @click="removeSize"
                >
                  x
                </button>
              </div>
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="addSize"
          >
            Add size
          </button>
        </div>

        <!-- Dimensions -->
        <div class="flex mt-8">
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
              v-model="product.dimensions.length"
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
              v-model="product.dimensions.height"
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
              v-model="product.dimensions.width"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="product_dimensions_unit"
            >
              Unit
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="product_dimensions_unit"
              type="text"
              v-model="product.dimensions.unit"
            />
          </div>
        </div>

        <!-- Weight -->
        <div class="flex mt-8">
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
              v-model="product.weight.weight"
            />
          </div>
          <div>
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="product_weight_unit"
            >
              Unit
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="product_weight_unit"
              type="text"
              v-model="product.weight.unit"
            />
          </div>
        </div>

        <!-- Images -->
        <div class="mt-8">
          <h5 class="text-gray-700 text-sm font-bold mb-2">Images</h5>
          <div v-for="(image, key) in product.images" :key="key">
            <div class="flex mb-4">
              <div class="w-1/3">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="image.url"
                />
              </div>
              <div class="w-1/3">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="image.name"
                />
              </div>
              <div class="w-1/3">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="image.type"
                />
              </div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                :data-key="key"
                @click="removeImage"
              >
                x
              </button>
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="addImages"
          >
            Add image
          </button>
        </div>

        <!-- Tags -->
        <div class="mt-8">
          <h5 class="text-gray-700 text-sm font-bold mb-2">Tags</h5>
          <div class="flex flex-wrap mb-4">
            <div v-for="(tag, key) in product.tags" :key="key">
              <div class="flex mr-6 mb-6">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="tag.name"
                />

                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  :data-key="key"
                  @click="removeTag"
                >
                  x
                </button>
              </div>
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="addTag"
          >
            Add tag
          </button>
        </div>

        <!-- Fixed Prices -->
        <div class="mt-8">
          <h5 class="text-gray-700 text-sm font-bold mb-2">Fixed Prices</h5>
          <div v-for="(fixedPrice, key) in product.fixedPrices" :key="key">
            <div class="flex mb-4">
              <div class="w-1/2">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="fixedPrice.price"
                />
              </div>
              <div class="w-1/2">
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="fixedPrice.country_code"
                />
              </div>
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                :data-key="key"
                @click="removeFixedPrice"
              >
                x
              </button>
            </div>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="addFixPrices"
          >
            Add fixed price
          </button>
        </div>
      </div>
      <!-- Product End -->

      <!-- Variants -->
      <div class="mt-8" v-show="productHasVariant == true">
        <h5 class="text-3xl font-bold">Variants</h5>
        <div class="bg-white rounded shadow border p-6 w-full break-words">
          <div
            v-for="(variant, variantKey) in product.variants"
            :key="variantKey"
          >
            <!-- Product Variant Begin-->
            <div v-bind:class="{ 'mt-24': checkKey(variantKey) }">
              <!-- top row -->
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
                    :for="variant.id + '_sku'"
                  >
                    SKU
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="variant.id + '_sku'"
                    type="text"
                    v-model="variant.id"
                  />
                </div>
                <div class="w-1/3">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    :for="variant.id + '_title'"
                  >
                    Title
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="variant.id + '_title'"
                    type="text"
                    v-model="variant.title"
                  />
                </div>
              </div>

              <!-- Short description -->
              <div class="mt-8">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  :for="variant.id + '_short_description'"
                >
                  Short Description
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  :id="variant.id + '_short_description'"
                  type="text"
                  v-model="variant.short_description"
                />
              </div>

              <!-- Long description -->
              <div class="mt-8">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  :for="variant.id + '_long_description'"
                >
                  Long Description
                </label>
                <textarea
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  :id="variant.id + '_long_description'"
                  type="text"
                  v-model="variant.long_description"
                />
              </div>

              <!-- Feature image url -->
              <div class="mt-8">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  :for="variant.id + '_feature_image_url'"
                >
                  Feature image url
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  :id="variant.id + '_feature_image_url'"
                  type="text"
                  v-model="variant.featured_image.url"
                />
              </div>

              <!-- Attributes -->
              <div class="mt-8">
                <h5 class="text-gray-700 text-sm font-bold mb-2">
                  Global attributes
                </h5>
                <div v-for="(value, key) in variant.meta" :key="key">
                  <div class="flex mb-4">
                    <div class="w-1/2">
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        v-model="value.key"
                      />
                    </div>
                    <div class="w-1/2">
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        v-model="value.value"
                      />
                    </div>
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      :data-key="key"
                      :data-var-key="variantKey"
                      @click="removeAttributesVariant"
                    >
                      x
                    </button>
                  </div>
                </div>

                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  @click="addAttributesVariant"
                  :data-var-key="variantKey"
                >
                  Add attribute
                </button>
              </div>

              <!-- group of fields -->
              <div class="flex mt-8">
                <div class="w-1/4">
                  <!-- Status -->
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    :for="variant.id + '_status'"
                  >
                    Status
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="variant.id + '_status'"
                    type="text"
                    v-model="product.status"
                  />
                </div>
                <div class="w-1/4">
                  <!-- Published -->
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    :for="variant.id + '_published'"
                  >
                    Published
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="variant.id + '_published'"
                    type="text"
                    v-model="product.published"
                  />
                </div>
                <div class="w-1/4">
                  <!-- price cents -->
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    :for="variant.id + '_price_cents'"
                  >
                    Price Cents
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="variant.id + '_price_cents'"
                    type="text"
                    v-model="product.price_cents"
                  />
                </div>
                <div class="w-1/4">
                  <!-- Price currency -->
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    :for="variant.id + '_price_currency'"
                  >
                    Price currency
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="variant.id + '_price_currency'"
                    type="text"
                    v-model="product.price_currency"
                  />
                </div>
              </div>

              <!-- Stock -->
              <div class="mt-8">
                <h5 class="text-gray-700 text-sm font-bold mb-2">Stock</h5>
                <div class="flex mb-4">
                  <div class="w-1/4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      :for="variant.id + '_stock'"
                    >
                      Quantity
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      :id="variant.id + '_stock'"
                      type="text"
                      v-model="variant.title"
                    />
                  </div>
                  <div class="w-1/4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      :for="variant.id + '_cost_price'"
                    >
                      Cost price
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      :id="variant.id + '_cost_price'"
                      type="text"
                      v-model="variant.title"
                    />
                  </div>
                  <div class="w-1/4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      :for="variant.id + '_price'"
                    >
                      Price
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      :id="variant.id + '_price'"
                      type="text"
                      v-model="variant.title"
                    />
                  </div>
                  <div class="w-1/4">
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      :for="variant.id + '_store'"
                    >
                      Store
                    </label>
                    <input
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      :id="variant.id + '_store'"
                      type="text"
                      v-model="variant.title"
                    />
                  </div>
                </div>
              </div>

              <!-- Prices -->
              <div class="mt-8">
                <h5 class="text-gray-700 text-sm font-bold mb-2">Prices</h5>
                <div v-for="(value, key) in variant.prices" :key="key">
                  <div class="flex mb-4">
                    <div class="w-1/2">
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        v-model="value.currency"
                      />
                    </div>
                    <div class="w-1/2">
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        v-model="value.value"
                      />
                    </div>
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      :data-key="key"
                      :data-var-key="variantKey"
                      @click="removePricesVariant"
                    >
                      x
                    </button>
                  </div>
                </div>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  @click="addPriceVariant"
                  :data-var-key="variantKey"
                >
                  Add price
                </button>
              </div>

              <!-- Sizes -->
              <div class="mt-8">
                <h5 class="text-gray-700 text-sm font-bold mb-2">Sizes</h5>
                <div class="flex flex-wrap mb-4">
                  <div v-for="(size, key) in variant.sizes" :key="key">
                    <div class="flex mr-6 mb-6">
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        v-model="size.size"
                      />

                      <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        :data-key="key"
                        :data-var-key="variantKey"
                        @click="removeSizeVariant"
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  @click="addSizeVariant"
                  :data-var-key="variantKey"
                >
                  Add size
                </button>
              </div>

              <!-- Dimensions -->
              <div class="flex mt-8">
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
                    v-model="variant.dimensions.length"
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
                    v-model="variant.dimensions.height"
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
                    v-model="variant.dimensions.width"
                  />
                </div>
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="product_dimensions_unit"
                  >
                    Unit
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="product_dimensions_unit"
                    type="text"
                    v-model="variant.dimensions.unit"
                  />
                </div>
              </div>

              <!-- Weight -->
              <div class="flex mt-8">
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
                    v-model="variant.weight.weight"
                  />
                </div>
                <div>
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="product_weight_unit"
                  >
                    Unit
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="product_weight_unit"
                    type="text"
                    v-model="variant.weight.unit"
                  />
                </div>
              </div>

              <!-- Remove variant -->
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-12 mr-6"
                @click="removeVariant"
                v-if="productHasVariant"
                :data-var-key="variantKey"
              >
                Remove variant
              </button>
            </div>
            <!-- Product End -->
          </div>
        </div>
      </div>
      <!-- Variants end -->

      <!-- Add variant -->
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-6"
        @click="addVariant"
        v-if="productHasVariant"
      >
        Add variant
      </button>

      <!-- Update the product button -->
      <button
        class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-16"
        @click="updateProduct"
      >
        Update product
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorNotification from "@/components/ErrorNotification.vue";
import SuccessNotification from "@/components/SuccessNotification.vue";
import { apolloClient } from "@/vue-apollo";
import { PRODUCT } from "@/graphql/queries";
// import { UPDATE_PRODUCT_IMAGES, UPDATE_PRODUCT } from "@/graphql/mutations";
import { UPDATE_PRODUCT } from "@/graphql/mutations";
import Table from "@/components/Table.vue";
import { cleanupData } from "@/utils/helper";
import { Product as TProduct } from "@/types/product.ts";

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
  private productUpdated: string = "";
  private productHasVariant: boolean = false;

  // This the product field with initialisation values
  private product: TProduct = {
    id: -1,
    categories: [{ title: "" }],
    dimensions: { length: 0, width: 0, height: 0, unit: "unit" },
    images: [{ id: -1, url: "", name: "", type: "" }],
    long_description: "",
    meta: [{ key: "", value: "" }],
    parent_id: -1,
    price_cents: 0,
    price_currency: "",
    prices: [{ currency: "", value: 0 }],
    published: 1,
    short_description: "",
    sizes: [{ size: 0 }],
    status: "",
    tags: [{ id: -1, name: "" }],
    title: "",
    weight: { weight: 0, unit: "unit" },
    variants: [{}],
    featured_image: {
      url: "url",
      type: "type",
      name: "name",
    },
    fixedPrices: [
      {
        country_code: "",
        price: 0,
      },
    ],
  };

  private tableColums: string[] = [];

  public resetErrors(): void {
    this.errors = [];
  }

  public resetProductUpdated(): void {
    this.productUpdated = "";
  }

  // Just to add margin top to product variant only from 2nd variant
  public checkKey(key: number): boolean {
    return key > 0;
  }

  public addAttributes() {
    this.product.meta.push({ key: "...", value: "..." });
  }

  public removeAttributes(event: any) {
    let key = event.target.getAttribute("data-key");
    this.product.meta.splice(key, 1);
  }

  public addPrice() {
    this.product.prices.push({ currency: "currency...", value: 0.0 });
  }

  public removePrices(event: any) {
    let key = event.target.getAttribute("data-key");
    this.product.prices.splice(key, 1);
  }

  public addSize() {
    this.product.sizes.push({ size: 0 });
  }

  public removeSize(event: any) {
    let key = event.target.getAttribute("data-key");
    this.product.sizes.splice(key, 1);
  }

  public addCategory() {
    this.product.categories.push({ title: "category..." });
  }

  public removeCategory(event: any) {
    let key = event.target.getAttribute("data-key");
    this.product.categories.splice(key, 1);
  }

  public addTag() {
    this.product.tags.push({ id: -1, name: "tag..." });
  }

  public removeTag(event: any) {
    let key = event.target.getAttribute("data-key");
    this.product.tags.splice(key, 1);
  }

  public addFixPrices() {
    this.product.fixedPrices.push({
      country_code: "currency...",
      price: 0,
    });
  }

  public removeFixedPrice(event: any) {
    let key = event.target.getAttribute("data-key");
    this.product.fixedPrices.splice(key, 1);
  }

  public addImages() {
    this.product.images.push({
      id: -1,
      url: "url...",
      name: "name...",
      type: "type...",
    });
  }

  public removeImage(event: any) {
    let key = event.target.getAttribute("data-key");
    this.product.images.splice(key, 1);
  }

  public addPriceVariant(event: any) {
    let variantKey = event.target.getAttribute("data-var-key");

    this.product.variants[variantKey].prices.push({
      currency: "currency...",
      value: 0.0,
    });
  }

  public removePricesVariant(event: any) {
    let variantKey = event.target.getAttribute("data-var-key");
    let priceKey = event.target.getAttribute("data-key");
    this.product.variants[variantKey].prices.splice(priceKey, 1);
  }

  public addAttributesVariant(event: any) {
    let variantKey = event.target.getAttribute("data-var-key");
    this.product.variants[variantKey].meta.push({ key: "...", value: "..." });
  }

  public removeAttributesVariant(event: any) {
    let variantKey = event.target.getAttribute("data-var-key");
    let metaKey = event.target.getAttribute("data-key");
    this.product.variants[variantKey].meta.splice(metaKey, 1);
  }

  public addSizeVariant(event: any) {
    let variantKey = event.target.getAttribute("data-var-key");
    this.product.variants[variantKey].sizes.push({ size: 0 });
  }

  public removeSizeVariant(event: any) {
    let variantKey = event.target.getAttribute("data-var-key");
    let metaKey = event.target.getAttribute("data-key");
    this.product.variants[variantKey].sizes.splice(metaKey, 1);
  }

  public addVariant() {
    this.product.variants.push({
      id: -1,
      dimensions: { length: 0, width: 0, height: 0, unit: "unit" },
      images: [{ id: -1, url: "", name: "", type: "" }],
      long_description: "",
      meta: [{ key: "", value: "" }],
      parent_id: this.product.id,
      price_cents: 0,
      price_currency: "",
      prices: [{ currency: "currency...", value: 0 }],
      published: 1,
      short_description: "",
      sizes: [{ size: 0 }],
      status: "",
      tags: [{ id: -1, name: "" }],
      title: "",
      weight: { weight: 0, unit: "unit" },
      featured_image: {
        id: -1,
        url: "url",
        type: "type",
        name: "name",
      },
    });
  }

  public removeVariant(event: any) {
    let variantKey = event.target.getAttribute("data-var-key");
    this.product.variants.splice(variantKey, 1);
  }

  public toggleHasVariant() {
    this.productHasVariant = !this.productHasVariant;
  }

  /**
   * updateProduct
   */
  public async updateProduct() {
    this.productUpdated = "Updating...";

    // check variants toggle
    if (!this.productHasVariant) {
      this.product.variants = [];
    }

    let data = await apolloClient.mutate({
      mutation: UPDATE_PRODUCT,
      variables: {
        id: this.product.id,
        input: {
          title: this.product.title,
          price_cents: parseInt(this.product.price_cents),
          price_currency: this.product.price_currency,
          short_description: this.product.short_description,
          long_description: this.product.long_description,
          meta: this.product.meta,
          prices: this.product.prices,
          sizes: this.product.sizes,
          categories: this.product.categories,
          dimensions: this.product.dimensions,
          weight: this.product.weight,
          status: this.product.status,
          featured_image: JSON.stringify(this.product.featured_image),
          published: parseInt(this.product.published),
          images: JSON.stringify(this.product.images),
          tags: JSON.stringify(this.product.tags),
          variants: JSON.stringify(this.product.variants),
          fixprices: this.product.fixedPrices.map(
            (item: { country_code: string; price: number }) => {
              return { currency: item.country_code, price_cents: item.price };
            }
          ),
        },
      },
    });

    try {
      let error = data.errors[0].debugMessage;
      this.productUpdated = "";
      console.log(error);
      return;
    } catch (error) {
      // no error
    }

    this.productUpdated = "Product successfully updated.";
    location.reload(); //this is to reload the state for updated images
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

    let cleanData = cleanupData(data.data.product);
    this.product = cleanData;

    //Set the has variant
    if (this.product.variants.length > 0) {
      this.productHasVariant = true;
    }
  }
}
</script>
