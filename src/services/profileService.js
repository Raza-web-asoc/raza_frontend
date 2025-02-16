import { gql } from '@apollo/client';
import client from '../apolloClient.jsx';

export const profile = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  const PROFILE_QUERY = gql`
    query getUserData($token: String!) {
      getUserData(token: $token) {
        id_user
        username
        email
        names
        last_names
        birthday
        gender
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: PROFILE_QUERY,
      variables: { token },
    });
    return data.getUserData;
  } catch (error) {
    throw new Error('Error al obtener los datos del usuario:', error.message);
  }
};
