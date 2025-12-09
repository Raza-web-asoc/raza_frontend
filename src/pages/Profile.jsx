import { useState, useEffect } from "react";
import { profile } from "../services/profileService.js";
import { getProfileImage } from "../services/imagesServices/profileImageService.js";
import { editProfile } from "../services/profileServices/editProfileService.js";
import Pets from "../components/PetsProfile.jsx";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userImage, setUserImage] = useState("src/assets/user.jpg");
  const [userInfo, setUserInfo] = useState({
    id: "",
    nombres: "",
    apellidos: "",
    correo: "",
    genero: "",
    fechaNacimiento: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profile();

        setUserInfo({
          id: data.id_user,
          nombres: data.names,
          apellidos: data.last_names,
          correo: data.email,
          genero: data.gender,
          fechaNacimiento: data.birthday,
        });

        let imageUrl;
        imageUrl = await getProfileImage(data.id_user);
        setUserImage(imageUrl);

      } catch (error) {
        console.error(error.message);
      }


    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await editProfile(
        userInfo.nombres,
        userInfo.apellidos,
        userInfo.correo,
        userInfo.fechaNacimiento,
        userInfo.genero
      );
      console.log("Usuario actualizado:", data);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <div className="bg-red-100 flex flex-col md:flex-row gap-y-4 md:gap-x-4 p-4 justify-center">
      <div className="w-full md:w-1/4 bg-rose-400 p-4 rounded-3xl flex flex-col text-white items-center">
        <img src={userImage} className="w-40 h-40 rounded-full mb-5" />
        <h2 className="profile-title text-lg font-bold">Información Personal</h2>
        <p>Nombres: {userInfo.nombres}</p>
        <p>Apellidos: {userInfo.apellidos}</p>
        <p>Correo: {userInfo.correo}</p>
        <p>
          Género:{" "}
          {userInfo.genero === "M"
            ? "Masculino"
            : userInfo.genero === "F"
            ? "Femenino"
            : "Otro"}
        </p>
        <p>Fecha nacimiento: {userInfo.fechaNacimiento}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-rose-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Editar Perfil
        </button>
      </div>

      {/* Mascotas*/}
      <Pets userId={userInfo.id} />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Editar Información</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium">
                Nombres:
                <input
                  type="text"
                  name="nombres"
                  className="block w-full p-2 border rounded mt-1"
                  value={userInfo.nombres}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Apellidos:
                <input
                  type="text"
                  name="apellidos"
                  className="block w-full p-2 border rounded mt-1"
                  value={userInfo.apellidos}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Correo:
                <input
                  type="email"
                  name="correo"
                  className="block w-full p-2 border rounded mt-1"
                  value={userInfo.correo}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Género:
                <select
                  name="genero"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  value={userInfo.genero}
                  onChange={handleChange}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="Otro">Bombastik</option>
                </select>
              </label>
              <label>
                Fecha nacimiento:
                <input
                  name="fechaNacimiento"
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  type="date"
                  value={userInfo.fechaNacimiento}
                  onChange={handleChange}
                />
              </label>

              {/* Botones */}
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
