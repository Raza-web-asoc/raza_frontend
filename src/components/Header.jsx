export default function Header() {
	return (
		<header className="bg-gray-800 text-white p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Raza</h1>
				<nav>
					<ul className="flex space-x-4">
						<li><a href="/signin" className="hover:text-gray-300">Iniciar sesión</a></li>
						<li><a href="/signup" className="hover:text-gray-300">Registrarse</a></li>
						<li><a href="/profile" className="hover:text-gray-300">Perfil</a></li>
						<li><a href="/match" className="hover:text-gray-300">Match</a></li>
						<li><a href="/chat" className="hover:text-gray-300">Chat</a></li>
					</ul>
				</nav>
			</div>
		</header>
	)
}

