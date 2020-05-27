export interface GernzyCart {
    endpointUrl(url: string): void;
    viewProductsInCart(): Promise<any>;
    lookupProductsInCart(products: []): Promise<any>;
    populateUIWithProducts(products: any): any;
}
