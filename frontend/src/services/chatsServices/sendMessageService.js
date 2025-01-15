import axios from "axios";

export const sendMessage = async (pet_id1, pet_id2, pet_id_sender, message) => {
  const token = localStorage.getItem("access_token");
  console.log(pet_id1, pet_id2, pet_id_sender, message);
  if (!token) {
    throw new Error("Token no encontrado");
  }
  try {
    const response = await axios.post(
      "http://localhost/api/chats/save-message",
      {pets: [pet_id1, pet_id2], pet_id: pet_id_sender, message: message},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la mascota");
  }
};