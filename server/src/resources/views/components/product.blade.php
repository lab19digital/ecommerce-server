<!-- product component -->
<div x-data="products()" x-init="fetch()">
    <div class="products-container uk-flex uk-flex-wrap uk-flex-wrap-around ">
        <template x-for="product in products" :key="product.id">
            <div>
                <div class="uk-card uk-card-default uk-margin-left uk-margin-top uk-card-hover">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-auto">
                                <!-- <img class="uk-border-circle" width="40" height="40" src="images/avatar.jpg"> -->
                                <span uk-icon="icon: camera"></span>
                            </div>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom product-title" id="product-title-${id}" x-text="product.title"></h3>
                                <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <p class="short-description" x-text="product.short_description"></p>
                        <hr class="uk-divider-small">
                        <p class="product-price" x-text="formatPriceAndCurrency(product.price_cents, product.price_currency)"></p>
                        <hr class="uk-divider-small">
                        <p class="product-quantity"><span class="uk-label">quantity</span>1</p>
                    </div>
                    <div class="uk-card-footer">
                        <a href="#" class="uk-button uk-button-text add-to-cart" :data-id="product.id">Add to cart</a>
                    </div>
                </div>
            </div>
        </template>
    </div>
</div>

<script>
    function products() {
        return {
            products: [],
            formatPriceAndCurrency(cents, currency) {
                return (cents / 100) + ' ' + currency;
            },
            fetch() {
                fetch('http://laravel-gernzy.test/graphql', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            query: '{ products(first:10) { data { id title status published short_description price_cents price_currency } } }'
                        }),
                    })
                    .then(response => response.json())
                    .then(data => this.products = data.data.products.data)
            }
        }
    }
</script>