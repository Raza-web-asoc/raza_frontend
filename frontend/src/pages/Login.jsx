import { useState } from "react";
import { login } from "../services/signinService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/profile")
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Bienvenido de vuelta</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">Por favor ingresa tus credenciales</p>
          <form onSubmit={handleSubmit} className="mt-8">
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
            <div className="mt-8 flex justify-between items-center">
              <button className="font-medium text-base text-violet-600">¿Has olvidado tu contraseña?</button>
            </div>

            <div className="mt-8 flex flex-col">
              <button
                type="submit"
                className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-600 text-white text-lg font-bold">
                Ingresar
              </button>
            </div>
          </form>
          <div className="mt-8 flex justify-center item-center">
            <p className="font-medium text-base">¿No tienes una cuenta?</p>
            <button
              className="text-violet-600 text-base font-medium ml-2"
              onClick={() => navigate("/signup")}
            >Registrate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
