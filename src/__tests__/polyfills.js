/* eslint-disable no-undef */
// Polyfill para TextEncoder y TextDecoder necesarios (debe ejecutarse primero)
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill para APIs de Fetch (Response, Request, Headers) necesarias para MSW
const { fetch, Request, Response, Headers } = require("@whatwg-node/fetch");

// Hacer disponibles globalmente las APIs de Fetch
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

// Mock de localStorage para tests
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = String(value);
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Hacer localStorage disponible globalmente
Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// También hacerlo disponible en window para compatibilidad con jsdom
if (typeof window !== "undefined") {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });
}

// Silenciar console.error para evitar ruido en los tests
// Esto se aplica globalmente antes de que se ejecute cualquier código
if (typeof global.console !== "undefined" && global.console.error) {
  const originalError = global.console.error;

  global.console.error = function () {
    return;
  };

  global.__originalConsoleError = originalError;
}
