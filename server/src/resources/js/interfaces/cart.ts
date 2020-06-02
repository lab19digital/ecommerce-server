export interface GernzyCart {
    endpointUrl(url: string): void;
    viewProductsInCart(): Promise<Gernzy.reViewProductsInCart>;
    getProductInCart(products: []): Promise<any>;
    populateUIWithProducts(products: any): void;
}
