import axios from "axios"

export const createMatch = async (match) => {
    const token = localStorage.getItem("access_token")
    if (!token) {
        throw new Error("Token no encontrado")
    }
    try {
        const response = await axios.post("http://localhost/api/match-pet", match, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response
    } catch (error) {
        console.error(error)
        throw new Error("Error al crear el match")
    }
}