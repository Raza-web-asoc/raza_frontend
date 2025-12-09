import axios from "axios";

const API_BASE_URL = "http://localhost:8010/adds";
const USER_ID = 0; // user_id siempre fijo en 0

// Configurar axios con headers por defecto
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Obtener todos los anuncios
export const getAllAds = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener anuncios:", error);
    throw new Error(
      error.response?.data?.detail ||
        error.message ||
        "Error al obtener los anuncios"
    );
  }
};

// Crear un nuevo anuncio
export const createAd = async (title, description, image_base64) => {
  if (!title || !description) {
    throw new Error("El título y la descripción son requeridos");
  }

  try {
    const response = await apiClient.post("/", {
      title: title,
      description: description,
      image_base64: image_base64 || "",
      user_id: USER_ID,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear anuncio:", error);
    throw new Error(
      error.response?.data?.detail ||
        error.message ||
        "Error al crear el anuncio"
    );
  }
};

// Actualizar un anuncio por ID
export const updateAd = async (id, title, description, image_base64) => {
  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (image_base64 !== undefined) updateData.image_base64 = image_base64;

    const response = await apiClient.put(`/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar anuncio:", error);
    throw new Error(
      error.response?.data?.detail ||
        error.message ||
        `Error al actualizar el anuncio con ID ${id}`
    );
  }
};

// Eliminar un anuncio por ID
export const deleteAd = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar anuncio:", error);
    throw new Error(
      error.response?.data?.detail ||
        error.message ||
        `Error al eliminar el anuncio con ID ${id}`
    );
  }
};
