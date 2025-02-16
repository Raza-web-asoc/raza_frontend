import { gql } from '@apollo/client';
import client from '../../apolloClient.jsx';

export const getBreeds = async () => {
  const BREEDS_QUERY = gql`
    query {
      breeds {
        id_raza
        nombre_raza
        id_especie
        historia
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: BREEDS_QUERY
    });

    return data.breeds;
  } catch (error) {
    throw new Error("Error al obtener las razas");
  }
};
