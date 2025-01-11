import axios from "axios";

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

export const getPetsByUser = async (usuario_id) => {
  if (!usuario_id) {
    throw new Error("usuario_id no proporcionado");
  }

  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }

  try {
    const response = await axios.get(`http://localhost/api/pets/mascotas/usuario/${usuario_id}`, {
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
