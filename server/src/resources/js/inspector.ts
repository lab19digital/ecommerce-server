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
        let query = `query {
            packages
        }`;

        let userToken = localStorage.getItem('userToken') || '';
        var self = this;
        return {
            packages: {},
            showSuccess: false,
            successText: 'Success!',
            showError: false,
            errorText: 'An error occured.',
            fetch() {
                self.graphqlService.sendQuery(query, userToken, self.url).then((data) => {
                    try {
                        let packages = JSON.parse(data.data.packages);
                        console.log(packages.require_dev_packages);
                        console.log(Object.entries(packages.require_dev_packages));

                        // packages.require_dev_packages.forEach((element: any) => {
                        //     console.log('Hi' + element);
                        // });

                        this.packages = packages;
                    } catch (error) {
                        this.showError = true;
                        this.errorText = 'An error occured while loading product. Please try again';
                        // console.log('productsComponent() .then(  try { catch');
                        console.log(error);
                    }
                });
            },
        };
    }
}
export { Inspector };
