import axios from "axios";

export const createPet= async (nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  console.log(nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento)
  try {
    const response = await axios.post(
      "http://localhost/api/pets/mascotas/registrar",
      {nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento},
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


