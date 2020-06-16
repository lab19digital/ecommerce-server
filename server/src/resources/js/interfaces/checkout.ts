export interface GernzyCheckout {
    endpointUrl(url: string): void;
    checkout(): void;
    sendOfCheckoutInfo(values: {}): Promise<any>;
    getBasketTotal(): any;
    displayLineItems(): void;
    setupCheckoutFactory(url: string): void;
}
