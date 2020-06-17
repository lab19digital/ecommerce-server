export interface StoreProducts {
    productsComponent(): void;
    getProduct(id: number): Promise<any>;
    getProductsByIDs(productIDs: number[]): Promise<any>;
    addProductToCart(productID: string): void;
    endpointUrl(url: string): void;
}
