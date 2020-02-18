import $ from 'jquery';
import { User } from './user';

class SessionService {
    constructor(graphqlService) {
        this.graphqlService = graphqlService;
    }

    getShopConfig() {
        var userToken = localStorage.getItem('userToken');

        let query = `
            query {
                shopConfig
            }
        `;

        return this.graphqlService.sendQuery(query, userToken).then(re => {
            console.log(re);
        });
    }

    setGeoLocation() {
        var userToken = localStorage.getItem('userToken');

        let query = `
            mutation {
                setSessionGeoLocation {
                    geolocation_record
                }
            }
        `;

        return this.graphqlService.sendQuery(query, userToken).then(re => {
            console.log(re);
        });
    }
    setCurrency() {
        var userToken = localStorage.getItem('userToken');

        let query = `
            mutation {
                setSessionCurrency(input: {
                    currency: "EUR"
                }){
                    currency
                }
            }
        `;

        return this.graphqlService.sendQuery(query, userToken).then(re => {
            console.log(re);
        });
    }

    setupUser() {
        // Session object in localStorage if it doesn't already exist, and verify
        let userObj = new User(this.graphqlService);
        if (!userObj.checkIfTokenInLocalStorage()) {
            userObj.createSession();
        } else {
            userObj.checkTokenExistsInDatabase().then(re => {
                try {
                    if (re.errors[0].debugMessage == 'Cannot return null for non-nullable field Session.id.') {
                        // Recreate session object
                        userObj.createSession();
                    }
                } catch (error) {
                    // No error exist
                }
            });
        }
    }
}
export { SessionService };
