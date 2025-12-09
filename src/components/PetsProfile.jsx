import { useEffect, useState } from "react";
import { getPets } from "../services/petsServices/getPetsService.js";
import { createPet } from "../services/petsServices/createPetService.js";
import {getBreeds, getBreedsBySpecie} from "../services/breedServices/getBreedsService.js";
import { getSpecies } from "../services/speciesServices/getSpeciesService.js";
import { uploadPetImage } from "../services/imagesServices/petImagesService.js";
import { getPetImages } from "../services/imagesServices/petImagesService.js";
import { profile } from "../services/profileService.js";
import { getPetsByUser } from "../services/petsServices/getPetsService.js";

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga de datos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petImages, setPetImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
        const data = await profile();
        const petsResponse = await getPetsByUser(data.id_user);
        const speciesResponse = await getSpecies();
        setPets(petsResponse || []);
        setSpecies(speciesResponse || []);

        const imagesPromises = petsResponse.map(async (pet) => {
          try {
            const response = await getPetImages(pet.id_mascota);
            return { [pet.id_mascota]: response || [] };
          } catch {
            return { [pet.id_mascota]: [] };
          }
        });

        const imagesResults = await Promise.all(imagesPromises);
        const imagesMap = Object.assign({}, ...imagesResults);
        setPetImages(imagesMap);

        const initialIndexes = Object.keys(imagesMap).reduce((acc, petId) => {
          acc[petId] = 0;
          return acc;
        }, {});
        setCurrentImageIndex(initialIndexes);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetsAndOptions();
  }, []);

  const handleNextImage = (petId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [petId]: (prev[petId] + 1) % petImages[petId].length,
    }));
  };

  const handlePreviousImage = (petId) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [petId]:
        (prev[petId] - 1 + petImages[petId].length) % petImages[petId].length,
    }));
  };

  if (isLoading) {
    return <p>Cargando mascotas...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  const handleChange = async (e) => {


    const {name, value} = e.target;

    if (name === "id_especie") {
      const breedsResponse = await getBreedsBySpecie(parseInt(value, 10));
      setBreeds(breedsResponse || []);
    }

    setNewPet({
      ...newPet,
      [name]:
          name === "id_especie" || name === "id_raza"
              ? parseInt(value, 10)
              : value,
    });
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
      const {
        nombre_mascota,
        id_raza,
        sexo,
        fecha_nacimiento,
        fotos,
      } = newPet;

      // Crear la nueva mascota
      const response = await createPet(
        nombre_mascota,
        id_raza,
        sexo,
        fecha_nacimiento
      );

      // Subir imágenes asociadas a la nueva mascota
      //await uploadPetImage(response.id_mascota, fotos);

      // Actualizar la lista de mascotas
      const updatedPets = [...pets, response];
      setPets(updatedPets);

      // Obtener imágenes para todas las mascotas nuevamente
      /*
      const imagesPromises = updatedPets.map(async (pet) => {
        try {
          const response = await getPetImages(pet.id_mascota);
          return { [pet.id_mascota]: response || [] };
        } catch {
          return { [pet.id_mascota]: [] };
        }
      }); */

      //const imagesResults = await Promise.all(imagesPromises);
      //const imagesMap = Object.assign({}, ...imagesResults);
      //setPetImages(imagesMap);
      //console.log("Imagenes de mascotas actualizadas:", petImages);

      // Resetear los índices de las imágenes actuales
      /*
      const initialIndexes = Object.keys(imagesMap).reduce((acc, petId) => {
        acc[petId] = 0;
        return acc;
      }, {});
      setCurrentImageIndex(initialIndexes);
      */

      // Resetear el formulario
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
    <div className="w-full md:w-1/2 bg-rose-300 p-4 rounded">
      <h2 className="text-lg font-bold">Mascotas</h2>
      <div className="flex flex-wrap gap-4">
        {pets && pets.length > 0 ? (
          pets.map((pet, index) => (
            <div
              key={pet.id_mascota || index}
              data-pet-id={pet.id_mascota}
              className="relative bg-rose-500 text-white p-4 rounded-lg w-full md:w-1/3 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <p className="text-lg font-bold">{pet.nombre_mascota}</p>
              </div>
              <p>
                <strong>Especie:</strong>{" "}
                {pet.nombre_especie || "Desconocida"}
              </p>
              <p>
                <strong>Raza:</strong>{" "}
                {pet.nombre_raza || "Desconocida"}
              </p>

              {/* Sección de imágenes */}
              {petImages[pet.id_mascota]?.length > 0 ? (
                <div className="mt-4">
                  <div className="relative">
                    <img
                      src={
                        petImages[pet.id_mascota][
                          currentImageIndex[pet.id_mascota]
                        ]
                      }
                      alt={`Imagen de ${pet.nombre_mascota}`}
                      className="w-full h-48 object-contain rounded"
                    />
                    <button
                      onClick={() => handlePreviousImage(pet.id_mascota)}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black rounded-full p-2 hover:bg-gray-400"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => handleNextImage(pet.id_mascota)}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black rounded-full p-2 hover:bg-gray-400"
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4">No hay imágenes disponibles.</p>
              )}
            </div>
          ))
        ) : (
          <p>No hay mascotas disponibles.</p>
        )}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-rose-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Registrar Mascota
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Formulario de registro mascota</h2>
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
                  {species.map((specie, index) => (
                    <option
                      key={specie.id_especie || index}
                      value={specie.id_especie}
                    >
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
                  disabled={breeds.length === 0}
                >
                  <option value="">Seleccionar</option>
                  {breeds.map((breed, index) => (
                    <option key={breed.id_raza || index} value={breed.id_raza}>
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
              {false && (  <label className="block mb-2 text-sm font-medium">
                Fotos:
                <input
                  type="file"
                  name="fotos"
                  accept="image/*"
                  className="block w-full p-2 border rounded mt-1"
                  multiple
                  onChange={handleFileChange}
                />
              </label>)}
              

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
