import {createMatch} from "../../services/matchsServices/createMatchService.js";
import { createChat } from "../../services/chatsServices/createChatsService.js";

const CardPetMatch = ({ pet, petSelected, handleLikeDislike }) => {

    const petPhoto = pet.foto ? pet.foto : "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg";


    const sendMatchToPetLike = async (pet) => {
        // Aquí hacemos el match y hacemos el registro en la BD
        console.log("Like", pet.nombre_mascota);
        try{


            const responseMatch = await createMatch({
                idmascota1: petSelected.id_mascota,
                idmascota2: pet.id_mascota,
                match: 1
            });
            const responseChat = await createChat(petSelected.id_mascota, 
                pet.id_mascota
            );
            
            alert("Match creado. Ya puedes hablar con el dueño a traves del chat");
        }catch (error){
            console.error(error);
        }

        handleLikeDislike(); // Avanzamos al siguiente animal
    }

    const sendMatchToPetDislike = async (pet) => {
        // Aquí hacemos el no-match y hacemos el registro en la BD
        console.log("Dislike", pet.nombre_mascota);
        handleLikeDislike(); // Avanzamos al siguiente animal
    }

    return (
        <div className="w-96 rounded-xl h-max bg-black text-white">
            <img
                src={petPhoto}
                alt={pet.nombre_mascota}
                className="w-96 h-96 object-cover rounded-lg mx-auto"
            />
            <div className="p-3">
                <div className="flex flex-wrap  space-x-3">
                    <div>
                        <p className="text-lg font-bold">
                            <strong>Nombre:</strong> {pet.nombre_mascota}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Especie:</strong> {pet.nombre_especie}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>Raza:</strong> {pet.nombre_raza}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center space-x-3 mt-3">
                    <div className="text-center">
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={() => sendMatchToPetDislike(pet)}
                        >
                            Dislike
                        </button>
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={() => sendMatchToPetLike(pet)}
                        >
                            Like
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CardPetMatch;