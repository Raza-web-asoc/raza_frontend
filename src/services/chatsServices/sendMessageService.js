import { gql } from "@apollo/client";
import client from "../../apolloClient.jsx";

export const sendMessage = async (pet_id1, pet_id2, pet_id_sender, message) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("Token no encontrado");
  }

  const MUTATION = gql`
    mutation SendMessage($pet_id1: Int!, $pet_id2: Int!, $pet_id_sender: Int!, $message: String!) {
      sendMessage(pet_id1: $pet_id1, pet_id2: $pet_id2, pet_id_sender: $pet_id_sender, message: $message)
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: MUTATION,
      variables: {
        pet_id1: Number(pet_id1),
        pet_id2: Number(pet_id2),
        pet_id_sender: Number(pet_id_sender),
        message: String(message)
      }
    });
    return data.sendMessage;
  } catch (error) {
    console.error(error);
    throw new Error("Error al enviar el mensaje");
  }
};
