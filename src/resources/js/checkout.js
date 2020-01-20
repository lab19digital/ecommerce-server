class Checkout {
    constructor() {}
    checkout() {
        $('#checkout-form').submit(function(event) {
            // get all the inputs into an array.
            var inputs = $('#checkout-form :input');

            // not sure if you wanted this, but I thought I'd add it.
            // get an associative array of just the values.
            var values = {};
            inputs.each(function() {
                values[this.name] = $(this).val();
                console.log(`this.name=${this.name} and $(this).val()=${$(this).val()}`);
            });

            // this.sendOfCheckoutInfo(values);

            event.preventDefault();
        });
    }

    sendOfCheckoutInfo(values) {
        $.ajax({
            url: 'http://laravel-gernzy.test/graphql',
            contentType: 'application/json',
            type: 'POST',
            context: this,
            data: JSON.stringify({
                query: `mutation {
                    checkout(input: {
                        name: "Luke",
                        email: "cart@example.com",
                        telephone: "",
                        mobile: "",
                        billing_address: {
                            line_1: "1 London Way",
                            line_2: "",
                            state: "London",
                            postcode: "SW1A 1AA",
                            country: "UK"
                        },
                        shipping_address: {
                            line_1: "1 London Way",
                            line_2: "",
                            state: "London",
                            postcode: "SW1A 1AA",
                            country: "UK"
                        },
                        use_shipping_for_billing: true,
                        payment_method: "",
                        agree_to_terms: true,
                        notes: ""
                    }){
                        order {
                            id
                        }
                    }
                }`,
            }),
            success: function(result) {
                console.log(result);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest + textStatus + errorThrown);
            },
        });
    }
}
export { Checkout };
