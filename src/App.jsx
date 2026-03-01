import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import './App.css'
import Login  from './Pages/Login'	

function App() {
	return (
		<div>
			<NavBar />
			<main style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
				{/* Aquí van las páginas
					redes
					login
					certificado
					cursos
					contacto
				*/}
			</main>

			
			
			<Footer />

		</div>
	)
}

export default App;