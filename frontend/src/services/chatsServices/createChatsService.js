import { gql } from "@apollo/client";
import client from "../../apolloClient";

export const createChat = async (pet_id1, pet_id2) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  const MUTATION = gql`
    mutation {
      createChat(pet_id1: ${pet_id1}, pet_id2: ${pet_id2})
    } 
  `;

  try {
    const { data } = await client.mutate({
      mutation: MUTATION
    });
    return data.createChat;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la mascota");
  }
};