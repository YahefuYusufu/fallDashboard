/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Report {
	id: number
	elderly_name: string
	was_fall_last_3_months: boolean | string
	accident_date: string // In ISO format or standard date string
	accident_time: string
	accident_place: string
	witness: string
	additional_content: string
	was_fall_inside: boolean
	person_number: string
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
export interface AgeData {
	ageGroup: string
	falls: number
}

export interface ReasonOfFallData {
	reason: string
	value: number
}

export interface ReasonOfFallProps {
	data: ReasonOfFallData[]
}

export interface MonthDataPoint {
	name: string
	value: number
}

export interface MonthOfFallChartProps {
	data: MonthDataPoint[]
}

export interface PlaceOfFallData {
	place: string
	people: number
}

export interface PlaceOfFallProps {
	data: PlaceOfFallData[]
}

export interface AgeData {
	ageGroup: string
	falls: number
}

export interface AgeDataProps {
	data: AgeData[]
}
