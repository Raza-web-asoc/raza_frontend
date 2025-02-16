import { gql } from "@apollo/client";
import client from "../../apolloClient.jsx";

export const getInteractionsById = async (id_mascota) => {
    const QUERY = gql`
    query {
        interactions_by_id(id_mascota:${id_mascota}){id_mascota2}
    }`;
    try {
        const { data } = await client.query({
            query: QUERY
        });
        return data.interactions_by_id;
    } catch (error) {
        throw new Error("Error al obtener las interacciones", error.message);
    }
};