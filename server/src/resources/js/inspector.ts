import productTemplate from './templates/productTemplate';
import errorTemplate from './templates/errorTemplate';
import { injectable, inject } from 'inversify';
import { GernzyInspector } from './interfaces/inspector';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { TYPES } from './types/types';

@injectable()
class Inspector implements GernzyInspector {
    @inject(TYPES.GernzyGraphqlService) private graphqlService!: GernzyGraphqlService;
    private url!: string;

    public endpointUrl(url: string) {
        this.url = url;
    }

    public inspectorSetup() {
        console.log('hello from inspector');

        window.inspector = this.createPublicInterface.bind(this);
    }

    public createPublicInterface() {
        let query = `query {
            products(first:10) {
                data {
                    id
                    title
                    status
                    published
                    short_description
                    price_cents
                    price_currency
                }
                paginatorInfo {
                    total
                    hasMorePages
                    currentPage
                }
            }
        }`;

        let userToken = localStorage.getItem('userToken') || '';
        var self = this;
        return {
            products: [{ addedToCart: false, id: '' }],
            showSuccess: false,
            successText: 'Success!',
            showError: false,
            errorText: 'An error occured.',
            formatPriceAndCurrency(cents: number, currency: string) {
                let currencyLocalStorage = localStorage.getItem('currency') || '';

                // Check to see if the user has specified a different currency
                if (currencyLocalStorage) {
                    currency = currencyLocalStorage;
                }

                return cents / 100 + ' ' + currency;
            },
            fetch() {
                self.graphqlService.sendQuery(query, userToken, self.url).then((data) => {
                    try {
                        let products = data.data.products.data.map((item: {}) => ({
                            ...item,
                            addedToCart: false,
                        }));
                        this.products = products;
                    } catch (error) {
                        this.showError = true;
                        this.errorText = 'An error occured while loading product. Please try again';
                        // console.log('productsComponent() .then(  try { catch');
                        // console.log(error);
                    }
                });
            },
        };
    }
}
export { Inspector };
