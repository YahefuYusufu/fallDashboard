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
import Age, { AgeData } from "../components/charts/Age"
import { fetchReportsJson } from "../data/fetchReports"
import { GenderData, Report } from "../types"
import { getPlaceOfFallData } from "../utils/fallAlgorithms"
import { filterReportsByDate } from "../utils/dateUtils"
import { useDateContext } from "../context/DateContext"
import { getGenderAndAgeFromPersonNumber } from "../utils/getGenderAndAgeFromPersonNumber"
import { calculateAgeDistribution } from "../utils/AgeUtils"
import { getAllMonths, getMonthFromDate } from "../utils/getMonthFromDate"

const Dashboard: React.FC = () => {
	const { startDate, endDate } = useDateContext()
	const [monthOfFallData, setMonthOfFallData] = useState<MonthDataPoint[]>([])
	const [reasonOfFallData, setReasonOfFallData] = useState<ReasonOfFallData[]>(
		[]
	)
	const [placeOfFallsData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([])
	const [filteredReports, setFilteredReports] = useState<Report[]>([])
	const [ageData, setAgeData] = useState<AgeData[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const [, setGenderData] = useState<GenderData[]>([])

	useEffect(() => {
		const loadReports = async () => {
			setLoading(true)

			try {
				// Fetch real reports from API
				const reports: Report[] = await fetchReportsJson()
				console.log("Fetched Reports:", reports)

				// Filter reports by selected dates (if any)
				const filteredReports =
					startDate && endDate
						? filterReportsByDate(reports, startDate, endDate)
						: reports

				setFilteredReports(filteredReports)

				// If no reports, reset the charts
				if (filteredReports.length === 0) {
					setMonthOfFallData([])
					setReasonOfFallData([])
					setPlaceOfFallData([])
					setAgeData([])
					return
				}

				// 1. Month of Fall
				const fallCountByMonth = filteredReports.reduce((acc, report) => {
					const month = getMonthFromDate(report.accident_date) // Here it handles the string
					if (month) {
						acc[month] = (acc[month] || 0) + 1
					}
					return acc
				}, {} as Record<string, number>)

				const allMonths = getAllMonths()
				const monthData: MonthDataPoint[] = allMonths.map((month) => ({
					name: month,
					value: fallCountByMonth[month] || 0,
				}))

				setMonthOfFallData(monthData)

				// 2. Reasons of Fall
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
					value,
				}))
				setReasonOfFallData(reasonData)

				// 3. Place of Fall
				const placeData = getPlaceOfFallData(filteredReports)
				setPlaceOfFallData(placeData)

				// 4. Gender distribution
				const genderCount = filteredReports.reduce(
					(acc, report) => {
						const { person_number } = report // Extract person_number
						// Check if person_number is valid
						if (
							typeof person_number !== "string" ||
							person_number.length < 10
						) {
							return acc // Skip to the next report
						}

						const { gender } = getGenderAndAgeFromPersonNumber(person_number)

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

				// 5. Age distribution
				const ageDistribution = calculateAgeDistribution(filteredReports)
				setAgeData(ageDistribution)
			} catch (error) {
				console.error("Error loading reports:", error)
			} finally {
				setLoading(false)
			}
		}

		// Fetch and set the data when component mounts or dates change
		loadReports()
	}, [startDate, endDate]) // Dependency on date changes

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
						<Gender data={filteredReports} />
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
