export interface GernzySession {
    setUpSessionData(): Promise<any>;
    setUpShopConfig(): Promise<any>;
    setUpGeoLocation(): Promise<any>;
    changeUserCurrency(event: any): Promise<any>;
    setupUser(): void;
}
