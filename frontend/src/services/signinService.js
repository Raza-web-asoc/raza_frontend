import axios from "axios";

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost/api/signin", new URLSearchParams({
      username: username,
      password: password
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    
    const {access_token} = response.data
    localStorage.setItem("access_token", access_token)

  } catch (error) {
    throw new Error("Usuario o contraseña incorrecta");
  }
};
