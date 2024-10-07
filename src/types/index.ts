import { TooltipProps } from "recharts"

// types/fallTypes.ts
export * from "./reportTypes"
export interface MonthlyFallCount {
	[month: string]: number
}
export interface MonthDataPoint {
	name: string
	value: number
}
export interface ReasonFallCount {
	[reason: string]: number
}
export interface MonthOfFallChartProps {
	data: MonthDataPoint[]
}
export interface PlaceOfFallData {
	place: string
	people: number
}

export interface ReasonOfFallData {
	reason: string
	value: number
}

export interface ReasonOfFallProps {
	data: ReasonOfFallData[]
}

export interface PlaceOfFallData {
	place: string
	people: number
}

export interface PlaceOfFallProps {
	data: PlaceOfFallData[]
}
export interface GenderData {
	gender: "man" | "kvinna"
	value: number
}

export interface AgeData {
	ageGroup: string
	falls: number
}
export interface AgeDataProps {
	data: AgeData[]
}

export interface CustomTooltipProps extends TooltipProps<number, string> {
	active?: boolean
	payload?: Array<{
		value: number
		payload: PlaceOfFallData
	}>
	label?: string
}
