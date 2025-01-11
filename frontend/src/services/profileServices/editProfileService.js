import axios from "axios";

export const editProfile = async (names, last_names, email, birthday, gender) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  try {
    const response = await axios.put(
      "http://localhost/api/edit_profile",
      {
        names,
        last_names,
        email,
        birthday,
        gender
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error al actualizar el perfil");
  }
};
