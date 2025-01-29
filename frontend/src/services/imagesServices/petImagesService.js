import axios from "axios";

export const uploadPetImage = async (idPet, images) => {
  const formData = new FormData();
  formData.append("idPet", idPet);
  images.forEach((foto) => {
    formData.append('files', foto);
  });

  try {
    await axios.post("http://localhost:8002/upload-pet-images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Imagenes subidas con éxito");
  } catch (error) {
    console.error("Error al subir las imagenes:", error);
    throw new Error("Error al subir las imagenes");
  }
};

export const getPetImages = async (idPet) => {
  try {
    // Realiza la solicitud GET con el parámetro idPet en la URL
    const response = await axios.get("http://localhost/api/get-pet-images", {
      params: { idPet }, // Enviar idPet como query parameter
    });

    console.log("Imagenes de mascota obtenidas:", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las imagenes de la mascota:", error);
    throw new Error("Error al obtener las imagenes de la mascota");
  }
};

