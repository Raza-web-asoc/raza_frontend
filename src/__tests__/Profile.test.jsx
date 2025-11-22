import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Profile from "../pages/Profile";
import { expect, jest, test } from "@jest/globals";
import "@testing-library/jest-dom";

// jest.mock("../apolloClient", () => ({
//   __esModule: true,
//   default: {
//     query: () => Promise.resolve({ data: {} }),
//     mutate: () => Promise.resolve({ data: {} }),
//     readQuery: () => null,
//     writeQuery: () => {},
//   },
// }));

jest.mock("../config/variables", () => ({
  envVariables: {
    GRAPHQL_URL: "http://localhost:4000/graphql",
    GRAPHQL_PORT: "4000",
  },
}));

const userData = {
  id_user: 1,
  names: "John",
  last_names: "Doe",
  email: "john.doe@example.com",
  gender: "M",
  birthday: "1990-01-01",
};

jest.mock("../services/profileService", () => ({
  profile: () => Promise.resolve(userData),
}));

jest.mock("../services/imagesServices/profileImageService", () => ({
  getProfileImage: () => Promise.resolve("https://example.com/image.jpg"),
  uploadUserImage: () =>
    Promise.resolve("https://example.com/uploaded-image.jpg"),
}));

jest.mock("../services/profileServices/editProfileService", () => ({
  editProfile: () => Promise.resolve({ success: true }),
}));

jest.mock("../components/PetsProfile", () => {
  return function MockPetsProfile() {
    return <div data-testid="pets-profile">Mascotas</div>;
  };
});

test("renders profile", async () => {
  render(<Profile />);

  expect(
    await screen.findByText(`Nombres: ${userData.names}`)
  ).toBeInTheDocument();

  expect(
    await screen.findByText(`Apellidos: ${userData.last_names}`)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(`Correo: ${userData.email}`)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(
      `Género: ${
        userData.gender === "M"
          ? "Masculino"
          : userData.gender === "F"
          ? "Femenino"
          : "Otro"
      }`
    )
  ).toBeInTheDocument();
  expect(
    await screen.findByText(`Fecha nacimiento: ${userData.birthday}`)
  ).toBeInTheDocument();
});

test("opens edit modal when clicking Editar Perfil button", async () => {
  render(<Profile />);
  expect(
    await screen.findByText(`Nombres: ${userData.names}`)
  ).toBeInTheDocument();

  expect(screen.queryByText("Editar Información")).toBeNull();

  const editButton = screen.getByText("Editar Perfil");

  fireEvent.click(editButton);

  expect(screen.getByText("Editar Información")).toBeInTheDocument();
});
