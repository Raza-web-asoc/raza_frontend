/**
 * Signup con Google: autentica con el backend y guarda token + info del usuario
 */
export const signupWithGoogle = async (googleToken) => {
  try {
    // 1. Enviar token de Google al backend
    const authRes = await fetch(
      `${import.meta.env.VITE_AUTH_BASE_URL || "http://localhost:8000"}/auth/google/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
      }
    );

    if (!authRes.ok) {
      const errorData = await authRes.json();
      throw new Error(errorData.detail || "Error al registrarse con Google");
    }

    const authData = await authRes.json();
    const accessToken = authData.access_token;

    if (!accessToken) {
      throw new Error("No se recibió token del servidor");
    }

    // 2. Guardar token en localStorage
    localStorage.setItem("access_token", accessToken);

    // 3. Guardar info básica del usuario si viene en la respuesta
    if (authData.user) {
      localStorage.setItem("user", JSON.stringify(authData.user));
    }

    return { accessToken, user: authData.user };
  } catch (error) {
    throw error;
  }
};
