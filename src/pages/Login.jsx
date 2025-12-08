import { useState, useEffect, useRef } from "react";
import { login } from "../services/signinService.js";
import { loginWithGoogle } from "../services/googleSigninService.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar script de Google
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "699512703471-goibs25j51ecsls18oqg04jpfv9ns3e0.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      // Renderiza el botón dentro del contenedor referenciado
      if (googleButtonRef.current) {
        google.accounts.id.renderButton(
          googleButtonRef.current,
          { theme: "outline", size: "large", shape: "rectangular", logo_alignment: "left" }
        );
      }
    };

    return () => {
      // opcional: cleanup script si quieres desmontar
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    console.log("Google credential received");
    try {
      await loginWithGoogle(response.credential);
      // Redirigir al home igual que login normal
      window.location.href = "/";
    } catch (err) {
      console.error("Error login Google:", err);
      setError(err.message || "Error al iniciar sesión con Google");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/";
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Bienvenido de vuelta</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">Por favor ingresa tus credenciales</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-lg font-medium">Email</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div>
              <label className="text-lg font-medium">Contraseña</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 text-white text-lg font-bold hover:scale-[1.01] active:scale-[.98] transition-all"
            >
              Ingresar
            </button>
          </form>

          {/* Contenedor para botón Google */}
          <div className="mt-6 flex justify-center">
            <div ref={googleButtonRef}></div>
          </div>

          <div className="mt-8 flex justify-center items-center">
            <p className="font-medium text-base">¿No tienes una cuenta?</p>
            <button
              className="text-violet-600 text-base font-medium ml-2"
              onClick={() => navigate("/signup")}
            >
              Registrate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
