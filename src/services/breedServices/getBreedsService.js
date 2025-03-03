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

export const getBreedsBySpecie = async (id_especie) => {
    if (!id_especie) {
        throw new Error("id_especie no proporcionado");
    }

    const BREEDS_QUERY = gql`
      query breedsBySpecie($id_especie: Int!) {
        breedsBySpecie(id_especie: $id_especie) {
          id_raza
          nombre_raza
        }
      }
    `;

    try {
      const { data } = await client.query({
        query: BREEDS_QUERY,
        variables: { id_especie },
      });

      return data.breedsBySpecie;
    } catch (error) {
      console.log("el error es: ", error.message);
      throw new Error("Error al obtener las razas");
    }
}
