import $ = require('jquery');
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { injectable } from 'inversify';

@injectable()
class GraphqlService implements GernzyGraphqlService {
    async sendQuery(graphqlQuery: string, userToken: string, url: string) {
        try {
            const data = await $.ajax({
                url: url,
                contentType: 'application/json',
                type: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
                data: JSON.stringify({
                    query: graphqlQuery,
                }),
            });
            return data;
        } catch (err) {
            console.log('async sendQuery(graphqlQuery, userToken = ){');
            console.log(err);
            return err;
        }
    }
}
export { GraphqlService };
