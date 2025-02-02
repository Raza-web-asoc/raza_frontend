import { gql } from '@apollo/client';
import client from '../../apolloClient';

export const getSpecies = async () => {

  const SPECIES_QUERY = gql`
    query {
      species {
        nombre_especie
        id_especie
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: SPECIES_QUERY
    });

    return data.species;
  } catch (error) {
    throw new Error('Error al obtener los datos de las especies:', error.message);
  }

};