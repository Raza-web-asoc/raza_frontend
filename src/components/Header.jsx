import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  User,
  MessageCircle,
  Heart,
  LogIn,
  UserPlus,
  LogOut,
  ImagePlus,
} from "lucide-react";
import { profile } from "../services/profileService.js";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsAuthenticated(true);
      const fetchUserData = async () => {
        const userData = await profile();
        setUserData(userData);
      };
      fetchUserData();
    }
  }, []);

  const isAdmin = useMemo(() => {
    if (userData) {
      const userRole = localStorage.getItem("role");
      return userRole, userRole === "2";
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-rose-300 text-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="public/vite.svg" alt="Logo" className="w-10 my-0 py-0" />
          <Link to="/" className="text-3xl font-bold text-white italic">
            Raza
          </Link>
        </div>

        {/* Menu para pantallas grandes */}
        <nav className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-1 hover:text-gray-400"
              >
                <User size={20} />
                Perfil
              </Link>
              <Link
                to="/match"
                className="flex items-center gap-1 hover:text-gray-400"
              >
                <Heart size={20} />
                Match
              </Link>
              <Link
                to="/chat"
                className="flex items-center gap-1 hover:text-gray-400"
              >
                <MessageCircle size={20} />
                Chat
              </Link>
              {isAdmin && (
                <Link
                  to="/ads"
                  className="flex items-center gap-1 hover:text-gray-400"
                >
                  <ImagePlus size={20} />
                  Anuncios
                </Link>
              )}
              <Link to="/">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 hover:text-gray-400"
                >
                  <LogOut size={20} />
                  Cerrar sesión
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="flex items-center gap-1 hover:text-gray-400"
              >
                <LogIn size={20} />
                Iniciar sesión
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1 hover:text-gray-400"
              >
                <UserPlus size={20} />
                Registrarse
              </Link>
            </>
          )}
        </nav>

        {/* Botón de menú para móviles */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <nav className="md:hidden bg-gray-800 text-white shadow-md p-4 flex flex-col space-y-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <User size={20} />
                Perfil
              </Link>
              <Link
                to="/match"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <Heart size={20} />
                Match
              </Link>
              <Link
                to="/chat"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <MessageCircle size={20} />
                Chat
              </Link>
              {isAdmin && (
                <Link
                  to="/ads"
                  className="flex items-center gap-1 hover:text-gray-400"
                >
                  <ImagePlus size={20} />
                  Anuncios
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 hover:text-gray-400"
              >
                <LogOut size={20} />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <LogIn size={20} />
                Iniciar sesión
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-2 hover:text-gray-400"
              >
                <UserPlus size={20} />
                Registrarse
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
