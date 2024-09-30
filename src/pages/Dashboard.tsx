// src/screens/Dashboard.tsx
import React, { useEffect, useState } from "react"

import { fetchDashboardData } from "../utils/fetchDashboardData"
import {
	AgeData,
	MonthDataPoint,
	PlaceOfFallData,
	ReasonOfFallData,
} from "../types"
import {
	Age,
	Gender,
	PlaceOfFall,
	ReasonOfFall,
	SectionHeader,
	MonthOfFall,
} from "../components"
import { useDateContext } from "../context/DateContext"
import { useReportContext } from "../context/ReportContext"

const Dashboard: React.FC = () => {
	const { startDate, endDate } = useDateContext()
	const { reports, setReports } = useReportContext()
	const [monthOfFallData, setMonthOfFallData] = useState<MonthDataPoint[]>([])
	const [reasonOfFallData, setReasonOfFallData] = useState<ReasonOfFallData[]>(
		[]
	)
	const [placeOfFallsData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([])
	const [ageData, setAgeData] = useState<AgeData[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const loadReports = async () => {
			setLoading(true)

			try {
				const data = await fetchDashboardData(startDate, endDate, setReports)
				setMonthOfFallData(data.monthOfFallData)
				setReasonOfFallData(data.reasonOfFallData)
				setPlaceOfFallData(data.placeOfFallsData)
				setAgeData(data.ageData)
			} catch (error) {
				console.error("Error loading dashboard data:", error)
			} finally {
				setLoading(false)
			}
		}

		loadReports()
	}, [startDate, endDate, setReports])

	return (
		<div className="h-screen w-full p-4 dark:bg-boxdark rounded-lg">
			{loading && <p>Loading ....</p>}
			<div className="grid grid-cols-1 md:grid-cols-8 gap-7 h-full">
				{/* First Column */}
				<div className="md:col-span-5 flex flex-col gap-y-4 h-full">
					<SectionHeader title="Month Of Fall" year="Year" />
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<MonthOfFall data={monthOfFallData} />
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-black dark:text-bodydark">
								Reason Of Fall
							</h2>
							<span className="text-sm font-medium text-gray-600 dark:text-bodydark1">
								Number Of Reasons
							</span>
						</div>
						<ReasonOfFall data={reasonOfFallData} />
					</div>
				</div>

				{/* Second Column */}
				<div className="md:col-span-3 flex flex-col gap-y-4 h-full">
					<SectionHeader title="Place Of Fall" year="Year" />
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<PlaceOfFall data={placeOfFallsData} />
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black dark:text-bodydark mb-2">
							Gender
						</h2>
						<Gender data={reports} />
						{/* Pass the full reports to the Gender chart */}
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black dark:text-bodydark mb-2">
							Age
						</h2>
						<Age data={ageData} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
