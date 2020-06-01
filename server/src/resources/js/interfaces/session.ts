export interface GernzySession {
    endpointUrl(url: string): void;
    setUpSessionData(): Promise<any>;
    setUpShopConfig(): Promise<any>;
    setUpGeoLocation(): Promise<any>;
    changeUserCurrency(event: any): Promise<any>;
    setupUser(): void;
    setupSessionFactory(url: string): void;
}
