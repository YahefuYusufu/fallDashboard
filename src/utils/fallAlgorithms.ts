import { Report } from "../types/report" // Import the Report type

// Utility function to count falls by month
export const countFallsByMonth = (
	reports: Report[]
): { [key: string]: number } => {
	const monthlyFallCount: { [key: string]: number } = {}

	reports.forEach((report) => {
		const date = new Date(report.accident_date)
		const month = date.toLocaleString("default", { month: "long" })
		if (!monthlyFallCount[month]) {
			monthlyFallCount[month] = 0
		}
		monthlyFallCount[month]++
	})

	return monthlyFallCount
}

// Utility function to count falls by reason
export const countFallsByReason = (
	reports: Report[]
): { [key: string]: number } => {
	const reasonFallCount: { [key: string]: number } = {}

	reports.forEach((report) => {
		report.fallReason.forEach((reason: string) => {
			if (!reasonFallCount[reason]) {
				reasonFallCount[reason] = 0
			}
			reasonFallCount[reason]++
		})
	})

	return reasonFallCount
}
