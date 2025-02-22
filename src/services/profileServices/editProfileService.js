import { gql } from '@apollo/client';
import client from '../../apolloClient.jsx';


export const editProfile = async (names, last_names, email, birthday, gender) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        throw new Error("Token no encontrado");
    }
    const MUTATION = gql`
    mutation editProfile($input: EditUserInput!, $token: String!) {
      editUser(input: $input, token: $token)
    }
  `;
    try {
        const { data } = await client.mutate({
            mutation: MUTATION,
            variables: {
                input: { names, last_names, email, birthday, gender },
                token: token
            }
        });
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el perfil");
    }
};
