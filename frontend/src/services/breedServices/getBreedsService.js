import axios from "axios";

export const getBreeds = async () => {
  try {
    const response = await axios.get("http://localhost/api/pets/razas", {
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las razas");
  }
};
