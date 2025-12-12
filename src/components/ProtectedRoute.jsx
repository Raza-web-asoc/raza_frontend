import { Navigate } from "react-router-dom";

/**
 * Componente para proteger rutas basado en autenticación y roles
 * @param {Object} props
 * @param {JSX.Element} props.children - Componente a renderizar si tiene acceso
 * @param {Array<string>} props.allowedRoles - Roles permitidos para acceder a la ruta (opcional)
 * @param {string} props.redirectTo - Ruta de redirección si no tiene acceso (default: "/signin")
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  // Obtener datos del usuario desde localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // o "userRole" según tu implementación
  

  // Si se especificaron roles permitidos, verificar que el usuario tenga uno de ellos
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirigir a página de acceso denegado o home
    return <Navigate to="/access-denied" replace />;
  }

  // Si pasa todas las validaciones, renderizar el componente hijo
  return children;
};

export default ProtectedRoute;
