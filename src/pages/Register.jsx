import { useState, useEffect } from "react";
import { register } from "../services/signupService.js";
import { signupWithGoogle } from "../services/googleSignupService.js";
import { uploadUserImage } from "../services/imagesServices/profileImageService.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Ejemplo de validación: al menos 6 caracteres y una mayuscula
    const re = /^(?=.*[A-Z]).{6,}$/;
    return re.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return;
    }

    try {
      const data = await register(
        username,
        names,
        lastNames,
        email,
        password,
        birthday,
        gender
      );

      if (image) {
        await uploadUserImage(data.idUser, image);
      }

      navigate("/signin");
    } catch (error) {
      setError(error);
      console.error("Error al registrar el usuario:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // ---------- GOOGLE SIGNUP LOGIC ----------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 
          "699512703471-goibs25j51ecsls18oqg04jpfv9ns3e0.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      const container = document.getElementById("google-signup-button");
      if (container) {
        google.accounts.id.renderButton(container, { 
          theme: "outline", 
          size: "large", 
          shape: "rectangular", 
          logo_alignment: "left" 
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      await signupWithGoogle(response.credential);
      // Redirigir al signin igual que signup normal
      navigate("/signin");
    } catch (err) {
      console.error("Error signup Google:", err);
      setError(err.message || "Error al registrarse con Google");
    }
  };
  // -----------------------------------------

  return (
    <div className="flex w-full bg-red-100">
      <div className="w-full flex items-center justify-center">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Crea una cuenta!</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Ingresa tus datos
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            {/* --- Campos de registro --- */}
            <div>
              <label className="text-lg font-medium">Nombre de usuario</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Ingresa un nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-lg font-medium">Nombre</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Ingresa tu nombre"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-lg font-medium">Apellido</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Ingresa tu apellido"
                value={lastNames}
                onChange={(e) => setLastNames(e.target.value)}
                required
              />
            </div>

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
            {!validatePassword(password) && password.length > 0 && (
              <p className="text-red-600 mt-2">
                La contraseña debe tener al menos 6 caracteres y una letra mayúscula.
              </p>
            )}

            <div>
              <label className="text-lg font-medium">Fecha de nacimiento</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Selecciona tu fecha"
                value={birthday}
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-lg font-medium">Género</label>
              <select
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>
                  Selecciona tu género
                </option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="Otro">Bombastik</option>
              </select>
            </div>

            <div>
              <label className="text-lg font-medium">Foto de perfil</label>
              <input
                type="file"
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                onChange={handleImageChange}
              />
            </div>
            {/* --- Fin campos de registro --- */}

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <div className="mt-8 flex justify-between items-center">
              <button className="font-medium text-base text-rose-500">
                ¿Has olvidado tu contraseña?
              </button>
            </div>

            <div className="mt-8 flex flex-col">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-rose-500 text-white text-lg font-bold"
              >
                Ingresar
              </button>
            </div>

            {/* --- Botón de Google Sign-Up --- */}
            <div className="mt-6 flex justify-center">
              <div id="google-signup-button"></div>
            </div>

            <div className="mt-8 flex justify-center item-center">
              <p className="font-medium text-base">¿ya tienes una cuenta?</p>
              <button
                className="text-pink-600 text-base font-medium ml-2"
                onClick={() => navigate("/signin")}
              >
                Inicia sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
