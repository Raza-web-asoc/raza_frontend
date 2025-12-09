import { handleSwipe } from "../../services/matchsServices/createMatchService.js";
import { createChat } from "../../services/chatsServices/createChatsService.js";
import { getPetImages } from "../../services/imagesServices/petImagesService.js";
import { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";

const CardPetMatch = ({ pet, petSelected, nextPet }) => {
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

	const images = import.meta.glob('/src/assets/perros/*.{png,jpg,jpeg,webp}', {
		eager: true
		});

	const imageArray = Object.values(images).map((mod) => mod.default);


	const petPhoto =imageArray.length > 0
		? imageArray[Math.floor(Math.random() * imageArray.length)]
		: "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg";

	
	const handleLikeOrDislikeButton = async (pet, type_interaccion) => {
		try {
			const responseMatch = await handleSwipe({
				id_mascota1: petSelected.id_mascota,
				id_mascota2: pet.id_mascota,
				tipo_interaccion: type_interaccion,
			});

			if (responseMatch.match === "true") {
				alert("¡Match exitoso! Ya puedes hablar con el dueño a través del chat.");
				await createChat(petSelected.id_mascota, pet.id_mascota);
			}
		} catch (error) {
			console.error(error);
		}

		nextPet();
	};

	return (
		<div>
			<div className="w-96 max-w-sm shadow-lg rounded-2xl overflow-hidden flex mb-4">
				<img src={petPhoto} alt={pet.nombre_mascota} className="w-full h-96 object-cover" />
			</div>
			<div className="flex flex-col justify-center items-center p-4 text-gray-900 shadow-lg rounded-2xl bg-zinc-200">
				<h2 className="text-3xl font-bold my-2 truncate">{pet.nombre_mascota}</h2>
				<p className="text-lg mb-1">{pet.nombre_especie} • {pet.nombre_raza}</p>
				<div className="flex justify-between bottom-4 w-40 items-center py-4">
					<button
						className="bg-rose-800 p-4 rounded-full text-white shadow-lg hover:bg-red-600 transition-all"
						onClick={() => handleLikeOrDislikeButton(pet, "dislike")}
					>
						<X size={24} />
					</button>
					<button
						className="bg-rose-500 p-4 rounded-full text-white shadow-lg hover:bg-blue-600 transition-all"
						onClick={() => handleLikeOrDislikeButton(pet, "like")}
					>
						<Heart size={24} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardPetMatch;
