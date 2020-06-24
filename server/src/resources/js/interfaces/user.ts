export interface GernzyUser {
    endpointUrl(url: string): void;
    createSession(): Promise<any>;
    addSessionTokenToLocalStorage(token: string): void;
    checkIfTokenInLocalStorage(): boolean;
    checkTokenExistsInDatabase(): Promise<any>;
}
