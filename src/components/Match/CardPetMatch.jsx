import { handleSwipe } from "../../services/matchsServices/createMatchService.js";
import { createChat } from "../../services/chatsServices/createChatsService.js";
import { getPetImages } from "../../services/imagesServices/petImagesService.js";
import { useEffect, useState } from "react";
import { getPetById } from "../../services/petsServices/getPetsService.js";

const CardPetMatch = ({ pet, petSelected, nextPet }) => {
	const [petImages, setPetImages] = useState([]);
	const [likeOrDislike, setLikeOrDislike] = useState("");

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

	const petPhoto =
		petImages.length > 0
			? petImages[0]
			: "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg";

	const handleLikeOrDislikeButton = async (pet, type_interaccion) => {
		try {
			const responseMatch = await handleSwipe({
				id_mascota1: petSelected.id_mascota,
				id_mascota2: pet.id_mascota,
				tipo_interaccion: type_interaccion,
			});
			// ver si en el body de la respuesta dice si existe la propiedad match y si es un true
			if (responseMatch.match) {
				alert("Match creado. Ya puedes hablar con el dueño a traves del chat");
				await createChat(petSelected.id_mascota, pet.id_mascota);
			} else {
				alert("Espera a que la otra persona también de like");
			}
		} catch (error) {
			console.error(error);
		}

		nextPet();
	};

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
							onClick={() => {
								handleLikeOrDislikeButton(pet, "dislike");
							}}
						>
							Dislike
						</button>
					</div>
					<div className="text-center">
						<button
							className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
							onClick={() => {
								handleLikeOrDislikeButton(pet, "like");
							}}
						>
							Like
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CardPetMatch;
