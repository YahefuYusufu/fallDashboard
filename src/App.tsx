import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Loader from "./components/common"

import Dashboard from "./pages/Dashboard"
import DefaultLayout from "./layout/DefaultLayout"
import PageTitle from "./components/PageTitle"
import Calendar from "./pages/Calendar"
import Analysis from "./pages/Analysis"
import Notification from "./pages/Notification"
import Settings from "./pages/Settings"

function App() {
	const [loading, setLoading] = useState<boolean>(true)
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	useEffect(() => {
		setTimeout(() => setLoading(false), 2000)
	}, [])

	return loading ? (
		<Loader />
	) : (
		<DefaultLayout>
			<Routes>
				<Route
					index
					element={
						<>
							<PageTitle title="Dashboard" />
							<Dashboard />
						</>
					}
				/>
				<Route
					path="/calendar"
					element={
						<>
							<PageTitle title="Calendar" />
							<Calendar />
						</>
					}
				/>
				<Route
					path="/analysis"
					element={
						<>
							<PageTitle title="Analysis " />
							<Analysis />
						</>
					}
				/>
				<Route
					path="notification"
					element={
						<>
							<PageTitle title="Notification" />
							<Notification />
						</>
					}
				/>
				<Route
					path="settings"
					element={
						<>
							<PageTitle title="Settings" />
							<Settings />
						</>
					}
				/>
			</Routes>
		</DefaultLayout>
	)
}

export default App
