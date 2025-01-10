import axios from "axios";

export const uploadUserImage = async (idUser, image) => {
  const formData = new FormData();
  formData.append("idUser", idUser);
  formData.append("file", image);

  try {
    await axios.post("http://localhost:8002/upload-user-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Imagen subida con éxito");
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al subir la imagen");
  }
};

export const getProfileImage = async (idUser) => {
  const formData = new FormData();
  formData.append("idUser", idUser);

  try {
    const response = await axios.post("http://localhost/api/get-user-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Imagen de usuario obtenida:" , response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    throw new Error("Error al obtener la imagen");
  }
};
