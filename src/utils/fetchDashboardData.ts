// src/utils/fetchDashboardData.ts
import { fetchReports } from "../data/fetchReports"
import { GenderData, Report } from "../types"
import { getPlaceOfFallData } from "../utils/fallAlgorithms"
import { filterReportsByDate } from "../utils/dateUtils"
import { calculateAgeDistribution } from "../utils/AgeUtils"
import { getAllMonths, getMonthFromDate } from "../utils/getMonthFromDate"
import { getGenderAndAgeFromPersonNumber } from "./getGenderAndAgeFromPersonNumber"

export const fetchDashboardData = async (
	startDate: Date | null,
	endDate: Date | null,
	setReports: (reports: Report[]) => void
) => {
	const fetchedReports: Report[] = await fetchReports()
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
	const genderData = getGenderData(filteredReports)

	return {
		monthOfFallData,
		reasonOfFallData,
		placeOfFallsData,
		ageData,
		genderData,
	}
}

const getGenderData = (reports: Report[]): GenderData[] => {
	const genderCounts = reports.reduce(
		(acc, report) => {
			try {
				const { gender } = getGenderAndAgeFromPersonNumber(report.person_number)
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
	return [
		{ gender: "man", value: (genderCounts.man / totalCount) * 100 },
		{ gender: "kvinna", value: (genderCounts.kvinna / totalCount) * 100 },
	]
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
