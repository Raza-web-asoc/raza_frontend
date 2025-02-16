import { gql } from "@apollo/client";
import client from "../../apolloClient.jsx";

export const getChats = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  const QUERY = gql`
    query {
      chats {
        count
        data {
            pets
            messages {
                message_id
                pet_id
                message
                timestamp
            }
          }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: QUERY
    });
    return data.chats;
  } catch (error) {
    console.error(error);
    throw new Error("Usuario o contraseña incorrecta");
  }
};


export const getChatsByPet = async (pet_id) => {
  if (!pet_id) {
    throw new Error("id de la mascota no proporcionada");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  const QUERY = gql`
    query {
      chatsByPet(pet_id: ${pet_id})
    } 
  `;

  try {
    const { data } = await client.query({
      query: QUERY
    });
    return data.chatsByPet;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las mascotas del usuario");
  }
};


export const getUniqueChatByPets = async (pet_id1, pet_id2) => {
  if (!pet_id1 || !pet_id2) {
    throw new Error("id de las mascotas no proporcionada");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  const QUERY = gql`
    query uniqueChatByPets($input: UniqueChatByPetsInput!){
      uniqueChatByPets(input: $input){
        message_id pet_id message timestamp
      }
    } 
  `;

  try {
    const { data } = await client.query({
      query: QUERY,
      variables: {
        input: { pet_id1, pet_id2 }
      }
    });
    return data.uniqueChatByPets;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las mascotas del usuario");
  }
};