import { useEffect, useState } from "react";
import { getPetImages } from "../../services/imagesServices/petImagesService.js";

const CardPet = ({ pet }) => {
  const [petImages, setPetImages] = useState([]);

  useEffect(() => {
    const fetchPetImages = async () => {
      try {
        const response = await getPetImages(pet.id_mascota);
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
    <div className=" w-32 h-full bg-black text-white rounded-xl hover:cursor-pointer">
      <img
        src={petPhoto}
        alt={pet.nombre_mascota}
        className=" w-32 h-32 object-cover rounded-lg mx-auto"
      />
      <div className="p-3">
        <p className="text-lg font-bold">{pet.nombre_mascota}</p>
        <p>
          <strong>Especie:</strong> {pet.nombre_especie + "asdsa"}
        </p>
        <p>
          <strong>Raza:</strong> {pet.nombre_raza}
        </p>
      </div>
    </div>
  );
};
export default CardPet;
