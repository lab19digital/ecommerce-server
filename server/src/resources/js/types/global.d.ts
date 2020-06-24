export {};

declare global {
    interface Window {
        products: Function;
        cartProducts: Function;
        lineItems: Function;
        availableCurrencies: Function;
        checkoutCartTotal: Function;
        checkoutForm: Function;
        inspector: Function;
    }
}
