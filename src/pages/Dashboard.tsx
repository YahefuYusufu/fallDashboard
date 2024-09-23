import React, { useEffect, useState } from "react"
import MonthOfFallChart, {
	MonthDataPoint,
} from "../components/charts/MonthOfFall"
import SectionHeader from "../components/charts/SectionHeader"
import ReasonOfFall, {
	ReasonOfFallData,
} from "../components/charts/ReasonOfFall"
import PlaceOfFall, { PlaceOfFallData } from "../components/charts/PlaceOfFall"
import Gender from "../components/charts/Gender"
import Age from "../components/charts/Age"
import { fetchReports } from "../data/fetchReports"
import { GenderData, Report } from "../types"
import { getPlaceOfFallData } from "../utils/fallAlgorithms"
import { filterReportsByDate } from "../utils/dateUtils"
import { useDateContext } from "../context/DateContext"
import { getGenderAndAgeFromPersonNumber } from "../utils/getGenderAndAgeFromPersonNumber"

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
	const { startDate, endDate } = useDateContext()
	console.log("Start Date at dashboard:", startDate)
	console.log("End Date at dashboard:", endDate)
	const [monthOfFallData, setMonthOfFallData] = useState<MonthDataPoint[]>([])
	const [reasonOfFallData, setReasonOfFallData] = useState<ReasonOfFallData[]>(
		[]
	)
	const [placeOfFallsData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([])
	const [genderData, setGenderData] = useState<GenderData[]>([])
	const [filteredReports, setFilteredReports] = useState<Report[]>([])

	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const loadReports = async () => {
			setLoading(true)

			try {
				const reports: Report[] = await fetchReports()
				console.log("Start Date at Dashboard:", startDate)
				console.log("End Date at Dashboard:", endDate)
				// Check if both dates are set
				const filteredReports =
					startDate && endDate
						? filterReportsByDate(reports, startDate, endDate)
						: reports
				setFilteredReports(filteredReports)
				console.log("Filtered Reports at Dashboard:", filteredReports)

				if (filteredReports.length === 0) {
					setMonthOfFallData([])
					setReasonOfFallData([])
					setPlaceOfFallData([])
					return
				}

				// Month of Fall
				const fallCountByMonth = filteredReports.reduce((acc, report) => {
					const reportDate = new Date(report.accident_date)
					const month = reportDate.toLocaleString("default", { month: "short" })

					// Log each report's month for debugging
					console.log("Report Date:", reportDate, "Month:", month)

					acc[month] = (acc[month] || 0) + 1
					return acc
				}, {} as Record<string, number>)

				console.log("Fall Count By Month:", fallCountByMonth)

				const allMonths = getAllMonths()
				const monthData: MonthDataPoint[] = allMonths.map((month) => ({
					name: month,
					value: fallCountByMonth[month] || 0,
				}))

				setMonthOfFallData(monthData)

				// Reasons of Fall
				const fallReasonCounts = filteredReports.reduce((acc, report) => {
					report.fallReason.forEach((reason) => {
						acc[reason] = (acc[reason] || 0) + 1
					})
					return acc
				}, {} as Record<string, number>)

				const reasonData: ReasonOfFallData[] = Object.entries(
					fallReasonCounts
				).map(([reason, value]) => ({
					reason,
					value: (value / filteredReports.length) * 100,
				}))
				setReasonOfFallData(reasonData)

				// Place of Fall
				const placeData = getPlaceOfFallData(filteredReports)
				setPlaceOfFallData(placeData)

				// Gender distribution calculation
				const genderCount = filteredReports.reduce(
					(acc, report) => {
						const { gender } = getGenderAndAgeFromPersonNumber(
							report.person_number
						)

						if (gender === "male") {
							acc.male += 1
						} else if (gender === "female") {
							acc.female += 1
						} else {
							acc.other += 1
						}
						return acc
					},
					{ male: 0, female: 0, other: 0 }
				)

				const totalCount =
					genderCount.male + genderCount.female + genderCount.other

				const genderData: GenderData[] = [
					{ gender: "male", value: (genderCount.male / totalCount) * 100 },
					{ gender: "female", value: (genderCount.female / totalCount) * 100 },
					{ gender: "other", value: (genderCount.other / totalCount) * 100 },
				]

				setGenderData(genderData)
			} catch (error) {
				console.error("Error loading reports:", error)
			} finally {
				setLoading(false)
			}
		}
		loadReports()
	}, [startDate, endDate])

	return (
		<div className="h-screen w-full p-4 dark:bg-boxdark rounded-lg">
			{loading && <p>Loading ....</p>}
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
						<Gender data={fetchReports} />
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black dark:text-bodydark mb-2">
							Age
						</h2>
						<Age />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
