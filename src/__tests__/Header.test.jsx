import { render, screen, waitFor } from "@testing-library/react";
import Header from "../components/Header";
import { expect, jest, test, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";

// Mock react-router-dom
/* eslint-disable react/prop-types */
jest.mock("react-router-dom", () => ({
  Link: (props) => {
    const { children, to, ...restProps } = props;
    return (
      <a href={to} {...restProps}>
        {children}
      </a>
    );
  },
}));
/* eslint-enable react/prop-types */

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Limpiar mocks antes de cada test
beforeEach(() => {
  localStorageMock.getItem.mockClear();
  localStorageMock.removeItem.mockClear();
});

test("shows Cerrar sesión when isAuthenticated is true", async () => {
  // Simular que hay un token en localStorage (usuario autenticado)
  localStorageMock.getItem.mockReturnValue("fake-token");

  render(<Header />);

  // Esperar a que el useEffect se ejecute
  await waitFor(() => {
    expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();
  });

  // Verificar que "Cerrar sesión" está presente
  expect(screen.getByText("Cerrar sesión")).toBeInTheDocument();

  // Verificar que "Iniciar sesión" NO está presente
  expect(screen.queryByText("Iniciar sesión")).toBeNull();
});

test("shows Iniciar sesión when isAuthenticated is false", async () => {
  // Simular que NO hay token en localStorage (usuario no autenticado)
  localStorageMock.getItem.mockReturnValue(null);

  render(<Header />);

  // Esperar a que el useEffect se ejecute
  await waitFor(() => {
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  // Verificar que "Iniciar sesión" está presente
  expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();

  // Verificar que "Cerrar sesión" NO está presente
  expect(screen.queryByText("Cerrar sesión")).toBeNull();
});
