const products = {
    title: 'ea',
    status: 'IN_STOCK',
    published: 1,
    short_description: 'Delectus debitis eligendi',
};

export default function sendQuery(id) {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            users[id]
                ? resolve(products[id])
                : reject({
                      error: 'User with ' + id + ' not found.',
                  }),
        );
    });
}
