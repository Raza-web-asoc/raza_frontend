import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { envVariables } from './config/variables.js';

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${envVariables.GRAPHQL_URL}:${envVariables.GRAPHQL_PORT}/graphql`,  // Usa las variables de entorno
    headers: {
      authorization: localStorage.getItem('access_token') || '',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;