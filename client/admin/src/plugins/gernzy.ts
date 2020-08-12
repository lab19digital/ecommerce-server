export default function (GraphQLServer: any) {
  // @ts-ignore
  const App = this;
  const graphql = {
    query: function (query: any, params: any) {
      return GraphQLServer.query(query, params);
    },
  };

  return {
    install: function (Vue: any, options: any) {
      Vue.prototype.$gernzy = {
        graphql: graphql,
      };
    },
  };
}
