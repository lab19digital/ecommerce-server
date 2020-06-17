export interface GernzyCart {
    endpointUrl(url: string): void;
    cartSetup(): void;
    cartProductsDetails(itemsInCart: [{}], productIds: number[]): Promise<[]>;
    extractIDsFromItemsInCart(itemsInCart: []): number[];
}
