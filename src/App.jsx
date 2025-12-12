import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.jsx";
import { sendMetrics } from "./utils/monitoring.js"; // Importar la función para enviar métricas

import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Match from "./pages/Match.jsx";
import Chat from "./pages/Chat.jsx";
import AccessDeniedce from "./pages/AccessDenied.jsx";
import Home from "./pages/Home.jsx";
import Ads from "./pages/Ads.jsx";
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
  const ADMIN_ROLE = "2"; // Definir el rol de administrador  

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <PageTracker /> {/* Registra cada visita */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/access-denied" element={<AccessDeniedce />} />
          <Route path="/chat" element={<Chat />} />
          
          {/* Ruta protegida por token deben estar loggeados para acceder */}

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />



          <Route path="/match" element={
            <ProtectedRoute>
              <Match />
            </ProtectedRoute>
          } />

          {/* Ruta protegida por rol de administrador (role 2) */}

          <Route 
            path="/ads" 
            element={
              <ProtectedRoute allowedRoles={[ADMIN_ROLE]}>
                <Ads />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} /> {/* Captura rutas desconocidas */}
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
