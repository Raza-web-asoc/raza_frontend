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
  fireEvent.change(descriptionInput, {
    target: { value: "Descripción de prueba" },
  });

  // Opcional: agregar una imagen dummy
  const fileInput = screen.getByLabelText(/Imagen/i);
  const file = new File(["dummy content"], "test.png", { type: "image/png" });
  fireEvent.change(fileInput, { target: { files: [file] } });

  // Crear anuncio
  const createButton = screen.getByText(/Crear/i);
  fireEvent.click(createButton);

  // Esperar a que el anuncio aparezca en la lista
  await waitFor(() => {
    // Puede haber múltiples anuncios con el mismo título, así que verificamos que al menos uno existe
    const titles = screen.getAllByText(/Test Ad/i);
    expect(titles.length).toBeGreaterThan(0);

    // Verificar que la descripción también está presente
    const descriptions = screen.getAllByText(/Descripción de prueba/i);
    expect(descriptions.length).toBeGreaterThan(0);

    // Verificar que al menos una tarjeta de anuncio contiene ambos textos
    const adCards = screen.getAllByTestId("ad-card");
    const hasMatchingAd = adCards.some((card) => {
      const cardText = card.textContent;
      return (
        cardText.includes("Test Ad") &&
        cardText.includes("Descripción de prueba")
      );
    });
    expect(hasMatchingAd).toBe(true);
  });
});

test("elimina un anuncio usando el backend real", async () => {
  render(<Ads />);

  // Esperar a que cargue el título principal
  await waitFor(() => {
    expect(screen.getByText(/Gestión de Anuncios/i)).toBeInTheDocument();
  });

  // Esperar a que se carguen los anuncios
  await waitFor(() => {
    const adCards = screen.queryAllByTestId("ad-card");
    expect(adCards.length).toBeGreaterThan(0);
  });

  // Buscar la tarjeta del anuncio que contiene "Test Ad" y "Descripción de prueba"
  const adCards = screen.getAllByTestId("ad-card");
  const targetCard = adCards.find((card) => {
    const cardText = card.textContent;
    return (
      cardText.includes("Test Ad") && cardText.includes("Descripción de prueba")
    );
  });

  // Verificar que encontramos el anuncio
  expect(targetCard).toBeDefined();

  // Mockear window.confirm para que retorne true (confirmar eliminación)
  const confirmSpy = jest.spyOn(window, "confirm");
  confirmSpy.mockReturnValue(true);

  // Buscar el botón de eliminar dentro de la tarjeta objetivo
  const deleteButton = targetCard.querySelector(
    '[data-testid="delete-ad-button"]'
  );
  expect(deleteButton).toBeInTheDocument();

  // Hacer click en el botón de eliminar
  fireEvent.click(deleteButton);

  // Esperar a que el anuncio se elimine
  await waitFor(
    () => {
      // Verificar que el anuncio específico ya no está presente
      const currentCards = screen.queryAllByTestId("ad-card");
      const stillExists = currentCards.some((card) => {
        const cardText = card.textContent;
        return (
          cardText.includes("Test Ad") &&
          cardText.includes("Descripción de prueba")
        );
      });
      expect(stillExists).toBe(false);
    },
    { timeout: 5000 }
  );

  // Restaurar el mock
  confirmSpy.mockRestore();
});
