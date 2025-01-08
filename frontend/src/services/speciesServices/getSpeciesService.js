import axios from "axios";

export const getSpecies= async () => {
  try {
    const response = await axios.get("http://localhost/api/pets/especies", {
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las especies");
  }
};