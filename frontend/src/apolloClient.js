import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',  // Cambia la URL a la de tu servidor GraphQL
    headers: {
      authorization: localStorage.getItem('access_token') || '',
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
