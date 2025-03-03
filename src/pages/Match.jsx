import ChoosePetModal from "../components/Match/ChoosePet.jsx";
import {getPets, getPetsToMakeMatch} from "../services/petsServices/getPetsService.js";
import { useState, useEffect } from "react";
import { profile } from "../services/profileService.js";
import CardPetMatch from "../components/Match/CardPetMatch.jsx";
import { getPetsByUser } from "../services/petsServices/getPetsService.js";
import { getInteractionsById } from "../services/matchsServices/getInteractions.js";

export default function Match() {
  const [animals, setAnimals] = useState([]); // Usamos animals para mantener las mascotas
  const [petSelectedInteractions, setPetSelectedInteractions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice para el animal actual
  const [petSelected, setPetSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = async () => {
    if (petSelected) {

      setIsModalOpen(false);

      let interactions = []
      interactions = await getInteractionsById(petSelected.id_mascota);
      setPetSelectedInteractions(interactions)

      let petsElectibleForMatch = []
      petsElectibleForMatch = await getPetsToMakeMatch(petSelected.id_usuario, petSelected.id_especie);
      //Filter with pets already interacted
      petsElectibleForMatch = petsElectibleForMatch.filter(pet => !interactions.some(interaction => interaction.id_mascota2 === pet.id_mascota));
      setAnimals(petsElectibleForMatch);


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

  return (
    <div>
      {isModalOpen && (
        <ChoosePetModal
          handleCloseModal={handleCloseModal}
          petSelected={petSelected}
          setPetSelected={setPetSelected}
          setPetSelectedInteractions={setPetSelectedInteractions}
          setAnimals={setAnimals}
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
