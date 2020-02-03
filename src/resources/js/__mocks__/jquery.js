const jQuery = require('jquery/dist/jquery.js');
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import productSchema from '../graphql/schema';

// Fill this in with the schema string
const schemaString = productSchema;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema });

jQuery.ajax = settings => {
    return new Promise((resolve, reject) => {
        let query = JSON.parse(settings.data);
        query = query.query;

        process.nextTick(() => {
            graphql(schema, query).then(result => {
                console.log('Result: ' + JSON.stringify(result));
                resolve(result);
            });
        });
    });
};

export default jQuery;
