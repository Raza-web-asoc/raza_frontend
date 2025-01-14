import axios from "axios";

export const createChat = async (pet_id1, pet_id2) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  try {
    const response = await axios.post(
      `http://localhost/api/chats/create-chat/${pet_id1}/${pet_id2}`,
      {},
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