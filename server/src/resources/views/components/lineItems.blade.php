<!-- lineItems component -->
<div x-data="lineItems()" x-init="fetch()" class="uk-padding-large">
    <h1 class="uk-heading-small">Line items</h1>

    <div class="uk-overflow-auto">
        <table class="uk-table uk-table-small uk-table-divider uk-table-responsive uk-table-striped">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody id="table-body-line-item">
            </tbody>
        </table>
    </div>
</div>