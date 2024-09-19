import React, { useEffect, useState } from "react"
import MonthOfFallChart, {
	MonthDataPoint,
} from "../components/charts/MonthOfFall"
import SectionHeader from "../components/charts/SectionHeader"
import ReasonOfFall, {
	ReasonOfFallData,
} from "../components/charts/ReasonOfFall"
import PlaceOfFall, { PlaceOfFallData } from "../components/charts/PlaceOfFall"
import Gender, { GenderData } from "../components/charts/Gender"
import Age, { AgeData } from "../components/charts/Age"
import { fetchReports } from "../data/fetchReports"
import { Report } from "../types"
import { getPlaceOfFallData } from "../utils/fallAlgorithms"

// Sample data - replace with your actual data
// export const sampleMonthOfFallData: MonthDataPoint[] = [
// 	{ name: "Jan", value: 30 },
// 	{ name: "Feb", value: 25 },
// 	{ name: "Mar", value: 35 },
// 	{ name: "Apr", value: 40 },
// 	{ name: "May", value: 28 },
// 	{ name: "Jun", value: 32 },
// 	{ name: "Jul", value: 38 },
// 	{ name: "Aug", value: 42 },
// 	{ name: "Sep", value: 30 },
// 	{ name: "Oct", value: 35 },
// 	{ name: "Nov", value: 28 },
// 	{ name: "Dec", value: 32 },
// ]

// export const sampleReasonOfFallData: ReasonOfFallData[] = [
// 	{ reason: "Halkade", value: 23.4 },
// 	{ reason: "Yrsel", value: 15.0 },
// 	{ reason: "Mörker", value: 30.0 },
// 	{ reason: "Olämpliga skor", value: 22.0 },
// 	{ reason: "Icke fungerande hjälpmedel", value: 10.0 },
// ]

export const placeOfFallData: PlaceOfFallData[] = [
	{ place: "Inside", people: 240 },
	{ place: "Outside", people: 87 },
]

const genderData: GenderData[] = [
	{ gender: "Male", value: 51.3 },
	{ gender: "Female", value: 23.1 },
	{ gender: "Other", value: 0.6 },
]

const ageData: AgeData[] = [
	{ ageGroup: "65-69", falls: 233 },
	{ ageGroup: "70-74", falls: 189 },
	{ ageGroup: "75-79", falls: 302 },
	{ ageGroup: "80-84", falls: 274 },
	{ ageGroup: "85-89", falls: 211 },
	{ ageGroup: "90-94", falls: 153 },
	{ ageGroup: "95-99", falls: 82 },
	{ ageGroup: "99+", falls: 40 },
]
const getAllMonths = () => [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]
const Dashboard: React.FC = () => {
	const [monthOfFallData, setMonthOfFallData] = useState<MonthDataPoint[]>([])
	const [reasonOfFallData, setReasonOfFallData] = useState<ReasonOfFallData[]>(
		[]
	)
	const [placeOfFallsData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([])

	useEffect(() => {
		const loadReports = async () => {
			const reports: Report[] = await fetchReports()

			// Count falls per month
			const fallCountByMonth = reports.reduce((acc, report) => {
				const month = new Date(report.accident_date).toLocaleString("default", {
					month: "short",
				})
				acc[month] = (acc[month] || 0) + 1
				return acc
			}, {} as Record<string, number>)

			// Ensure all months are included
			const allMonths = getAllMonths()
			const monthData: MonthDataPoint[] = allMonths.map((month) => ({
				name: month,
				value: fallCountByMonth[month] || 0, // Default to 0 if no data
			}))

			setMonthOfFallData(monthData)

			// Count reasons of fall
			const fallReasonCounts = reports.reduce((acc, report) => {
				report.fallReason.forEach((reason) => {
					acc[reason] = (acc[reason] || 0) + 1
				})
				return acc
			}, {} as Record<string, number>)

			// Convert the reason counts into ReasonOfFallData format
			const reasonData: ReasonOfFallData[] = Object.entries(
				fallReasonCounts
			).map(([reason, value]) => ({
				reason,
				value: (value / reports.length) * 100, // Convert to percentage
			}))
			setReasonOfFallData(reasonData)

			// Process place of fall data
			const placeData = getPlaceOfFallData(reports)
			setPlaceOfFallData(placeData)
		}

		loadReports()
	}, [])

	return (
		<div className="h-screen w-full p-4 dark:bg-boxdark rounded-lg">
			<div className="grid grid-cols-1 md:grid-cols-8 gap-7 h-full">
				{/* First Column */}
				<div className="md:col-span-5 flex flex-col gap-y-4 h-full">
					<SectionHeader title="Month Of Fall" year="Year" />
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<MonthOfFallChart data={monthOfFallData} />
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black dark:text-bodydark mb-4">
							Reason Of Fall
						</h2>
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
						<h2 className="text-xl font-semibold text-black dark:text-bodydark">
							Gender
						</h2>
						<Gender data={genderData} />
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
