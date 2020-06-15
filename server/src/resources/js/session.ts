import { User } from './user';
import { injectable, inject } from 'inversify';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { TYPES } from './types/types';
import { GernzySession } from './interfaces/session';
import { GernzyUser } from './interfaces/user';

@injectable()
class SessionService implements GernzySession {
    @inject(TYPES.GernzyUser) private userObj!: GernzyUser;
    @inject(TYPES.GernzyGraphqlService) private graphqlService!: GernzyGraphqlService;
    private url!: string;

    public endpointUrl(url: string) {
        this.url = url;
    }

    public setUpSessionData() {
        var userToken = localStorage.getItem('userToken') || '';

        let query = `{
            me {
                session {
                    data
                }
            }
        }`;

        return this.graphqlService.sendQuery(query, userToken, this.url).then((re) => {
            try {
                localStorage.setItem('sessionData', re.data.me.session.data);

                if (re.data.me.session.data[1]) {
                    localStorage.setItem('currency', re.data.me.session.data[1]);
                }
            } catch (error) {
                // console.log(error);
            }
        });
    }

    public setUpShopConfig() {
        let userToken = localStorage.getItem('userToken') || '';

        let query = `
            query {
                shopConfig {
                    default_currency
                }
            }
        `;

        return this.graphqlService.sendQuery(query, userToken, this.url).then((re) => {
            localStorage.setItem('default_currency', re.data.shopConfig.default_currency);
        });
    }

    public setupCurrency() {
        let userToken = localStorage.getItem('userToken') || '';
        var self = this;

        let query = `
            query {
                shopConfig {
                    enabled_currencies
                    default_currency
                }
            }
        `;

        window.availableCurrencies = () => {
            return {
                currencies: [],
                fetch() {
                    self.graphqlService.sendQuery(query, userToken, self.url).then((re) => {
                        this.currencies = re.data.shopConfig.enabled_currencies;
                    });
                },
                changeCurrencyClick(event: { target: EventTarget }) {
                    self.changeUserCurrency(event);
                },
            };
        };
    }

    public setUpGeoLocation() {
        var userToken = localStorage.getItem('userToken') || '';

        let query = `
            mutation {
                setSessionGeoLocation {
                    geolocation_record
                }
            }
        `;

        return this.graphqlService.sendQuery(query, userToken, this.url).then((re) => {
            let error = re.errors[0].debugMessage;
            if (!error) {
                localStorage.setItem('setSessionGeoLocation', re.data.setSessionGeoLocation.geolocation_record);
            } else {
                // handle error
                // console.log(error);
            }
        });
    }

    public changeUserCurrency(event: { target: any }) {
        var userToken = localStorage.getItem('userToken') || '';
        let currrency = event.target.getAttribute('data-currency');

        let query = `
            mutation {
                setSessionCurrency(input: {
                    currency: "${currrency}"
                }){
                    currency
                }
            }
        `;

        return this.graphqlService.sendQuery(query, userToken, this.url).then((re) => {
            try {
                // See if there is an error
                let error = re.errors[0].debugMessage;
                // console.log(error);
            } catch {
                localStorage.setItem('currency', re.data.setSessionCurrency.currency);

                // A lot of state will need to change with the currency changing, and for now an easy fix is just to force
                // a reload
                location.reload(true);
            }
        });
    }

    public setupUser() {
        this.userObj.endpointUrl(this.url);
        // Session object in localStorage if it doesn't already exist, and verify
        if (!this.userObj.checkIfTokenInLocalStorage()) {
            this.userObj.createSession();
        } else {
            this.userObj.checkTokenExistsInDatabase().then((re) => {
                try {
                    if (re.errors[0].debugMessage == 'Cannot return null for non-nullable field Session.id.') {
                        // Recreate session object
                        this.userObj.createSession();
                    }
                } catch (error) {
                    // No error exist
                }
            });
        }
    }

    public setupSessionFactory(url: string) {
        this.loaderInit();
        this.endpointUrl(url);
        this.setupUser();
        this.setUpShopConfig();
        this.setUpSessionData();
        this.setupCurrency();
        // this.setUpGeoLocation();
    }

    public loaderInit() {
        let loading = document.getElementById('loadingDiv');
        if (loading) loading.style.display = 'none';
    }
}
export { SessionService };
