import React, { useState, useEffect } from "react";
import { getChatsByPet, getUniqueChatByPets } from "../services/chatsServices/getChatsService";
import { sendMessage } from "../services/chatsServices/sendMessageService";
import ChoosePetModal from "../components/Match/ChoosePet";

const Chat = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petIds, setPetIds] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedPet) {
      const fetchChats = async () => {
        const chats = await getChatsByPet(selectedPet.id_mascota);
        setPetIds(chats);
      };
      fetchChats();
    }
  }, [selectedPet]);

  const selectChat = async (petId) => {
    const chat = await getUniqueChatByPets(selectedPet.id_mascota, petId);
    setChat(chat);
    setSelectedPetId(petId);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(selectedPet.id_mascota, selectedPetId, message);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white overflow-y-auto">
        <div className="p-4 text-lg font-bold bg-gray-900">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Seleccionar Mascota
          </button>
          {selectedPet && <p className="mt-4">Mascota: {selectedPet.nombre_mascota}</p>}
        </div>
        <div>
          {petIds.map((petId) => (
            <div
              key={petId}
              onClick={() => selectChat(petId)}
              className={`p-4 cursor-pointer border-b border-gray-700 ${
                selectedPetId === petId ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {petId}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <div className="flex-1 p-4 overflow-y-auto">
          {chat.length > 0 ? (
            chat.map((msg) => (
              <div key={msg.message_id} className="p-2 mb-2 bg-gray-200 rounded-lg max-w-xs">
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
            className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg"
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
