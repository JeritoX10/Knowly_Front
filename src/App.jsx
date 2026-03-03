import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Contacto from './Pages/Contacto'
import Cursos from './Pages/Cursos'
import Estudiantes from './Pages/Estudiantes'

function App() {
	return (
		<div className="app">
			<NavBar />
			<main className="main" style={{ marginTop: '80px' }}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/contacto" element={<Contacto />} />
					<Route path="/cursos" element={<Cursos />} />
					<Route path="/estudiantes" element={<Estudiantes />} />
				</Routes>
			</main>

			<Footer />
		</div>
	)
}

export default App;