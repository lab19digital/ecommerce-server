class User {
    constructor() {}
    createSession() {
        $.ajax({
            url: 'http://laravel-gernzy.test/graphql',
            contentType: 'application/json',
            type: 'POST',
            context: this,
            data: JSON.stringify({
                query: `mutation {
                             createSession {
                                 token
                             }
                         }`,
            }),
            success: function(result) {
                let token = result.data.createSession.token;
                this.addSessionTokenToLocalStorage(token);
            },
        });
    }

    addSessionTokenToLocalStorage(token) {
        localStorage.setItem('userToken', token);
    }

    checkIfTokenInLocalStorage() {
        let userTokenLocalStorage = localStorage.getItem('userToken');
        // Check if token not already in local storage, and if not add to localStorage
        if (userTokenLocalStorage) {
            return true;
        } else {
            return false;
        }
    }
}
export { User };
