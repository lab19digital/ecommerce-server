import productTemplate from './templates/productTemplate';
import errorTemplate from './templates/errorTemplate';
import { injectable, inject } from 'inversify';
import { GernzyInspector } from './interfaces/inspector';
import { GernzyGraphqlService } from './interfaces/graphqlService';
import { TYPES } from './types/types';

@injectable()
class Inspector implements GernzyInspector {
    @inject(TYPES.GernzyGraphqlService) private graphqlService!: GernzyGraphqlService;
    private url!: string;

    public endpointUrl(url: string) {
        this.url = url;
    }

    public inspectorSetup() {
        window.inspector = this.createPublicInterface.bind(this);
    }

    public createPublicInterface() {
        let userToken = localStorage.getItem('userToken') || '';
        var self = this;
        return {
            requireDevPackages: [['', '']],
            requirePackages: [['', '']],
            providers: [],
            events: [],
            paymentProviders: [],
            publishableProviders: [],
            laravel_log: [],
            showSuccess: false,
            successText: 'Success!',
            showError: false,
            errorText: 'An error occured.',
            logContent: [],
            fetch() {
                let query = `query {
                    packages
                }`;

                self.graphqlService.sendQuery(query, userToken, self.url).then((data) => {
                    try {
                        let packages = JSON.parse(data.data.packages);

                        let packagesProviders = packages.providers.map((item: '') => {
                            return self.searchGernzy(item);
                        });

                        let publishableProviders = packages.publishable_providers.map((item: '') => {
                            return self.searchGernzy(item);
                        });

                        let eventObjects = Object.entries(packages.events).map((event: any) => {
                            return { event: event[0], actions: event[1] };
                        });

                        let logs = packages.laravel_log.map((item: '') => {
                            return { item: item, show: false };
                        });

                        this.requireDevPackages = Object.entries(packages.require_dev_packages);
                        this.requirePackages = Object.entries(packages.require_packages);
                        this.providers = packagesProviders;
                        this.paymentProviders = packages.payment_providers;
                        //@ts-ignore
                        this.events = eventObjects;
                        this.publishableProviders = publishableProviders;
                        this.laravel_log = logs;
                    } catch (error) {
                        this.showError = true;
                        this.errorText = 'An error occured while loading product. Please try again';
                        // console.log('productsComponent() .then(  try { catch');
                        console.log(error);
                    }
                });
            },
            viewLogClick(event: { target: HTMLInputElement }) {
                let logFileName = event.target.getAttribute('data-log');
                let query = `query {
                    logContents(filename: "${logFileName}")
                }`;

                this.laravel_log.forEach((element: any) => {
                    if (element.item == logFileName) {
                        element.show = true;
                    }
                });

                self.graphqlService.sendQuery(query, userToken, self.url).then((data) => {
                    try {
                        let logContent = JSON.parse(data.data.logContents);
                        // console.log(logContent);
                        logContent[1].forEach((element: any) => {
                            try {
                                element.stack = element.stack.split('#');
                            } catch (error) {}
                        });
                        logContent[0] = [logContent[0]];
                        console.log(logContent);
                        this.logContent = logContent;
                    } catch (error) {
                        this.showError = true;
                        this.errorText = 'An error occured while loading logs. Please try again';
                        // console.log('productsComponent() .then(  try { catch');
                        console.log(error);
                    }
                });
            },
        };
    }

    public searchGernzy(item: any) {
        if (new RegExp('\\b' + 'Gernzy' + '\\b', 'i').test(item)) {
            return { item: item, class: true };
        } else {
            return { item: item, class: false };
        }
    }
}
export { Inspector };
