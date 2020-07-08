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
            dateInput: '',
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
                            return { item: item, showLogName: true, showLogContents: false, button_text: 'open' };
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
            // Display the contents of a log
            viewLogClick(event: { target: HTMLInputElement }) {
                let logFileName = event.target.getAttribute('data-log');
                let query = `query {
                    logContents(filename: "${logFileName}")
                }`;

                let alreadyOpen = false;

                this.laravel_log.forEach((element: any, index: any) => {
                    if (element.item == logFileName) {
                        if (element.showLogContents == true) {
                            element.button_text = 'open';
                            element.showLogContents = false;
                            alreadyOpen = true;
                            this.logContent = [];
                            return;
                        }
                        element.showLogContents = true;
                        element.button_text = 'close';
                    } else {
                        element.showLogContents = false;
                    }
                });

                // this checks if the file has alread been loaded and displayed on the screen
                // No need to do api call again
                if (alreadyOpen) {
                    return;
                }

                self.graphqlService.sendQuery(query, userToken, self.url).then((data) => {
                    try {
                        let logContent = JSON.parse(data.data.logContents);
                        logContent[1].forEach((element: any) => {
                            try {
                                element.stack = element.stack.split('#');
                            } catch (error) {}
                        });
                        logContent[0] = [logContent[0]];
                        this.logContent = logContent;
                    } catch (error) {
                        this.showError = true;
                        this.errorText = 'An error occured while loading logs. Please try again';
                        // console.log('productsComponent() .then(  try { catch');
                        console.log(error);
                    }
                });
            },
            // Filter the UI list of log files, for files that match the date input
            updateListOfFiles(event: { target: HTMLInputElement }) {
                this.logContent = [];
                let date = event.target.value;

                this.laravel_log.forEach((element: any, index: any) => {
                    var dateFromFileName = element.item.slice(8, 18);
                    if (date == dateFromFileName) {
                        element.showLogName = true;
                    } else {
                        if (Date.parse(dateFromFileName)) {
                            element.showLogName = false;

                            element.showLogContents = false;
                        }
                    }
                });
            },
            viewLogResetClick() {
                this.logContent = [];
                this.laravel_log.forEach((element: any, index: any) => {
                    element.showLogName = true;
                    element.showLogContents = false;
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
