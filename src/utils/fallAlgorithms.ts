import { Report } from "../types"
import { MonthlyFallCount, ReasonFallCount, PlaceOfFallData } from "../types"

// Utility function to count falls by month
export const countFallsByMonth = (reports: Report[]): MonthlyFallCount => {
	const monthlyFallCount: MonthlyFallCount = {}

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
export const countFallsByReason = (reports: Report[]): ReasonFallCount => {
	const reasonFallCount: ReasonFallCount = {}

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

// Utility function to count falls by place
export const countFallsByPlace = (reports: Report[]): PlaceOfFallData[] => {
	const placeCounts: Record<string, number> = {}

	reports.forEach((report) => {
		const place = report.accident_place
		placeCounts[place] = (placeCounts[place] || 0) + 1
	})

	return Object.entries(placeCounts).map(([place, count]) => ({
		place,
		people: count,
	}))
}

export const getPlaceOfFallData = (reports: Report[]): PlaceOfFallData[] => {
	// Create a map to count occurrences of each place
	const placeCounts = reports.reduce((acc, report) => {
		const place = report.accident_place.split(":")[0] // Extract "Inomhus" or "Utomhus" part
		if (place === "Inomhus" || place === "Utomhus") {
			acc[place] = (acc[place] || 0) + 1
		}
		return acc
	}, {} as Record<string, number>)

	// Convert the counts into PlaceOfFallData format
	return Object.entries(placeCounts).map(([place, count]) => ({
		place,
		people: count,
	}))
}
