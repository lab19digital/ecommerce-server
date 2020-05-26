export interface GernzyGraphqlService {
    sendQuery(graphqlQuery: string, userToken: string, url: string): Promise<any>;
}
