export {};

declare global {
    interface Window {
        products: Function;
        cartProducts: Function;
        lineItems: Function;
        availableCurrencies: Function;
    }
}
