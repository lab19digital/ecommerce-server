import $ from 'jquery';

class GraphqlService {
    constructor(config) {
        this.userToken = localStorage.getItem('userToken');
        this.config = config;
    }
    async sendQuery(graphqlQuery, userToken = '') {
        let apiUrl;
        try {
            apiUrl = this.config.apiUrl;
        } catch (error) {
            apiUrl = '';
        }

        try {
            const data = await $.ajax({
                url: apiUrl,
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
            return err;
        }
    }
}
export { GraphqlService };
