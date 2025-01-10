
const cardPet = ({ pet }) => {

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <img
                src={pet.foto}
                alt={pet.nombre_mascota}
                className="w-full h-48 object-cover rounded-lg"
            />

            <p className="text-lg font-bold">{pet.nombre_mascota}</p>
            <p>
                <strong>Especie:</strong> {pet.nombre_especie}
            </p>
            <p>
                <strong>Raza:</strong> {pet.nombre_raza}
            </p>
        </div>
    );
}
export default cardPet;