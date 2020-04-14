class User {
    constructor(graphqlService) {
        this.graphqlService = graphqlService;
    }
    createSession() {
        let query = `mutation {
            createSession {
                token
            }
        }`;

        return this.graphqlService
            .sendQuery(query)
            .then(re => {
                let token = re.data.createSession.token;
                this.addSessionTokenToLocalStorage(token);
                return re;
            })
            .catch(error => {
                // console.log(error);
            });
    }

    addSessionTokenToLocalStorage(token) {
        localStorage.setItem('userToken', token);
    }

    checkIfTokenInLocalStorage() {
        // Check if token in local
        let userTokenLocalStorage = localStorage.getItem('userToken');

        if (!userTokenLocalStorage || 0 === userTokenLocalStorage.length) {
            return false;
        } else {
            return true;
        }
    }

    checkTokenExistsInDatabase() {
        let userTokenLocalStorage = localStorage.getItem('userToken');

        let query = ` {
            me {
                session {
                    id
                    token
                }
            }
        }`;

        return this.graphqlService.sendQuery(query, userTokenLocalStorage);
    }
}
export { User };
