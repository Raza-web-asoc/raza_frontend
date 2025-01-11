
const CardPet = ({ pet }) => {


    const petPhoto = pet.foto ? pet.foto : "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg";

    return (
        <div className=" w-32 h-full bg-black text-white rounded-xl">
            <img
                src={petPhoto}
                alt={pet.nombre_mascota}
                className=" w-32 h-32 object-cover rounded-lg mx-auto"
            />
            <div className="p-3">
                <p className="text-lg font-bold">{pet.nombre_mascota}</p>
                <p>
                    <strong>Especie:</strong> {pet.nombre_especie+"asdsa"}
                </p>
                <p>
                    <strong>Raza:</strong> {pet.nombre_raza}
                </p>
            </div>
        </div>
    );
}
export default CardPet;