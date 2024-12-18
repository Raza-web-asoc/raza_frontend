import axios from "axios";

export const register = async (username, names, last_names, email, password,birthday, gender) => {
  try {
    const response = await axios.post("http://localhost/api/signup", {
      username,
      names,
      last_names,
      email,
      password,
      birthday,
      gender
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error al registrar:", error.response.data.detail);
      console.error("Código de estado:", error.response.status);
    } else {
      console.error("Error en la conexión:", error.message);
    }
    throw error.response.data.detail;
  }
};
