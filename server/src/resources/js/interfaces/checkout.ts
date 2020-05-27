export interface GernzyCheckout {
    endpointUrl(url: string): void;
    checkout(): void;
    sendOfCheckoutInfo(values): Promise<any>;
    getBasketTotal(): Promise<any>;
    displayLineItems(): void;
    populatePaymentProviders(): Promise<any>;
}
