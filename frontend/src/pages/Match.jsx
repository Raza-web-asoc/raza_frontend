import ChoosePetModal from '../components/Match/ChoosePet.jsx';
import { getPets } from '../services/petsServices/getPetsService';
import { useState, useEffect } from 'react';
import { profile } from "../services/profileService.js";
import CardPetMatch from "../components/Match/CardPetMatch.jsx";
import { getPetsByUser } from '../services/petsServices/getPetsService';

export default function Match() {
    const [animals, setAnimals] = useState([]);  // Usamos animals para mantener las mascotas
    const [currentIndex, setCurrentIndex] = useState(0); // Índice para el animal actual
    const [petSelected, setPetSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCloseModal = () => {
        if (petSelected) {
            setIsModalOpen(false);
        }
    };

    const handleLikeDislike = () => {
        // Aumentamos el índice para pasar a la siguiente mascota
        if (currentIndex < animals.length ) {
            setCurrentIndex(currentIndex + 1);
        } else {
            console.log('No hay más mascotas');
        }
    };

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const { data } = await profile();
                const allPets = await getPets();
                const ownPets = await getPetsByUser(data.id_user);
                const allPets_data = allPets.data;
                const pets = allPets_data.filter(item1 => !ownPets.some(item2 => item2.id_mascota === item1.id_mascota));
                console.log("PETS:",pets)
                setAnimals(pets || []);
            } catch (error) {
                setAnimals([]);
                console.error(error);

            }
        };

        fetchAnimals();
    }, []);

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
                                    handleLikeDislike={handleLikeDislike}
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