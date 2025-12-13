import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Ads from "../pages/Ads.jsx";
import { expect, jest, test, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";

// Limpiar console.error para no saturar la salida
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

test("crea un anuncio usando el backend real", async () => {
  render(<Ads />);

  // Esperar a que cargue el título principal
  await waitFor(() => {
    expect(screen.getByText(/Gestión de Anuncios/i)).toBeInTheDocument();
  });

  // Abrir modal de nuevo anuncio
  const newAdButton = screen.getByText(/Nuevo Anuncio/i);
  fireEvent.click(newAdButton);

  // Completar formulario
  const titleInput = screen.getByLabelText(/Título \*/i);
  const descriptionInput = screen.getByLabelText(/Descripción \*/i);

  fireEvent.change(titleInput, { target: { value: "Test Ad" } });
  fireEvent.change(descriptionInput, { target: { value: "Descripción de prueba" } });

  // Opcional: agregar una imagen dummy
  const fileInput = screen.getByLabelText(/Imagen/i);
  const file = new File(["dummy content"], "test.png", { type: "image/png" });
  fireEvent.change(fileInput, { target: { files: [file] } });

  // Crear anuncio
  const createButton = screen.getByText(/Crear/i);
  fireEvent.click(createButton);

  // Esperar a que el anuncio aparezca en la lista
  await waitFor(() => {
    expect(screen.getByText(/Test Ad/i)).toBeInTheDocument();
    expect(screen.getByText(/Descripción de prueba/i)).toBeInTheDocument();
  });
});
