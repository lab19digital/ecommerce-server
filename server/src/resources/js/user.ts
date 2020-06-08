import { injectable, inject } from 'inversify';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { TYPES } from './types/types';

@injectable()
class User {
    @inject(TYPES.GernzyGraphqlService) private graphqlService!: GernzyGraphqlService;
    private url!: string;

    public endpointUrl(url: string) {
        this.url = url;
    }

    createSession() {
        let query = `mutation {
            createSession {
                token
            }
        }`;

        return this.graphqlService
            .sendQuery(query, '', this.url)
            .then((re) => {
                let token = re.data.createSession.token;
                this.addSessionTokenToLocalStorage(token);
                return re;
            })
            .catch((error) => {
                // console.log(error);
            });
    }

    addSessionTokenToLocalStorage(token: string) {
        localStorage.setItem('userToken', token);
    }

    checkIfTokenInLocalStorage() {
        // Check if token in local
        let userTokenLocalStorage = localStorage.getItem('userToken') || '';

        if (!userTokenLocalStorage || 0 === userTokenLocalStorage.length) {
            return false;
        } else {
            return true;
        }
    }

    checkTokenExistsInDatabase() {
        let userTokenLocalStorage = localStorage.getItem('userToken') || '';

        let query = ` {
            me {
                session {
                    id
                    token
                }
            }
        }`;

        return this.graphqlService.sendQuery(query, userTokenLocalStorage, this.url);
    }
}
export { User };
