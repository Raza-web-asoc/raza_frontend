import ChoosePetModal from "../components/Match/ChoosePet.jsx";
import { getPets } from "../services/petsServices/getPetsService.js";
import { useState, useEffect } from "react";
import { profile } from "../services/profileService.js";
import CardPetMatch from "../components/Match/CardPetMatch.jsx";
import { getPetsByUser } from "../services/petsServices/getPetsService.js";
import { getInteractionsById } from "../services/matchsServices/getInteractions.js";

export default function Match() {
  const [animals, setAnimals] = useState([]); // Usamos animals para mantener las mascotas
  const [currentIndex, setCurrentIndex] = useState(0); // Índice para el animal actual
  const [petSelected, setPetSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    if (petSelected) {
      setIsModalOpen(false);
    }
  };

  const nextPet = () => {
    // Aumentamos el índice para pasar a la siguiente mascota
    if (currentIndex < animals.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("No hay más mascotas");
    }
  };
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const userData = await profile();
        const allPets = await getPets();
        let interactions = [];

        if (petSelected) {
          interactions = await getInteractionsById(petSelected.id_mascota);
        }

        const ownPets = await getPetsByUser(userData.id_user);
        const pets = allPets.filter(
          (item1) =>
            !ownPets.some((item2) => item2.id_mascota === item1.id_mascota) &&
            !interactions.some((interaction) => interaction.id_mascota2 === item1.id_mascota)
        );

        console.log("PETS:", pets);
        setAnimals(pets);
      } catch (error) {
        setAnimals([]);
        console.error(error);
      }
    };

    fetchAnimals();
  }, [petSelected]);

  return (
    <div>
      {isModalOpen && (
        <ChoosePetModal
          handleCloseModal={handleCloseModal}
          petSelected={petSelected}
          setPetSelected={setPetSelected}
        />
      )}

      {!isModalOpen && (
        <div className="h-full min-w-full flex justify-center items-center">
          <div className="px-32 py-32 space-x-3 flex">
            {animals.length > 0 && currentIndex < animals.length ? (
              <div className="animal-item">
                <CardPetMatch
                  pet={animals[currentIndex]}
                  petSelected={petSelected}
                  nextPet={nextPet}
                />
              </div>
            ) : (
              <p>No se encontraron mascotas.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
