export interface GernzyCart {
    endpointUrl(url: string): void;
    viewProductsInCart(): Promise<Gernzy.reViewProductsInCart>;
    lookupProductsInCart(products: []): Promise<any>;
    populateUIWithProducts(products: any): void;
}
