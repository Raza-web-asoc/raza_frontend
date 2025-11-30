import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { describe, test, expect, beforeAll } from "@jest/globals";
import "@testing-library/jest-dom";
import Match from "../pages/Match.jsx";
import { login } from "../services/signinService.js";
import client from "../apolloClient.jsx";
import { server } from "./setupTests.js";

/**
 * Test de renderizado de la página Match
 *
 * IMPORTANTE: Este test requiere que el backend esté corriendo:
 * - API Gateway (GraphQL) en http://localhost:4000
 *
 * MSW está configurado para interceptar las llamadas pero permitir
 * que pasen al backend real usando passthrough()
 */

// Wrapper para renderizar componentes con providers necesarios
const renderWithProviders = (ui) => {
  return render(ui);
};

describe("Página Match", () => {
  beforeAll(async () => {
    // Limpiar localStorage antes de cada suite de tests
    localStorage.clear();

    // Hacer login antes de los tests
    try {
      await login("magarciamar32@gmail.com", "Choly311.");
      // Verificar que el token se guardó en localStorage
      expect(localStorage.getItem("access_token")).toBeTruthy();
    } catch (error) {
      console.warn("Error al hacer login en beforeAll:", error.message);
      // Si el backend no está disponible, el test fallará
      throw error;
    }
  });

  test("debe renderizar la página Match correctamente", async () => {
    renderWithProviders(<Match />);

    // La página Match inicialmente muestra el modal ChoosePetModal
    // Verificamos que el modal esté presente
    await waitFor(() => {
      const modalTitle = screen.queryByText(/elige una mascota/i);
      expect(modalTitle).toBeInTheDocument();
    });
  });

  test("debe mostrar el modal de selección de mascota al cargar", async () => {
    renderWithProviders(<Match />);

    // Verificar que el modal está visible
    await waitFor(() => {
      const modal = screen.getByText(/elige una mascota/i);
      expect(modal).toBeInTheDocument();
    });

    // Verificar que hay un botón de aceptar
    const acceptButton = screen.getByText(/aceptar/i);
    expect(acceptButton).toBeInTheDocument();
  });

  test("debe mostrar mascotas al cargar", async () => {
    renderWithProviders(<Match />);

    await waitFor(() => {
      const modal = screen.getByText(/elige una mascota/i);
      expect(modal).toBeInTheDocument();
    });

    await waitFor(() => {
      const noMascotas = screen.queryByText(/No se encontraron mascotas./i);
      expect(noMascotas).toBeNull();
    });

    // Esperar a que las mascotas se carguen y se muestren
    // Verificamos que hay al menos una mascota mostrada (el texto "especie • raza")
    await waitFor(
      () => {
        const mascotas = screen.queryAllByText(/•/i);
        // Verificamos que hay al menos una mascota
        expect(mascotas.length).toBeGreaterThan(0);
        // Verificamos que cada mascota está en el documento
        mascotas.forEach((mascota) => {
          expect(mascota).toBeInTheDocument();
        });
      },
      { timeout: 5000 }
    );

    // Verificar que hay un botón de aceptar
    const acceptButton = screen.getByText(/aceptar/i);
    expect(acceptButton).toBeInTheDocument();
  });
});
