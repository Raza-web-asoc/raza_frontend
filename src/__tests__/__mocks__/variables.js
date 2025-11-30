/* eslint-disable no-undef */
// Mock del archivo de variables para tests
export const envVariables = {
  GRAPHQL_URL: process.env.VITE_GRAPHQL_URL || "http://localhost",
  GRAPHQL_PORT: process.env.VITE_GRAPHQL_PORT || "4000",
};
