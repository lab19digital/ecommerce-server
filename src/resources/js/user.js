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
                this.token = result.data.createSession.token;
                this.addSessionTokenToLocalStorage();
            },
        });
    }

    addSessionTokenToLocalStorage() {
        console.log(this.token);
    }
}
export { User };
