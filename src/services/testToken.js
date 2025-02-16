import axios from "axios";

export const fetchData = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await axios.get("http://localhost/api/prueba/", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener datos protegidos");
    throw new Error("Error al obtener datos protegidos");
  }
};
