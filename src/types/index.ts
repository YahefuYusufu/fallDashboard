/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Report {
	id: number
	elderly_name: string
	was_fall_last_3_months: boolean | string
	accident_date: string // In ISO format or standard date string
	accident_time: string
	accident_place: string
	witness: string // If we don't know the structure of witness yet
	additional_content: string
	person_number: string // Swedish person number (format: YYYYMMDD-XXXX)
	fallReason: string[]
	userActivity: string[]
	precedingSymptoms: string[]
	fallConsequence: string[]
	injuryType: string[]
	takenMeasures: string[]
	photos: string[]
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
export interface GenderData {
	gender: "male" | "female" | "other"
	value: number
}
