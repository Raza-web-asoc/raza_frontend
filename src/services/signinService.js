import { gql } from '@apollo/client';
import client from '../apolloClient.jsx';

export const login = async (username, password) => {
  const LOGIN_MUTATION = gql`
    mutation signin($input: LoginInput!) {
      signin(input: $input) {
        access_token
        role
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { input: { username, password } },
    });

    const { access_token, role } = data.signin;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('role', role);
    
    return role;
  } catch (error) {
    throw new Error('Usuario o contraseña incorrecta:', error);
  }
};
