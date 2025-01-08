import { useEffect, useState } from "react";
import { getPets } from "../services/petsServices/getPetsService";
import { createPet } from "../services/petsServices/createPetService";
import { getBreeds } from "../services/breedServices/getBreedsService";
import { getSpecies } from "../services/speciesServices/getSpeciesService";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPet, setNewPet] = useState({
    nombre_mascota: "",
    id_especie: "",
    id_raza: "",
    sexo: "",
    fecha_nacimiento: "",
  });

  useEffect(() => {
    const fetchPetsAndOptions = async () => {
      try {
        const petsResponse = await getPets();
        const speciesResponse = await getSpecies();
        const breedsResponse = await getBreeds();
        setPets(petsResponse.data);
        setSpecies(speciesResponse.data);
        setBreeds(breedsResponse.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPetsAndOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  const handleSavePet = async (e) => {
    e.preventDefault();
    try {
      const { nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento } = newPet;
      const response = await createPet(nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento);
      setPets([...pets, response.data]);
      setNewPet({
        nombre_mascota: "",
        id_especie: "",
        id_raza: "",
        sexo: "",
        fecha_nacimiento: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar mascota:", error);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-green-200 p-4 rounded">
      <h2 className="text-lg font-bold">Mascotas</h2>
      <div className="flex flex-wrap gap-4">
        {pets.map((pet) => (
          <div
            key={pet.id_mascota}
            className="relative bg-black text-white p-4 rounded-lg w-full md:w-1/3 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-lg font-bold">{pet.nombre_mascota}</p>
            </div>
            <p>
              <strong>Especie:</strong> {species.find(s => s.id_especie === pet.id_especie)?.nombre_especie || "Desconocida"}
            </p>
            <p>
              <strong>Raza:</strong> {breeds.find(b => b.id_especie === pet.id_especie && b.id_raza === pet.id_raza)?.nombre_raza || "Desconocida"}
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
            <h2 className="text-xl font-bold mb-4">Registrar Mascota</h2>
            <form onSubmit={handleSavePet}>
              <label className="block mb-2 text-sm font-medium">
                Nombre:
                <input
                  type="text"
                  name="nombre_mascota"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.nombre_mascota}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block mb-2 text-sm font-medium">
                Especie:
                <select
                  name="id_especie"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.id_especie}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  {species.map((specie) => (
                    <option key={specie.id_especie} value={specie.id_especie}>
                      {specie.nombre_especie}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2 text-sm font-medium">
                Raza:
                <select
                  name="id_raza"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.id_raza}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  {breeds.map((breed) => (
                    <option key={breed.id_raza} value={breed.id_raza}>
                      {breed.nombre_raza}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2 text-sm font-medium">
                Sexo:
                <select
                  name="sexo"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.sexo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="M">Macho</option>
                  <option value="F">Hembra</option>
                </select>
              </label>
              <label className="block mb-2 text-sm font-medium">
                Fecha de Nacimiento:
                <input
                  type="date"
                  name="fecha_nacimiento"
                  className="block w-full p-2 border rounded mt-1"
                  value={newPet.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
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
