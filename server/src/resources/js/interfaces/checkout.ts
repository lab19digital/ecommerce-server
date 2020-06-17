export interface GernzyCheckout {
    endpointUrl(url: string): void;
    checkout(): void;
    sendOfCheckoutInfo(values: {}): Promise<[]>;
    getBasketTotal(): void;
    displayLineItems(): void;
    setupCheckoutFactory(url: string): void;
}
