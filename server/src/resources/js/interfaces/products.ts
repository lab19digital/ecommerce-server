export interface StoreProducts {
    productsComponent(): any;
    getProduct(id: number): Promise<any>;
    addProductToCart(event: any): void;
    endpointUrl(url: string): void;
}
