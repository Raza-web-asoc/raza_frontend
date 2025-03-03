import React, { useState, useEffect } from "react";
import { profile } from "../../services/profileService.js";
import { getPetsByUser } from "../../services/petsServices/getPetsService.js";
import CardPet from "./CardPet.jsx";

const ChoosePetModal = ({ handleCloseModal, petSelected, setPetSelected, setPetSelectedInteractions, setAnimals }) => {
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const userData = await profile();
        const pets = await getPetsByUser(userData.id_user);
        setUserPets(pets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPets();
  }, []);

  const handlePetSelection = (pet) => {
    setPetSelected(pet); // Guarda la mascota seleccionada

  };

  return (
    <div className="bg-gray-800 bg-opacity-50 min-h-screen min-w-full flex justify-center items-center">
      <div className="w-max mt-12 bg-white rounded">
        <div className="py-5 px-10">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Elige una mascota</h2>
          </div>
          <div className="flex flex-wrap justify-center">
            {userPets.map((pet) => (
              <div
                key={pet.id_mascota}
                className="m-2"
                onClick={() => handlePetSelection(pet)}
              >
                <CardPet pet={pet} cardSize={"small"} />
              </div>
            ))}
          </div>
          <div>
            <p>
              mascota seleccionada:{" "}
              {petSelected ? petSelected.nombre_mascota : "Ninguna"}
            </p>
          </div>
          <div className="text-center mt-3">
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoosePetModal;
