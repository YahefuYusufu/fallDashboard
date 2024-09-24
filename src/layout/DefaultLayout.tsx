import React, { useState, ReactNode } from "react"
import Header from "../components/header/Header"
import Sidebar from "../components/sidebar/Sidebar"
import { useDateContext } from "../context/DateContext"

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
	const [currentTheme] = useState<"light" | "dark">("light")
	const { startDate, endDate, setStartDate, setEndDate } = useDateContext()

	return (
		<div className=" bg-boxWhite dark:bg-boxdark-2 dark:text-bodydark">
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar with full screen height */}
				<Sidebar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
					theme={currentTheme}
				/>

				{/* Main content container */}
				<div className="relative flex flex-1 flex-col">
					{/* Header remains at the top */}
					<Header
						sidebarOpen={sidebarOpen}
						setSidebarOpen={setSidebarOpen}
						setStartDate={setStartDate}
						setEndDate={setEndDate}
						startDate={startDate}
						endDate={endDate}
					/>

					{/* Main section with dynamic height */}
					<main className="flex-1 overflow-y-auto">
						<div className="mx-auto max-w-screen-2xl p-4 h-full flex flex-col justify-between md:p-6 2xl:p-10">
							{React.cloneElement(children as React.ReactElement, {
								startDate,
								endDate,
							})}
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}

export default DefaultLayout
