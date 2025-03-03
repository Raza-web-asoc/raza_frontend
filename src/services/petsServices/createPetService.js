import { gql } from '@apollo/client';
import client from '../../apolloClient.jsx';

export const createPet = async (
  nombre_mascota,
  id_raza,
  sexo,
  fecha_nacimiento
) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  const MUTATION = gql`
    mutation registerPet($input: PetInput!, $token: String!) {
      registerPet(input: $input, token: $token) {
        id_mascota
        nombre_mascota
        id_raza
        sexo
        fecha_nacimiento
      }
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: MUTATION,
      variables: {
        input: { nombre_mascota, id_raza, sexo, fecha_nacimiento },
        token,
      },
    });

    return data.registerPet;
  } catch (error) {
    throw new Error("Error al crear la mascota");
  }
};
