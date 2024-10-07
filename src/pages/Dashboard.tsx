// src/screens/Dashboard.tsx
import React, { useState } from "react"

import {
	Age,
	Gender,
	PlaceOfFall,
	ReasonOfFall,
	SectionHeader,
	MonthOfFall,
} from "../components"
import { useDateContext } from "../context/DateContext"
import useDashboardData from "../utils/useDashboardData"
import { Report } from "../types"

const Dashboard: React.FC = () => {
	const { startDate, endDate } = useDateContext()
	const [, setReports] = useState<Report[]>([])

	const {
		monthOfFallData,
		reasonOfFallData,
		placeOfFallsData,
		ageData,
		genderData,
		loading,
	} = useDashboardData(startDate, endDate, setReports)

	return (
		<div className="h-screen w-full p-4 dark:bg-boxdark rounded-lg">
			{loading && <p>Loading ....</p>}
			<div className="grid grid-cols-1 md:grid-cols-8 gap-7 h-full">
				{/* First Column */}
				<div className="md:col-span-5 flex flex-col gap-y-4 h-full">
					<SectionHeader title="Fall per månad" year="Year" />
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<MonthOfFall data={monthOfFallData} />
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-black dark:text-bodydark">
								Andledning till fall
							</h2>
							<span className="text-sm font-medium text-gray-600 dark:text-bodydark1">
								Antal
							</span>
						</div>
						<ReasonOfFall data={reasonOfFallData} />
					</div>
				</div>

				{/* Second Column */}
				<div className="md:col-span-3 flex flex-col gap-y-4 h-full">
					<SectionHeader title="Plats för fallet" year="Year" />
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<PlaceOfFall data={placeOfFallsData} />
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black dark:text-bodydark mb-2">
							Könsfördelning
						</h2>
						<Gender data={genderData} />
						{/* Pass the full reports to the Gender chart */}
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black dark:text-bodydark mb-2">
							Åldersgrupp
						</h2>
						<Age data={ageData} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
