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

    <div class="bg-white rounded shadow border p-6">
      <h5 class="text-3xl font-bold mb-1 mt-0">Order {{ order.id }}</h5>
      <p class="text-gray-700 text-sm">{{ order.name }}</p>
      <p class="text-gray-700 text-sm">{{ order.email }}</p>
      <p class="text-gray-700 text-sm">{{ order.telephone }}</p>
      <p class="text-gray-700 text-sm">
        Agree to terms: {{ order.agree_to_terms }}
      </p>
      <p class="text-gray-700 text-sm">{{ order.created_at }}</p>
      <p class="text-gray-700 text-sm">{{ order.notes }}</p>
      <p class="text-gray-700 text-sm">{{ order.payment_method }}</p>

      <h5 class="text-2xl font-bold mb-1 mt-6">Billing</h5>
      <p class="text-gray-700 text-sm">{{ order.billing_address_line_1 }}</p>
      <p class="text-gray-700 text-sm">{{ order.billing_address_line_2 }}</p>
      <p class="text-gray-700 text-sm">{{ order.billing_address_postcode }}</p>
      <p class="text-gray-700 text-sm">{{ order.billing_address_state }}</p>
      <p class="text-gray-700 text-sm">{{ order.billing_address_country }}</p>

      <h5 class="text-2xl font-bold mb-1 mt-6">Shipping</h5>
      <p class="text-gray-700 text-sm">{{ order.shipping_address_line_1 }}</p>
      <p class="text-gray-700 text-sm">{{ order.shipping_address_line_2 }}</p>
      <p class="text-gray-700 text-sm">{{ order.shipping_address_postcode }}</p>
      <p class="text-gray-700 text-sm">{{ order.shipping_address_state }}</p>
      <p class="text-gray-700 text-sm">{{ order.shipping_address_country }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorNotification from "@/components/ErrorNotification.vue";
import SuccessNotification from "@/components/SuccessNotification.vue";
import { apolloClient } from "@/vue-apollo";
import { ORDER } from "@/graphql/queries";

@Component({
  components: {
    ErrorNotification,
    SuccessNotification,
  },
})
export default class Order extends Vue {
  // Errors array
  private errors: string[] = [];
  private order: {} = {};

  public resetErrors(): void {
    this.errors = [];
  }

  mounted() {
    apolloClient
      .mutate({
        mutation: ORDER,
        variables: { id: this.$route.params.id },
      })
      .then(
        (data: { data: { order: {} }; errors: [{ debugMessage: string }] }) => {
          // console.log(data.data.order);
          try {
            let error = data.errors[0].debugMessage;
            this.errors.push(error);
            console.log(error);
            return;
          } catch (error) {
            // no error
          }
          this.order = data.data.order;
        }
      );
  }
}
</script>
