import { gql } from '@apollo/client';
import client from '../../apolloClient.jsx';

export const handleSwipe = async (match) => {

    const { id_mascota1, id_mascota2, tipo_interaccion } = match;

    const token = localStorage.getItem("access_token");
    if (!token) {
        throw new Error("Token no encontrado");
    }

    const MUTATION = gql`
    mutation match($input: MatchInput!, $token: String!) {
      match(input: $input, token: $token) {
        match
        message
      }
    }
    `;

    try {
        const { data } = await client.mutate({
            mutation: MUTATION,
            variables: {
                input: { id_mascota1, id_mascota2, tipo_interaccion },
                token,
            },
        });
        return data.match;
    } catch (error) {
        console.error(error)
        throw new Error("Error al crear el swipe")
    }
}