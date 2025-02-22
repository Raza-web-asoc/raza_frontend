import client from '../../apolloClient.jsx';

export const updatePet = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("Token no encontrado");
  }
  const MUTATION = gql`
    mutation editUser($input: EditUserInput!, $token: String!) {
      editUser(input: $input, token: $token)
    }
  `;

  try {
    const { data } = await client.mutate({
      mutation: MUTATION
    });

    return data.editUser;
  } catch (error) {
    console.error(error);
    throw new Error("Usuario o contraseña incorrecta");
  }
};
