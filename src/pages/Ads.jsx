import { useState, useEffect } from "react";
import {
  getAllAds,
  createAd,
  updateAd,
  deleteAd,
} from "../services/adsServices/adsService.js";
import { Trash2, Edit, Plus, X } from "lucide-react";

export default function Ads() {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_base64: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    setIsLoading(true);
    try {
      const adsData = await getAllAds();
      setAds(adsData);
    } catch (error) {
      console.error("Error al cargar anuncios:", error);
      setError("Error al cargar los anuncios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData({
          ...formData,
          image_base64: base64String,
        });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingAd) {
        // Actualizar anuncio existente
        await updateAd(
          editingAd.id,
          formData.title,
          formData.description,
          formData.image_base64
        );
      } else {
        // Crear nuevo anuncio
        await createAd(
          formData.title,
          formData.description,
          formData.image_base64
        );
      }

      // Recargar lista de anuncios
      await loadAds();

      // Limpiar formulario y cerrar modal
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar anuncio:", error);
      setError(error.message || "Error al guardar el anuncio");
    }
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      image_base64: ad.image_base64,
    });
    setImagePreview(ad.image_base64 || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este anuncio?")
    ) {
      return;
    }

    try {
      await deleteAd(id);
      await loadAds();
    } catch (error) {
      console.error("Error al eliminar anuncio:", error);
      setError(error.message || "Error al eliminar el anuncio");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAd(null);
    setFormData({
      title: "",
      description: "",
      image_base64: "",
    });
    setImagePreview(null);
    setError("");
  };

  const handleOpenCreateModal = () => {
    setEditingAd(null);
    setFormData({
      title: "",
      description: "",
      image_base64: "",
    });
    setImagePreview(null);
    setError("");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-rose-50 p-4 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-rose-400">
            Gestión de Anuncios
          </h1>
          <button
            id = "new-ad-button"
            onClick={handleOpenCreateModal}
            className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Nuevo Anuncio
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Cargando anuncios...</p>
          </div>
        ) : ads.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No hay anuncios disponibles</p>
            <p className="text-gray-500 mt-2">
              Crea tu primer anuncio haciendo clic en &quot;Nuevo Anuncio&quot;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div
                data-testid="ad-card"
                key={ad.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {ad.image_base64 && (
                  <div className="w-full h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={ad.image_base64}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="ad-title text-xl font-bold text-gray-800 mb-2">
                    {ad.title}
                  </h3>
                  <p className="ad-description text-gray-600 mb-4 line-clamp-3">
                    {ad.description}
                  </p>
                  <div className="flex gap-2">
                    <button
                      data-testid='edit-ad-button'
                      onClick={() => handleEdit(ad)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center justify-center gap-2"
                    >
                      <Edit size={16} />
                      Editar
                    </button>
                    <button
                      data-testid="delete-ad-button"
                      onClick={() => handleDelete(ad.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal para crear/editar anuncio */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingAd ? "Editar Anuncio" : "Nuevo Anuncio"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Título *
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Vista previa:
                      </p>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    id="save-ad-button"
                    type="submit"
                    className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition"
                  >
                    {editingAd ? "Actualizar" : "Crear"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
