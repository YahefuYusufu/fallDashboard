import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Loader from "./components/common"

import Dashboard from "./pages/Dashboard"

function App() {
	const [loading, setLoading] = useState<boolean>(true)
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000)
	}, [])

	return (
		<>
			<Dashboard />
		</>
	)
}

export default App
