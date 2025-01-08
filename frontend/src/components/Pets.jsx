import { useEffect, useState } from "react";
import { getPets } from "../services/petsServices/getPetsService";
import { updatePet } from "../services/petsServices/updatePetsService";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPet, setEditPet] = useState(null);
  const [newPet, setNewPet] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getPets();
        const { data } = response;
        setPets(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPets();
  }, []);

  // Manejar cambios en el formulario del modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  // Abrir modal para editar mascota
  const handleEdit = (pet, index) => {
    setEditPet(index);
    setNewPet({ ...pet }); // Prellenar el formulario con los datos de la mascota seleccionada
    setIsModalOpen(true);
  };

  // Guardar cambios en la mascota
  const handleSavePet = async (e) => {
    e.preventDefault();
    try {
      if (editPet !== null) {
        // Actualizar la mascota
        await updatePet(newPet); // Llamada a la función de actualización
        const updatedPets = [...pets];
        updatedPets[editPet] = newPet; // Actualizar la mascota editada
        setPets(updatedPets);
      } else {
        // Agregar nueva mascota
        await updatePet(newPet); // Llamada a la función para crear la nueva mascota
        setPets([...pets, newPet]);
      }
      setNewPet({ name: "", breed: "", age: "", gender: "" });
      setEditPet(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar mascota:", error);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-green-200 p-4 rounded">
      <h2 className="text-lg font-bold">Mascotas</h2>
      <div className="flex flex-wrap gap-4">
        {pets.map((pet, index) => (
          <div
            key={index}
            className="relative bg-black text-white p-4 rounded-lg w-full md:w-1/3 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-lg font-bold">{pet.nombre_mascota}</p>
              <button
                onClick={() => handleEdit(pet, index)}
                className="bg-gray-700 p-2 rounded-full hover:bg-gray-600"
                aria-label="Editar mascota"
              >
                ✏️
              </button>
            </div>
            <p>
              <strong>Nombre:</strong> {pet.nombre_mascota}
            </p>
            <p>
              <strong>Sexo:</strong> {pet.sexo}
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong> {pet.fecha_nacimiento}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Registrar Mascota
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              {editPet !== null ? "Editar Mascota" : "Registrar Mascota"}
            </h2>
            <form onSubmit={handleSavePet}>
              <label className="block mb-2 text-sm font-medium">
                Nombre:
                <input
                  type="text"
                  name="name"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.nombre_mascota}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Raza:
                <input
                  type="text"
                  name="breed"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.raza}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Fecha de nacimiento:
                <input
                  type="number"
                  name="age"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.fecha_nacimiento}
                  onChange={handleChange}
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Género:
                <select
                  name="gender"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.sexo}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="Macho">Macho</option>
                  <option value="Hembra">Hembra</option>
                </select>
              </label>
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
