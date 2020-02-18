import $ from 'jquery';
import { User } from './user';

class SessionService {
    constructor(graphqlService) {
        this.graphqlService = graphqlService;
    }

    setUpSessionData() {
        var userToken = localStorage.getItem('userToken');

        let query = `{
            me {
                session {
                    data
                }
            }
        }`;

        return this.graphqlService.sendQuery(query, userToken).then(re => {
            localStorage.setItem('sessionData', re.data.me.session.data);
            localStorage.setItem('currency', re.data.me.session.data[0]);
        });
    }

    setUpShopConfig() {
        var userToken = localStorage.getItem('userToken');

        let query = `
            query {
                shopConfig
            }
        `;

        return this.graphqlService.sendQuery(query, userToken).then(re => {
            localStorage.setItem('shopConfig', re.data.shopConfig);
        });
    }

    setUpGeoLocation() {
        var userToken = localStorage.getItem('userToken');

        let query = `
            mutation {
                setSessionGeoLocation {
                    geolocation_record
                }
            }
        `;

        return this.graphqlService.sendQuery(query, userToken).then(re => {
            let error = re.errors[0].debugMessage;
            if (!error) {
                localStorage.setItem('setSessionGeoLocation', re.data.setSessionGeoLocation.geolocation_record);
            } else {
                // handle error
                console.log(error);
            }
        });
    }

    setUpCurrency() {
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

        return this.graphqlService.sendQuery(query, userToken);
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
