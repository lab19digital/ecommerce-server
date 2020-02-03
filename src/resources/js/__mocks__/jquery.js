const jQuery = require('jquery/dist/jquery.js');
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import typeDefs from '../graphql/schema';

// Fill this in with the schema string
const schemaString = typeDefs;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

jQuery.ajax = settings => {
    return new Promise((resolve, reject) => {
        let query = JSON.parse(settings.data);
        query = query.query;
        // const query = `
        //     query tasksForUser {
        //         user(id: 6) {
        //             id, name
        //         }
        //     }
        // `;

        process.nextTick(() => {
            graphql(schema, query).then(result => {
                console.log('Got result ', result);
                resolve(result);
            });
        });
    });
};

export default jQuery;
