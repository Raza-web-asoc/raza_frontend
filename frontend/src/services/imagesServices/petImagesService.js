import { gql } from '@apollo/client';
import client from '../../apolloClient';

export const uploadPetImage = async (idPet, images) => {
  const mutation = `
    mutation ($idPet: ID!, $files: [Upload!]!) {
      uploadPetImages(idPet: $idPet, files: $files)
    }
  `;

  const formData = new FormData();

  formData.append("operations", JSON.stringify({
    query: mutation,
    variables: {
      idPet: idPet,
      files: new Array(images.length).fill(null)
    }
  }));

  const map = {};
  images.forEach((_, index) => {
    map[index] = [`variables.files.${index}`];
  });
  formData.append("map", JSON.stringify(map));

  images.forEach((image, index) => {
    formData.append(index, image);
  });

  try {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("access_token") || "",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error en la subida de imágenes");
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.uploadPetImages;
  } catch (error) {
    console.error("Error al subir las imágenes:", error);
    throw new Error("Error al subir las imágenes");
  }
};


export const getPetImages = async (idPet) => {
  const QUERY = gql`
    query {
      petImages(idPet: ${idPet})
    }
  `;

  try {
    const { data } = await client.query({
      query: QUERY
    });

    return data.petImages;
  } catch (error) {
    console.error("Error al obtener las imagenes de la mascota:", error);
    throw new Error("Error al obtener las imagenes de la mascota");
  }
};

