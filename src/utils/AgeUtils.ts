import { Report } from "../types"
import { getGenderAndAgeFromPersonNumber } from "./getGenderAndAgeFromPersonNumber"

export interface AgeData {
	ageGroup: string
	falls: number
}

export const calculateAgeDistribution = (reports: Report[]): AgeData[] => {
	const ageGroups = {
		"65-69": 0,
		"70-74": 0,
		"75-79": 0,
		"80-84": 0,
		"85-89": 0,
		"90-94": 0,
		"95-99": 0,
		"99+": 0,
	}

	reports.forEach((report) => {
		const { age } = getGenderAndAgeFromPersonNumber(report.person_number)
		if (age < 65) return // Ignore ages below 65
		if (age >= 65 && age <= 69) ageGroups["65-69"]++
		else if (age <= 74) ageGroups["70-74"]++
		else if (age <= 79) ageGroups["75-79"]++
		else if (age <= 84) ageGroups["80-84"]++
		else if (age <= 89) ageGroups["85-89"]++
		else if (age <= 94) ageGroups["90-94"]++
		else if (age <= 99) ageGroups["95-99"]++
		else ageGroups["99+"]++
	})

	// Convert to array and ensure all groups are included, even if falls is 0
	return Object.entries(ageGroups).map(([ageGroup, falls]) => ({
		ageGroup,
		falls,
	}))
}
