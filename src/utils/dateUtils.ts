import { Report } from "../types"

export const filterReportsByDate = (
	reports: Report[],
	startDate: Date | null,
	endDate: Date | null
): Report[] => {
	return reports.filter((report) => {
		const reportDate = new Date(report.accident_date)
		return (
			(!startDate || reportDate >= startDate) &&
			(!endDate || reportDate <= endDate)
		)
	})
}
