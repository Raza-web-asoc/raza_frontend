import { gql } from '@apollo/client';
import client from '../../apolloClient';

export const uploadUserImage = async (idUser, image) => {
  const mutation = `
    mutation uploadUserImage($idUser: ID!, $file: Upload!) {
      uploadUserImage(idUser: $idUser, file: $file)
    }
  `;

  const formData = new FormData();
  formData.append(
    'operations',
    JSON.stringify({
      query: mutation,
      variables: { idUser, file: null } // Inicialmente `null` para el archivo
    })
  );

  formData.append('map', JSON.stringify({ '0': ['variables.file'] }));
  formData.append('0', image);

  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('access_token') || '',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error en la subida de la imagen');
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.uploadUserImage;
  } catch (error) {
    throw new Error('Error al subir la imagen del usuario.');
  }
};


export const getProfileImage = async (idUser) => {
  const QUERY = gql`
    query {
      userImage(idUser: ${idUser})
    }
  `;

  try {
    const { data } = await client.query({
      query: QUERY
    });
    return data.userImage;
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    throw new Error("Error al obtener la imagen");
  }
};

