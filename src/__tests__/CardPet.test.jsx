import { render, screen, waitFor } from "@testing-library/react";
import CardPet from "../components/Match/CardPet";
import { expect, jest, test, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";

// Crear un mock function que se pueda modificar en los tests
const mockGetPetImages = jest.fn();

// Mock del servicio de imágenes
jest.mock("../services/imagesServices/petImagesService.js", () => ({
  getPetImages: (...args) => mockGetPetImages(...args),
}));

beforeEach(() => {
  mockGetPetImages.mockClear();
  // Limpiar console.error para evitar ruido en los tests
  jest.spyOn(console, "error").mockImplementation(() => {});
});

test("renderiza correctamente la información de la mascota", async () => {
  const mockPet = {
    id_mascota: 1,
    nombre_mascota: "Max",
    nombre_especie: "Perro",
    nombre_raza: "Labrador",
  };

  // Mock del servicio que devuelve imágenes vacías
  mockGetPetImages.mockResolvedValue([]);

  render(<CardPet pet={mockPet} />);

  // Verificar que se muestra el nombre de la mascota
  expect(await screen.findByText("Max")).toBeInTheDocument();

  // Verificar que se muestra la especie y raza
  expect(await screen.findByText("Perro • Labrador")).toBeInTheDocument();

  // Verificar que se llama al servicio con el id correcto

  expect(mockGetPetImages).toHaveBeenLastCalledWith(1);
});

test("muestra la imagen por defecto cuando no hay imágenes", async () => {
  const mockPet = {
    id_mascota: 2,
    nombre_mascota: "Luna",
    nombre_especie: "Gato",
    nombre_raza: "Persa",
  };

  // Mock del servicio que devuelve array vacío
  mockGetPetImages.mockResolvedValue([]);

  render(<CardPet pet={mockPet} />);

  await waitFor(() => {
    const img = screen.getByAltText("Luna");
    expect(img).toBeInTheDocument();
    // Verificar que usa la imagen por defecto
    expect(img).toHaveAttribute(
      "src",
      "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg"
    );
  });
});

test("muestra la primera imagen cuando hay imágenes disponibles", async () => {
  const mockPet = {
    id_mascota: 3,
    nombre_mascota: "Bella",
    nombre_especie: "Perro",
    nombre_raza: "Golden Retriever",
  };

  const mockImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
  ];

  // Mock del servicio que devuelve imágenes
  mockGetPetImages.mockResolvedValue(mockImages);

  render(<CardPet pet={mockPet} />);

  await waitFor(() => {
    const img = screen.getByAltText("Bella");
    expect(img).toBeInTheDocument();
    // Verificar que usa la primera imagen
    expect(img).toHaveAttribute("src", "https://example.com/image1.jpg");
  });
});

test("maneja errores al obtener imágenes y muestra imagen por defecto", async () => {
  const mockPet = {
    id_mascota: 4,
    nombre_mascota: "Rocky",
    nombre_especie: "Perro",
    nombre_raza: "Bulldog",
  };

  // Mock del servicio que lanza un error
  mockGetPetImages.mockRejectedValue(
    new Error("Error al obtener las imágenes")
  );

  render(<CardPet pet={mockPet} />);

  await waitFor(() => {
    const img = screen.getByAltText("Rocky");
    expect(img).toBeInTheDocument();
    // Verificar que usa la imagen por defecto cuando hay error
    expect(img).toHaveAttribute(
      "src",
      "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg"
    );
  });

  // Verificar que se registró el error en la consola
  expect(console.error).toHaveBeenCalled();
});

test("llama al servicio cuando cambia el id de la mascota", async () => {
  const mockPet1 = {
    id_mascota: 5,
    nombre_mascota: "Charlie",
    nombre_especie: "Perro",
    nombre_raza: "Beagle",
  };

  mockGetPetImages.mockResolvedValue([]);

  const { rerender } = render(<CardPet pet={mockPet1} />);

  expect(mockGetPetImages).toHaveBeenLastCalledWith(5);

  // Cambiar el pet
  const mockPet2 = {
    id_mascota: 6,
    nombre_mascota: "Daisy",
    nombre_especie: "Perro",
    nombre_raza: "Dachshund",
  };

  rerender(<CardPet pet={mockPet2} />);

  // Verificar que se llama de nuevo con el nuevo id
  expect(mockGetPetImages).toHaveBeenLastCalledWith(6);
});
