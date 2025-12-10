import ChoosePetModal from "../components/Match/ChoosePet.jsx";
import {
  getPets,
  getPetsToMakeMatch,
} from "../services/petsServices/getPetsService.js";
import { useState, useEffect } from "react";
import CardPetMatch from "../components/Match/CardPetMatch.jsx";
import { getInteractionsById } from "../services/matchsServices/getInteractions.js";
import { motion, AnimatePresence } from "framer-motion";


export default function Match() {
  const [animals, setAnimals] = useState([]); // Usamos animals para mantener las mascotas
  const [petSelectedInteractions, setPetSelectedInteractions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice para el animal actual
  const [petSelected, setPetSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = async () => {
    if (petSelected) {
      setIsModalOpen(false);

      let interactions = [];
      interactions = await getInteractionsById(petSelected.id_mascota);
      setPetSelectedInteractions(interactions);

      let petsElectibleForMatch = [];
      petsElectibleForMatch = await getPetsToMakeMatch(
        petSelected.id_usuario,
        petSelected.id_especie
      );
      //Filter with pets already interacted
      petsElectibleForMatch = petsElectibleForMatch.filter(
        (pet) =>
          !interactions.some(
            (interaction) => interaction.id_mascota2 === pet.id_mascota
          )
      );
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
    <div
      style={{
        backgroundImage:
          "url('https://img.freepik.com/vector-gratis/vector-diseno-fondo-patron-impresion-pata-animal-salvaje-divertido_1017-47618.jpg')",
      }}
    >
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
        <div
          className="h-full min-w-full flex justify-center items-center"
          data-testid="match-view"
        >
          <div className="px-32 py-32 flex items-center gap-10">

            {animals.length > 0 && currentIndex < animals.length ? (
              <div className="relative w-[500px] h-[600px]">

                {/* Tarjeta anterior (izquierda) */}
                {animals[currentIndex - 1] && (
                  <motion.div
                    key={`prev-${currentIndex - 1}`}
                    initial={{ opacity: 0, x: -150, scale: 0.8 }}
                    animate={{ opacity: 0.3, x: -420, scale: 0.85 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 pointer-events-none z-0"
                  >
                    <CardPetMatch
                      pet={animals[currentIndex - 1]}
                      petSelected={petSelected}
                      disabled
                    />
                  </motion.div>
                )}

                {/* Tarjeta principal (drag real) */}
                <AnimatePresence>
                  <motion.div
                    key={`current-${currentIndex}`}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(e, info) => {
                      if (info.offset.x < -120) {
                        // Swipe LEFT
                        nextPet(); // tu lógica de pasar a la siguiente mascota
                      }
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, x: -300, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-0 z-20 cursor-grab active:cursor-grabbing"
                  >
                    <CardPetMatch
                      pet={animals[currentIndex]}
                      petSelected={petSelected}
                      nextPet={nextPet}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Tarjeta siguiente (derecha → centro) */}
                {animals[currentIndex + 1] && (
                  <motion.div
                    key={`next-${currentIndex + 1}`}
                    initial={{ opacity: 0, x: 300, scale: 0.8 }}
                    animate={{ opacity: 0.5, x: 430, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-0 pointer-events-none z-10"
                  >
                    <CardPetMatch
                      pet={animals[currentIndex + 1]}
                      petSelected={petSelected}
                      disabled
                    />
                  </motion.div>
                )}

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
