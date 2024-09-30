// src/utils/fetchDashboardData.ts
import { fetchReportsJson } from "../data/fetchReports"
import { Report } from "../types"
import { getPlaceOfFallData } from "../utils/fallAlgorithms"
import { filterReportsByDate } from "../utils/dateUtils"
import { calculateAgeDistribution } from "../utils/AgeUtils"
import { getAllMonths, getMonthFromDate } from "../utils/getMonthFromDate"

export const fetchDashboardData = async (
	startDate: Date | null,
	endDate: Date | null,
	setReports: (reports: Report[]) => void
) => {
	const fetchedReports: Report[] = await fetchReportsJson()
	console.log("Fetched Reports:", fetchedReports)
	setReports(fetchedReports)

	const filteredReports =
		startDate && endDate
			? filterReportsByDate(fetchedReports, startDate, endDate)
			: fetchedReports

	const monthOfFallData = getMonthOfFallData(filteredReports)
	const reasonOfFallData = getReasonOfFallData(filteredReports)
	const placeOfFallsData = getPlaceOfFallData(filteredReports)
	const ageData = calculateAgeDistribution(filteredReports)

	return { monthOfFallData, reasonOfFallData, placeOfFallsData, ageData }
}

const getMonthOfFallData = (reports: Report[]) => {
	const fallCountByMonth = reports.reduce((acc, report) => {
		const month = getMonthFromDate(report.accident_date)
		if (month) {
			acc[month] = (acc[month] || 0) + 1
		}
		return acc
	}, {} as Record<string, number>)

	const allMonths = getAllMonths()
	return allMonths.map((month) => ({
		name: month,
		value: fallCountByMonth[month] || 0,
	}))
}

const getReasonOfFallData = (reports: Report[]) => {
	const fallReasonCounts = reports.reduce((acc, report) => {
		report.fallReason.forEach((reason) => {
			acc[reason] = (acc[reason] || 0) + 1
		})
		return acc
	}, {} as Record<string, number>)

	return Object.entries(fallReasonCounts).map(([reason, value]) => ({
		reason,
		value,
	}))
}
