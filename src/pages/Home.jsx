import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Hero Section */}
            <section
                className="flex flex-col items-center justify-center text-center py-20 px-4 bg-cover bg-center"
                style={{ backgroundImage: "url('https://pixabay.com/get/gfaea69dbb2de929222f2bdc6001cbb46af34d81856cfbfc61d96efd77754750d2987909b06e8919958bd4c0345d2bb2463dcb6da846d94079875b1d86c107700_1920.jpg')" }}
            >
                <div className="bg-black bg-opacity-50 rounded-lg mb-4 flex flex-col items-center justify-center text-center px-4 py-20">
                    <h1 className="text-5xl font-bold mb-4 text-white">Encuentra la pareja perfecta para tu mascota</h1>
                    <p className="text-lg mb-6 max-w-2xl text-white">
                        Con Raza, conecta con dueños responsables y encuentra el mejor match para tu mascota de forma segura y sencilla.
                    </p>
                    <div className="flex space-x-4">
                        <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
                            Regístrate
                        </Link>
                        <a href="#mision" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg">
                            Nuestros principios
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 px-8 pt-10 pb-16 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold col-span-3">Características de Raza</h2>
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                    <img src="https://pixabay.com/get/g17f20f0df11f31763d8dd72bb8f9b82c78baafec86f13083804e8a810826cb5dd06282c0c425f5494bd24e8dffd7aba7f920e237892fd500999704df975a4726b3e40321a7e4690db5d3aaaa369853d4_640.jpg" alt="Match" className="mx-auto mb-4 w-50 rounded-lg" />
                    <h3 className="text-2xl font-semibold mb-2">Sistema de Match</h3>
                    <p>Encuentra coincidencias basadas en la raza, tamaño y ubicación.</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                    <img src="https://pixabay.com/get/g146eaa4770a309121a144fca6a7b3438cc2207bc308f93cc77ef236f8bc34be2a140566f88ae64fe6e2a3191d7d0b24acb085e7cbbcb7247eacbbd44e5ec2d753ce0a1e6699d1c5f4bf827a5a0d1d2ff_640.png" alt="Chat" className="mx-auto mb-4 w-50 rounded-lg" />
                    <h3 className="text-2xl font-semibold mb-2">Chat Seguro</h3>
                    <p>Comunícate con otros dueños de mascotas antes de tomar decisiones.</p>
                </div>
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
                    <img src="https://pixabay.com/get/g7037dc85ebb465058809194edb3ecd2eabc8484f32823f5b589c40358f81173bc833c48ae880d053dd27ed2ce1966a37f8717ec6d93b85678244edd99840143ce21bb05e33725ff6aa4ce9d09e7b91f5_640.png" alt="Perfil" className="mx-auto mb-4 h-40 rounded-lg" />
                    <h3 className="text-2xl font-semibold mb-2">Perfiles Detallados</h3>
                    <p>Consulta la información completa de las mascotas registradas.</p>
                </div>
            </section>
            {/* Mission and Vision Section */}
            <section className="pt-5 pb-20 max-w-3xl mx-auto flex flex-col md:flex-row items-center" id="mision">
                <div className="md:w-1/2 mb-6 md:mb-0 flex items-center justify-center">
                    <img src="https://pixabay.com/get/gb1cfe108779f07c4a792aa18bedf5fb3d87b41dd625bfc64544f835c395ac97a18783edc6dd64a4234a296b7f7b7d56d99c64a08f1082847317aa5dc88fe895b6d703d59dc915f492f387f290bda31ff_640.jpg" alt="Imagen de Misión y Visión" className="rounded-lg shadow-lg w-5/6" />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-6">Nuestra Misión y Visión</h2>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                        <h3 className="text-2xl font-semibold mb-2">Misión</h3>
                        <p>Facilitar la conexión entre dueños de mascotas para encontrar la pareja ideal, promoviendo la responsabilidad y el bienestar animal.Iterando e incrementando la conexión natural entre nuestras mascotas.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-2">Visión</h3>
                        <p>Para el 2028, Raza sera la plataforma lider en emparejamiento de animales. Ser la plataforma líder en emparejamiento de mascotas, garantizando seguridad y confianza en cada conexión.</p>
                    </div>
                </div>
            </section>
            {/* User Experiences Section */}
            <section className="py-20 bg-gray-800 text-center">
                <h2 className="text-3xl font-bold mb-6">Experiencias de nuestros usuarios</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                        <p className="italic">"Gracias a Raza encontré la pareja ideal para mi perro Max. El proceso fue fácil y seguro. ¡Recomiendo mucho la plataforma!"</p>
                        <h4 className="mt-4 font-semibold">- Laura G.</h4>
                    </div>
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                        <p className="italic">"Raza me permitió conectar con otros dueños responsables. Ahora mi gata tiene una gran compañía. ¡Increíble experiencia!"</p>
                        <h4 className="mt-4 font-semibold">- Carlos M.</h4>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-16">
                <h2 className="text-3xl font-bold mb-4">Únete a Raza hoy mismo</h2>
                <p className="text-lg mb-6">Haz que tu mascota encuentre su pareja ideal.</p>
                <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
                    Empezar ahora
                </Link>
            </section>
        </div>
    );
}
