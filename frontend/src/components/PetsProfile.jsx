import { useEffect, useState } from "react";
import { getPets } from "../services/petsServices/getPetsService";
import { createPet } from "../services/petsServices/createPetService";
import { getBreeds } from "../services/breedServices/getBreedsService";
import { getSpecies } from "../services/speciesServices/getSpeciesService";
import { uploadPetImage } from "../services/imagesServices/petImagesService";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga de datos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPet, setNewPet] = useState({
    nombre_mascota: "",
    id_especie: "",
    id_raza: "",
    sexo: "",
    fecha_nacimiento: "",
    fotos: [], 
  });
  const [imagePreviews, setImagePreviews] = useState([]); // Estado para almacenar vistas previas de las imágenes

  useEffect(() => {
    const fetchPetsAndOptions = async () => {
      try {
        const petsResponse = await getPets();
        const speciesResponse = await getSpecies();
        const breedsResponse = await getBreeds();
        
        setPets(petsResponse.data || []); // Verifica que pets tenga datos
        setSpecies(speciesResponse.data || []); // Verifica que species tenga datos
        setBreeds(breedsResponse.data || []); // Verifica que breeds tenga datos
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false); // Al finalizar la carga, cambia el estado de loading a false
      }
    };

    fetchPetsAndOptions();
  }, []);

  if (isLoading) {
    return <p>Cargando mascotas...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPet({ ...newPet, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newPhotos = Array.from(files);
    setNewPet({ ...newPet, fotos: [...newPet.fotos, ...newPhotos] });

    // Generar vistas previas de las imágenes seleccionadas
    const previewUrls = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        previewUrls.push(reader.result);
        if (previewUrls.length === files.length) {
          setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = newPet.fotos.filter((_, i) => i !== index); 
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setNewPet({ ...newPet, fotos: newPhotos });
    setImagePreviews(newPreviews);
  };

  const handleSavePet = async (e) => {
    e.preventDefault();
    try {
      const { nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento, fotos } = newPet;
      
      const response = await createPet(nombre_mascota, id_especie, id_raza, sexo, fecha_nacimiento);
      await uploadPetImage(response.data.id_mascota, fotos);
      setPets([...pets, response.data]); // Se agrega la nueva mascota a la lista de mascotas
      setNewPet({
        nombre_mascota: "",
        id_especie: "",
        id_raza: "",
        sexo: "",
        fecha_nacimiento: "",
        fotos: [],
      });
      setImagePreviews([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar mascota:", error);
    }
  };

  return (
    <div className="w-full md:w-1/2 bg-green-200 p-4 rounded">
      <h2 className="text-lg font-bold">Mascotas</h2>
      <div className="flex flex-wrap gap-4">
        {pets && pets.length > 0 ? (
          pets.map((pet) => (
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
          ))
        ) : (
          <p>No hay mascotas disponibles.</p>
        )}
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
              <label className="block mb-2 text-sm font-medium">
                Fotos:
                <input
                  type="file"
                  name="fotos"
                  accept="image/*"
                  className="block w-full p-2 border rounded mt-1"
                  multiple
                  onChange={handleFileChange}
                />
              </label>

              <div className="mt-4 flex gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Vista previa ${index + 1}`}
                      className="w-20 h-20 object-contain rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>

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
