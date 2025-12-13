// import { render, screen, waitFor } from "@testing-library/react";
// import { fireEvent } from "@testing-library/react";
// import { ApolloProvider } from "@apollo/client";
// import { describe, test, expect, beforeAll } from "@jest/globals";
// import "@testing-library/jest-dom";
// import Match from "../pages/Match.jsx";
// import { login } from "../services/signinService.js";
// import client from "../apolloClient.jsx";
// import { BrowserRouter } from "react-router-dom";

// // Wrapper para renderizar componentes con providers necesarios
// const renderWithProviders = (ui) => {
//   return render(
//     <ApolloProvider client={client}>
//       <BrowserRouter>{ui}</BrowserRouter>
//     </ApolloProvider>
//   );
// };

// describe("Página Match", () => {
//   beforeAll(async () => {
//     // Limpiar localStorage antes de cada suite de tests
//     localStorage.clear();

//     // Hacer login antes de los tests
//     try {
//       await login("magarciamar32@gmail.com", "Choly311.");
//       // Verificar que el token se guardó en localStorage
//       expect(localStorage.getItem("access_token")).toBeTruthy();
//     } catch (error) {
//       console.warn("Error al hacer login en beforeAll:", error.message);
//       // Si el backend no está disponible, el test fallará
//       throw error;
//     }
//   });

//   test("debe renderizar la página Match correctamente", async () => {
//     renderWithProviders(<Match />);

//     // La página Match inicialmente muestra el modal ChoosePetModal
//     // Verificamos que el modal esté presente
//     await waitFor(() => {
//       const modalTitle = screen.queryByText(/elige una mascota/i);
//       expect(modalTitle).toBeInTheDocument();
//     });
//   });

//   test("debe mostrar el modal de selección de mascota al cargar", async () => {
//     renderWithProviders(<Match />);

//     // Verificar que el modal está visible
//     await waitFor(() => {
//       const modal = screen.getByText(/elige una mascota/i);
//       expect(modal).toBeInTheDocument();
//     });

//     // Verificar que hay un botón de aceptar
//     const acceptButton = screen.getByText(/aceptar/i);
//     expect(acceptButton).toBeInTheDocument();
//   });

//   test("debe mostrar mascotas al cargar", async () => {
//     renderWithProviders(<Match />);

//     await waitFor(() => {
//       const modal = screen.getByText(/elige una mascota/i);
//       expect(modal).toBeInTheDocument();
//     });

//     await waitFor(() => {
//       const noMascotas = screen.queryByText(/No se encontraron mascotas./i);
//       expect(noMascotas).toBeNull();
//     });

//     // Esperar a que las mascotas se carguen y se muestren
//     // Verificamos que hay al menos una mascota mostrada (el texto "especie • raza")
//     await waitFor(
//       () => {
//         const mascotas = screen.queryAllByText(/•/i);
//         // Verificamos que hay al menos una mascota
//         expect(mascotas.length).toBeGreaterThan(0);
//         // Verificamos que cada mascota está en el documento
//         mascotas.forEach((mascota) => {
//           expect(mascota).toBeInTheDocument();
//         });
//       },
//       { timeout: 5000 }
//     );

//     // Verificar que hay un botón de aceptar
//     const acceptButton = screen.getByText(/aceptar/i);
//     expect(acceptButton).toBeInTheDocument();
//   });

//   test("debe seleccionar una mascota y cerrar el modal al hacer click en aceptar", async () => {
//     renderWithProviders(<Match />);

//     // Esperar a que el modal se cargue
//     await waitFor(() => {
//       const modal = screen.getByText(/elige una mascota/i);
//       expect(modal).toBeInTheDocument();
//     });

//     // Esperar a que las mascotas se carguen
//     await waitFor(
//       () => {
//         const mascotas = screen.queryAllByText(/•/i);
//         expect(mascotas.length).toBeGreaterThan(0);
//       },
//       { timeout: 5000 }
//     );

//     // Buscar el texto que muestra la mascota seleccionada
//     const mascotaSeleccionadaText = screen.getByText(/mascota seleccionada:/i);
//     expect(mascotaSeleccionadaText).toBeInTheDocument();

//     // Inicialmente debe decir "Ninguna"
//     expect(screen.getByText(/ninguna/i)).toBeInTheDocument();

//     // Buscar todas las tarjetas de mascotas (los divs que contienen CardPet)
//     // Las tarjetas están dentro de divs con onClick
//     const mascotasCards = screen.queryAllByText(/•/i);

//     // Verificar que hay al menos una mascota
//     expect(mascotasCards.length).toBeGreaterThan(0);

//     // Hacer click en la primera mascota disponible
//     // Buscamos el contenedor clickeable (el div padre que tiene el onClick)
//     // El texto de especie/raza está dentro de un párrafo, subimos al contenedor de la tarjeta
//     const primeraMascota = mascotasCards[0];
//     // Subimos al div de la tarjeta (CardPet) y luego al div contenedor con onClick
//     const cardPetDiv = primeraMascota.closest("div");
//     const contenedorMascota = cardPetDiv?.parentElement;

//     if (contenedorMascota) {
//       fireEvent.click(contenedorMascota);

//       // Esperar a que se actualice el texto de mascota seleccionada
//       await waitFor(
//         () => {
//           // Verificar que ya no dice "Ninguna"
//           const ningunTexto = screen.queryByText(/ninguna/i);
//           expect(ningunTexto).toBeNull();
//         },
//         { timeout: 3000 }
//       );
//     } else {
//       // Si no encontramos el contenedor, intentamos hacer click directamente en el elemento
//       fireEvent.click(primeraMascota);

//       await waitFor(
//         () => {
//           const ningunTexto = screen.queryByText(/ninguna/i);
//           expect(ningunTexto).toBeNull();
//         },
//         { timeout: 3000 }
//       );
//     }

//     const matchViewBefore = screen.queryByTestId("match-view");
//     expect(matchViewBefore).toBeNull();

//     // Hacer click en el botón Aceptar
//     const acceptButton = screen.getByText(/aceptar/i);
//     fireEvent.click(acceptButton);

//     // Verificar que el modal se cerró (el texto "Elige una mascota" ya no debe estar visible)
//     await waitFor(
//       () => {
//         const modalTitle = screen.queryByText(/elige una mascota/i);
//         expect(modalTitle).not.toBeInTheDocument();
//       },
//       { timeout: 5000 }
//     );

//     // Verificar que se muestra la vista de match (puede mostrar "No se encontraron mascotas" o las mascotas)
//     // El modal ya no debe estar visible
//     const modal = screen.queryByText(/elige una mascota/i);
//     expect(modal).toBeNull();

//     const matchView = screen.getByTestId("match-view");
//     expect(matchView).toBeInTheDocument();
//   });
// });
