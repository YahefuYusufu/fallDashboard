import { Report } from "../types"

export const filterReportsByDate = (
	reports: Report[],
	startDate: Date | null,
	endDate: Date | null
): Report[] => {
	// If both dates are not set, return all reports
	if (!startDate && !endDate) {
		return reports
	}

	return reports.filter((report) => {
		const reportDate = new Date(report.accident_date) // Adjust this as needed

		// If both dates are set, filter by date range
		if (startDate && endDate) {
			return reportDate >= startDate && reportDate <= endDate
		}

		// If only startDate is set, filter by startDate
		if (startDate) {
			return reportDate >= startDate
		}

		// If only endDate is set, filter by endDate
		if (endDate) {
			return reportDate <= endDate
		}

		// Default case (shouldn't hit here due to the earlier check)
		return true
	})
}
