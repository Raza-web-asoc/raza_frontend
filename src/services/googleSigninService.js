import { gql } from '@apollo/client';
import client from '../apolloClient.jsx';

/**
 * Login con Google: autentica con el backend y guarda token + info del usuario
 */
export const loginWithGoogle = async (googleToken) => {
  try {
    // 1. Enviar token de Google al backend
    const authRes = await fetch("http://localhost:8000/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: googleToken }),
    });

    if (!authRes.ok) {
      const errorData = await authRes.json();
      throw new Error(errorData.detail || "Error en autenticación con Google");
    }

    const authData = await authRes.json();
    const accessToken = authData.access_token;

    if (!accessToken) {
      throw new Error("No se recibió token del servidor");
    }

    // 2. Guardar token en localStorage
    localStorage.setItem("access_token", accessToken);

    // 3. Traer datos del usuario (igual que en login normal)
    const userData = await getUserDataAfterLogin(accessToken);

    // 4. Guardar datos del usuario en localStorage (opcional, para acceso rápido)
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return { accessToken, userData };
  } catch (error) {
    throw error;
  }
};

/**
 * Obtener datos del usuario después del login
 */
async function getUserDataAfterLogin(token) {
  const USER_QUERY = gql`
    query getUserData($token: String!) {
      getUserData(token: $token) {
        id_user
        username
        email
        names
        last_names
        birthday
        gender
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: USER_QUERY,
      variables: { token },
    });
    return data.getUserData;
  } catch (error) {
    console.warn("No se pudo traer datos del usuario:", error.message);
    // No fallar si no se puede traer info adicional, solo retornar null
    return null;
  }
}
