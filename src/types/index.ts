/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Report {
	id: number
	elderly_name: string
	was_fall_last_3_months: string
	accident_date: string // In ISO format or standard date string
	accident_time: string
	accident_place: string
	witness: string // If we don't know the structure of witness yet
	additional_content: string
	fallReason: string[] // An array of strings
	userActivity: string[] // An array of strings
	precedingSymptoms: string[] // An array of strings
	fallConsequence: string[] // An array of strings
	injuryType: string[] // An array of strings
	takenMeasures: string[] // An array of strings
	photos: string[] // An array of photo URIs or empty
}

// types/fallTypes.ts
export interface MonthlyFallCount {
	[month: string]: number
}

export interface ReasonFallCount {
	[reason: string]: number
}

export interface PlaceOfFallData {
	place: string
	people: number
}
