import axios from "axios";

export const getChats = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  try {
    const response = await axios.get("http://localhost/api/chats/all", {
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


export const getChatsByPet = async (pet_id) => {
  if (!pet_id) {
    throw new Error("id de la mascota no proporcionada");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  try {
    const response = await axios.get(`http://localhost/api/chats/get-available-chats/${pet_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
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
  
    try {
      const response = await axios.get(`http://localhost/api/chats/get-chat/${pet_id1}/${pet_id2}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las mascotas del usuario");
    }
  };