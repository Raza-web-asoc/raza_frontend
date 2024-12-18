export default function Header() {
	return (
		<header className="bg-gray-800 text-white p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Raza</h1>
				<nav>
					<ul className="flex space-x-4">
						<li><a href="#" className="hover:text-gray-300">Inicio</a></li>
						<li><a href="#" className="hover:text-gray-300">Servicios</a></li>
						<li><a href="#" className="hover:text-gray-300">Contacto</a></li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

