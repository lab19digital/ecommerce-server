export interface StoreProducts {
    getAllProducts(): Promise<any>;
    getProduct(id: number): Promise<any>;
    addProductToCart(event: any): void;
    endpointUrl(url: string): void;
}
