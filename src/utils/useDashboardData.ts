import { useEffect, useState } from "react"
import { fetchReportsJson } from "../data/fetchReports"
import {
	AgeData,
	MonthDataPoint,
	PlaceOfFallData,
	ReasonOfFallData,
	Report,
	GenderData,
} from "../types"
import { getPlaceOfFallData } from "../utils/fallAlgorithms"
import { filterReportsByDate } from "../utils/dateUtils"
import { calculateAgeDistribution } from "../utils/AgeUtils"
import { getAllMonths, getMonthFromDate } from "../utils/getMonthFromDate"
import { getGenderAndAgeFromPersonNumber } from "../utils/getGenderAndAgeFromPersonNumber"

const useDashboardData = (
	startDate: Date | null,
	endDate: Date | null,
	setReports: (reports: Report[]) => void
) => {
	const [monthOfFallData, setMonthOfFallData] = useState<MonthDataPoint[]>([])
	const [reasonOfFallData, setReasonOfFallData] = useState<ReasonOfFallData[]>(
		[]
	)
	const [placeOfFallsData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([])
	const [ageData, setAgeData] = useState<AgeData[]>([])
	const [genderData, setGenderData] = useState<GenderData[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const loadReports = async () => {
			setLoading(true)

			try {
				const fetchedReports: Report[] = await fetchReportsJson()
				console.log("Fetched Reports:", fetchedReports)
				setReports(fetchedReports)

				const filteredReports =
					startDate && endDate
						? filterReportsByDate(fetchedReports, startDate, endDate)
						: fetchedReports

				if (filteredReports.length === 0) {
					setMonthOfFallData([])
					setReasonOfFallData([])
					setPlaceOfFallData([])
					setAgeData([])
					setGenderData([])
					return
				}

				// Month of Fall
				const fallCountByMonth = filteredReports.reduce((acc, report) => {
					const month = getMonthFromDate(report.accident_date)
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
					value,
				}))
				setReasonOfFallData(reasonData)

				// Place of Fall
				const placeData = getPlaceOfFallData(filteredReports)
				setPlaceOfFallData(placeData)

				// Age distribution
				const ageDistribution = calculateAgeDistribution(filteredReports)
				setAgeData(ageDistribution)

				// Gender distribution
				const genderCounts = filteredReports.reduce(
					(acc, report) => {
						try {
							const { gender } = getGenderAndAgeFromPersonNumber(
								report.person_number
							)
							if (gender === "man" || gender === "kvinna") {
								acc[gender] += 1
							}
						} catch (error) {
							console.error(
								`Error processing person number: ${report.person_number}`,
								error
							)
						}
						return acc
					},
					{ man: 0, kvinna: 0 } as Record<"man" | "kvinna", number>
				)

				const totalCount = genderCounts.man + genderCounts.kvinna
				const genderDataArray: GenderData[] = [
					{ gender: "man", value: (genderCounts.man / totalCount) * 100 },
					{ gender: "kvinna", value: (genderCounts.kvinna / totalCount) * 100 },
				]

				setGenderData(genderDataArray)
			} catch (error) {
				console.error("Error loading reports:", error)
			} finally {
				setLoading(false)
			}
		}

		loadReports()
	}, [startDate, endDate, setReports])

	return {
		monthOfFallData,
		reasonOfFallData,
		placeOfFallsData,
		ageData,
		genderData,
		loading,
	}
}

export default useDashboardData
