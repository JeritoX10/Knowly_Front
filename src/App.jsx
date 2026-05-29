import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'

function App() {
	return (
		<div className="app">
			<NavBar />
			<Outlet />
			<Footer />
		</div>
	)
}
export default App
