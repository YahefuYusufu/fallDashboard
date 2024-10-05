import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import { Dashboard, Analysis, Calendar, Notification, Settings } from "./pages"
import DefaultLayout from "./layout/DefaultLayout"

import Loader from "./components/common"
import PageTitle from "./components/PageTitle"

import { DateProvider } from "./context/DateContext"
import { ReportProvider } from "./context/ReportContext"

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
		<DateProvider>
			<ReportProvider>
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
			</ReportProvider>
		</DateProvider>
	)
}

export default App
