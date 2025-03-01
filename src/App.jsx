import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.jsx";
import { sendMetrics } from "./utils/monitoring.js"; // Importar la función para enviar métricas

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Match from "./pages/Match.jsx";
import Chat from "./pages/Chat.jsx";

// Página 404 (ruta no encontrada)
function NotFound() {
  const location = useLocation();
  useEffect(() => {
    const sendMetricsData = async () => {
      try {
        await sendMetrics({
          event: "page_not_found", // Evento de error 404
          url: location.pathname, // Ruta a la que el usuario intentó acceder
          method: "PAGE_NOT_FOUND", // Método especial para diferenciarlo
          status: 404, // Código de error HTTP
          duration: 0, // No aplica en este caso
        });
      } catch (error) {
        console.error("Error al enviar métricas:", error);
      }
    };

    sendMetricsData();
  }, [location]);

  return <h1>404 - Página no encontrada</h1>;
}

// Componente que registra cuando un usuario ingresa a la aplicación
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    sendMetrics({
      event: "page_load", // Evento de carga de la página
      url: location.pathname, // URL visitada
      method: "PAGE_LOAD", // Método especial para diferenciarlo de peticiones HTTP
      status: 200, // Estado OK
      duration: 0, // No aplica en este caso
    });
  }, [location]);

  return null; // No renderiza nada
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <PageTracker /> {/* Registra cada visita */}
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/match" element={<Match />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} /> {/* Captura rutas desconocidas */}
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
