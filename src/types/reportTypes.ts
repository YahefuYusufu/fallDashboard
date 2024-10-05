/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Report {
	id: number
	elderly_name: string
	was_fall_last_3_months: boolean | string
	accident_date: string
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
