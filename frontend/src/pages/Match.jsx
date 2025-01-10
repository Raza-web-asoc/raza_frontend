
import choosePetModal from '../components/Match/ChoosePet.jsx';
import { useState } from 'react';

export default function Match() {

    const [animals, setAnimals] = useState([]);
    const [petSelected, setPetSelected] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Elige una mascota</h2>
                        <button onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    )
}