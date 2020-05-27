export interface GernzyGraphqlService {
    /**
     *
     * @param graphqlQuery
     * @param userToken
     * @param url
     */
    sendQuery(graphqlQuery: string, userToken: string, url: string): Promise<any>;
}
