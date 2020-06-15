export interface GernzyCart {
    endpointUrl(url: string): void;
    cartSetup(): any;
    cartProductsDetails(itemsInCart: [{}], productIds: number[]): any;
    extractIDsFromItemsInCart(itemsInCart: []): any;
}
