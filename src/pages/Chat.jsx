import React, { useState, useEffect } from "react";
import { getChatsByPet, getUniqueChatByPets } from "../services/chatsServices/getChatsService.js";
import { getPetById } from "../services/petsServices/getPetsService.js";
import { sendMessage } from "../services/chatsServices/sendMessageService.js";
import ChoosePetModal from "../components/Match/ChoosePet.jsx";

const Chat = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const getPetName = async (petId) => {
    const pet = await getPetById(petId);
    return pet.nombre_mascota;
  }

  useEffect(() => {
    if (selectedPet) {
      const fetchChats = async () => {
        const chats = await getChatsByPet(selectedPet.id_mascota);
        const petsData = await Promise.all(chats.map(async (petId) => {
          const petName = await getPetName(petId);
          return { id_mascota: petId, nombre_mascota: petName };
        }));
        setPets(petsData);
      };
      fetchChats();
    }
  }, [selectedPet]);

  const selectChat = async (petId) => {
    const chat = await getUniqueChatByPets(selectedPet.id_mascota, petId);
    setChat(chat);
    const pet = pets.find(pet => pet.id_mascota === petId);
    setSelectedPetId(pet.id_mascota);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await sendMessage(selectedPet.id_mascota, selectedPetId, selectedPet.id_mascota, message);
        setMessage(""); // Clear the message after sending
      } catch (error) {
        console.error("Error sending message:", error);
        // Optionally show an error message
      }
    }
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-300 text-white overflow-y-auto">
        <div className="p-4 text-lg font-bold bg-rose-400">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-600"
          >
            Seleccionar Mascota
          </button>
          {selectedPet && <p className="mt-4">Mascota: {selectedPet.nombre_mascota}</p>}
        </div>
        <div>
          {pets.length > 0 ? (
            pets.map((pet) => (
              <div
                key={pet.id_mascota}
                onClick={() => selectChat(pet.id_mascota)}
                className={`p-4 cursor-pointer border-b border-gray-700 ${selectedPetId === pet.id_mascota ? "bg-gray-700" : "hover:bg-gray-700"
                  }`}
              >
                {pet.nombre_mascota}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-20">Cargando mascotas...</div>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto">
          {chat.length > 0 ? (
            chat.map((msg) => (
              <div key={msg.message_id} className={`p-2 mb-2 ${msg.pet_id !== selectedPet.id_mascota ? "bg-gray-200" : "bg-blue-200"} rounded-lg max-w-xs ${msg.pet_id === selectedPet.id_mascota ? "self-end ml-auto" : ""}`}>
                {msg.message}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-20">Selecciona un chat para ver mensajes</div>
          )}
        </div>
        <div className="p-4 bg-gray-900 flex items-center">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-800 text-white focus:outline-none"
            placeholder="Escribe tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!selectedPetId}
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-rose-600 text-white px-4 py-2 rounded-lg"
            disabled={!selectedPetId || !message.trim()}
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ChoosePetModal
          handleCloseModal={() => setIsModalOpen(false)}
          petSelected={selectedPet}
          setPetSelected={setSelectedPet}
        />
      )}
    </div>
  );
};

export default Chat;
