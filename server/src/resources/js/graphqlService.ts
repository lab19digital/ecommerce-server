import $ = require('jquery');
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { injectable } from 'inversify';

@injectable()
class GraphqlService implements GernzyGraphqlService {
    async sendQuery(graphqlQuery: string, userToken: string, url: string) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                body: JSON.stringify({
                    query: graphqlQuery,
                }),
            });
            return response.json();
        } catch (err) {
            // console.log('async sendQuery(graphqlQuery, userToken = ){');
            // console.log(err);
            return err;
        }
    }
}
export { GraphqlService };
