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

    <div
      v-if="order"
      class="bg-white rounded shadow border p-6 w-full break-words"
    >
      <h5 class="text-3xl font-bold mb-1 mt-0">Order {{ order.id }}</h5>
      <p class="text-gray-700 text-m">
        <b class="text-teal-500">Name: </b>{{ order.name }}
      </p>
      <p class="text-gray-700 text-m">
        <b class="text-teal-500">Email: </b>{{ order.email }}
      </p>
      <p class="text-gray-700 text-m">
        <b class="text-teal-500">Tel: </b>{{ order.telephone }}
      </p>
      <p class="text-gray-700 text-m">
        <b class="text-teal-500">Agree to terms: </b>
        {{ order.agree_to_terms }}
      </p>
      <p class="text-gray-700 text-m">
        <b class="text-teal-500">Created at: </b> {{ order.created_at }}
      </p>
      <p class="text-gray-700 text-m">
        <b class="text-teal-500">Notes: </b>{{ order.notes }}
      </p>
      <p class="text-gray-700 text-m">
        <b class="text-teal-500">Payment method: </b>{{ order.payment_method }}
      </p>

      <h5 class="text-2xl font-bold mb-1 mt-6">Billing</h5>
      <p class="text-gray-700 text-m">{{ order.billing_address_line_1 }}</p>
      <p class="text-gray-700 text-m">{{ order.billing_address_line_2 }}</p>
      <p class="text-gray-700 text-m">{{ order.billing_address_postcode }}</p>
      <p class="text-gray-700 text-m">{{ order.billing_address_state }}</p>
      <p class="text-gray-700 text-m">{{ order.billing_address_country }}</p>

      <h5 class="text-2xl font-bold mb-1 mt-6">Shipping</h5>
      <p class="text-gray-700 text-m">{{ order.shipping_address_line_1 }}</p>
      <p class="text-gray-700 text-m">{{ order.shipping_address_line_2 }}</p>
      <p class="text-gray-700 text-m">{{ order.shipping_address_postcode }}</p>
      <p class="text-gray-700 text-m">{{ order.shipping_address_state }}</p>
      <p class="text-gray-700 text-m">{{ order.shipping_address_country }}</p>

      <h5 class="text-2xl font-bold mb-1 mt-6">Transactions</h5>

      <div v-if="order.orderTransaction">
        <p class="text-gray-700 text-m">
          <b class="text-teal-500">id: </b> {{ order.orderTransaction.id }}
        </p>
        <p class="text-gray-700 text-m">
          <b class="text-teal-500">Status: </b>
          {{ order.orderTransaction.status }}
        </p>
        <p class="text-gray-700 text-m">
          <b class="text-teal-500">Payment method: </b>
          {{ order.orderTransaction.payment_method }}
        </p>
      </div>

      <div v-for="(data, key) in transdata" :key="key">
        <p class="text-gray-700 text-m">
          {{ data.provider }}
        </p>
        <p class="text-gray-700 text-m">
          {{ data.status }}
        </p>
        <p class="text-gray-700 text-m">
          {{ data.amount.value }} {{ data.amount.currency_code }}
        </p>
        <p class="text-gray-700 text-m">
          {{ data.date }}
        </p>
      </div>

      <!-- <a
        @click="toggleDetailsClick"
        href="#/"
        class="text-gray-700 text-m underline"
        >View more details</a
      >
            
      <div class="overflow-auto">
        <pre
          v-show="toggleDetails"
          id="transactionDetails"
          class="text-gray-700 text-m"
        ></pre>
      </div> -->
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
  private transdata: [] = [];
  private toggleDetails: Boolean = false;

  public resetErrors(): void {
    this.errors = [];
  }

  toggleDetailsClick() {
    this.toggleDetails = !this.toggleDetails;
  }

  mounted() {
    apolloClient
      .mutate({
        mutation: ORDER,
        variables: { id: this.$route.params.id },
      })
      .then(
        (data: {
          data: { order: { orderTransaction: any; payment_method: string } };
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

          try {
            this.transdata = JSON.parse(
              data.data.order.orderTransaction.transaction_data
            );
          } catch (error) {
            // console.log("Order component mounted() error: \n" + error);
          }

          this.order = data.data.order;

          // let paymentProvider = data.data.order.payment_method;
          // if (paymentProvider == "stripe_standard") {
          //   this.stripeProcessJSONforDisplay(transdata);
          // }

          // if (paymentProvider == "paypal_standard") {
          //   this.paypalProcessJSONforDisplay(transdata);
          // }
        }
      );
  }

  // Take the json that was saved in the database, which is a result from the payement provider, for the payment by the user
  // and format then display for the admin as json
  // public stripeProcessJSONforDisplay(transdata: any) {
  //   this.$nextTick(function () {
  //     transdata = JSON.stringify(transdata, null, 2);
  //     transdata = transdata.replace(/"|{|}|,/g, "");
  //     transdata = transdata.replace(/(^[ \t]*\n)/gm, "");
  //     transdata = transdata.replace(/[a-z|_]*:/gi, function (match: any) {
  //       return '<b class="text-teal-500">' + match + "</b>";
  //     });
  //     let el = document.getElementById("transactionDetails");
  //     // @ts-ignore
  //     el.innerHTML = transdata;
  //   });
  // }

  // Take the json that was saved in the database, which is a result from the payement provider, for the payment by the user
  // and format then display for the admin as json
  // public paypalProcessJSONforDisplay(transdata: any) {
  //   this.$nextTick(function () {
  //     transdata = JSON.stringify(transdata, null, 2);
  //     transdata = transdata.replace(/"|{|}|,/g, "");
  //     transdata = transdata.replace(/(^[ \t]*\n)/gm, "");
  //     transdata = transdata.replace(/[a-z|_]*:/gi, function (match: any) {
  //       return '<b class="text-teal-500">' + match + "</b>";
  //     });
  //     let el = document.getElementById("transactionDetails");
  //     // @ts-ignore
  //     el.innerHTML = transdata;
  //   });
  // }
}
</script>
