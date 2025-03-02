import { gql } from "@apollo/client";
import client from "../../apolloClient.jsx";

export const getPets = async () => {
  const QUERY = gql`
    query {
      pets {
        id_mascota
        nombre_mascota
        id_especie
        id_raza
        sexo
        fecha_nacimiento
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: QUERY
    });
    return data.pets;
  } catch (error) {
    throw new Error("Error al obtener todas las mascotas", error.message);
  }
};

export const getPetById = async (pet_id) => {
  if (!pet_id) {
    throw new Error("id de la mascota no proporcionada");
  }

  const QUERY = gql`
    query {
      petByID(pet_id: ${pet_id}) {
        id_mascota
        nombre_mascota
        id_especie
        id_raza
        sexo
        fecha_nacimiento
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: QUERY
    });
    return data.petByID;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener la mascota con la id: ", pet_id);
  }
};

export const getPetsByUser = async (id_usuario) => {
  if (!id_usuario) {
    throw new Error("id_usuario no proporcionado");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  const PET_QUERY = gql`
    query pets($id_usuario: Int!) {
      pets(id_usuario: $id_usuario) {
        id_mascota
        id_especie
        id_usuario
        nombre_mascota
        nombre_especie
        nombre_raza
        id_raza
        sexo
        fecha_nacimiento
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: PET_QUERY,
      variables: { id_usuario },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    return data.pets;
  } catch (error) {
    console.error(`Fallo en la consulta de mascotas del usuario: ${error.message}`);
    throw new Error(`Fallo en la consulta de mascotas del usuario: ${error.message}`);
  }
};

export const getPetsToMakeMatch = async (id_usuario, id_especie) => {
  if (!id_usuario) {
    throw new Error("id_usuario no proporcionado");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  const PET_QUERY = gql`
    query petsForMatch($id_usuario: Int!, $id_especie: Int! ) {
      petsForMatch(id_usuario: $id_usuario,id_especie: $id_especie ) {
        nombre_mascota
        id_raza
        sexo
        fecha_nacimiento
        id_mascota
        id_usuario
        id_especie
        fecha_registro
        nombre_especie
        nombre_raza
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: PET_QUERY,
      variables: { id_usuario, id_especie },
    });
    return data.petsForMatch;
  } catch (error) {
    throw new Error(`Fallo en la consulta de mascotas para match: ${error.message}`);
  }

}
