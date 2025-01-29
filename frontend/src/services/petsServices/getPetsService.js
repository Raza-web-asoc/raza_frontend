import axios from "axios";
import { gql } from "@apollo/client";
import client from "../../apolloClient";

export const getPets = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  try {
    const response = await axios.get("http://localhost/api/pets/mascotas", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Usuario o contraseña incorrecta");
  }
};

export const getPetById = async (pet_id) => {
  if (!pet_id) {
    throw new Error("id de la mascota no proporcionada");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  try {
    const response = await axios.get(`http://localhost/api/pets/mascotas/${pet_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Usuario o contraseña incorrecta");
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
    query mascotas($id_usuario: Int!) {
      mascotas(id_usuario: $id_usuario) {
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
      query: PET_QUERY,
      variables: { id_usuario },
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    return data.mascotas;
  } catch (error) {
    console.error(`Fallo en la consulta de mascotas: ${error.message}`);
    throw new Error(`Fallo en la consulta de mascotas: ${error.message}`);
  }
};
