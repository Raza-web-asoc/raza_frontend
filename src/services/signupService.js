import { gql } from '@apollo/client';
import client from '../apolloClient.jsx';

export const register = async (username, names, last_names, email, password, birthday, gender) => {
  const MUTATION = gql`
    mutation signup($input: UserInput!) {
      signup(input: $input){
        idUser
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: MUTATION,
      variables: {
        input: { username, password, names, last_names, email, gender, birthday },
      }
    });
    return data.signup;
  } catch (error) {
    throw new Error('Error al registrar el usuario:', error);
  }
};
