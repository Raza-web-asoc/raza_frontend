import { useEffect, useState } from "react";
import { getPetImages } from "../../services/imagesServices/petImagesService.js";

const CardPet = ({ pet }) => {
  const [petImages, setPetImages] = useState([]);

  useEffect(() => {
    const fetchPetImages = async () => {
      try {
        //const response = await getPetImages(pet.id_mascota);
        setPetImages(response || []);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        setPetImages([]);
      }
    };

    fetchPetImages();
  }, [pet.id_mascota]);

  const petPhoto =
    petImages.length > 0
      ? petImages[0]
      : "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg";
  return (
    <div className="w-40 h-60 bg-white shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-transform cursor-pointer">
      <img
        src={petPhoto}
        alt={pet.nombre_mascota}
        className="w-full h-40 object-cover"
      />
      <div className="p-3 text-gray-800">
        <h3 className="text-lg font-semibold">{pet.nombre_mascota}</h3>
        <p className="text-sm text-gray-500">{pet.nombre_especie} • {pet.nombre_raza}</p>
      </div>
    </div>
  );
};
export default CardPet;
