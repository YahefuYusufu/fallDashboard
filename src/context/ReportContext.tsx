import {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from "react"
import {
	countFallsByMonth,
	countFallsByReason,
	countFallsByPlace,
} from "../utils/fallAlgorithms"
import { calculateAgeDistribution } from "../utils/AgeUtils"
import { getGenderAndAgeFromPersonNumber } from "../utils/getGenderAndAgeFromPersonNumber"
import {
	MonthlyFallCount,
	PlaceOfFallData,
	ReasonFallCount,
	GenderData,
	AgeData,
	Report,
} from "../types" // Import the Report type

interface ReportContextType {
	reports: Report[] // An array of Report objects
	monthlyFallCount: MonthlyFallCount // A single MonthlyFallCount object
	reasonFallCount: ReasonFallCount // Reason fall count data
	placeOfFallData: PlaceOfFallData[] // Place of fall data
	genderData: GenderData[] // Gender data
	ageData: AgeData[] // Age data
	setReports: (reports: Report[]) => void // Function to set reports
}

// Create the context
const ReportContext = createContext<ReportContextType | undefined>(undefined)

// Create a provider component
export const ReportProvider = ({ children }: { children: ReactNode }) => {
	const [reports, setReports] = useState<Report[]>([]) // Initialize reports with the Report[] type
	const [monthlyFallCount, setMonthlyFallCount] = useState<MonthlyFallCount>({}) // Monthly fall count data
	const [reasonFallCount, setReasonFallCount] = useState<ReasonFallCount>({}) // Reason fall count data
	const [placeOfFallData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([]) // Place of fall data
	const [genderData, setGenderData] = useState<GenderData[]>([]) // Gender data
	const [ageData, setAgeData] = useState<AgeData[]>([]) // Age data

	// Update all calculated data whenever the reports change
	useEffect(() => {
		if (reports.length === 0) {
			// Reset all counts if there are no reports
			setMonthlyFallCount({}) // Reset to an empty object
			setReasonFallCount({})
			setPlaceOfFallData([])
			setGenderData([])
			setAgeData([])
			return
		}

		// Calculate Monthly Fall Count
		const newMonthlyFallCount = countFallsByMonth(reports)
		setMonthlyFallCount(newMonthlyFallCount)

		// Reason Fall Count Calculation
		const newReasonFallCount = countFallsByReason(reports)
		setReasonFallCount(newReasonFallCount)

		// Place of Fall Calculation
		const newPlaceOfFallData = countFallsByPlace(reports)
		setPlaceOfFallData(newPlaceOfFallData)

		// Gender Distribution Calculation
		const genderCount = reports.reduce(
			(acc, report) => {
				const { person_number } = report
				if (typeof person_number !== "string" || person_number.length < 10) {
					return acc
				}

				const { gender } = getGenderAndAgeFromPersonNumber(person_number)

				if (gender === "male") {
					acc.male += 1
				} else if (gender === "female") {
					acc.female += 1
				} else {
					acc.other += 1
				}
				return acc
			},
			{ male: 0, female: 0, other: 0 }
		)

		const totalCount = genderCount.male + genderCount.female + genderCount.other
		const newGenderData: GenderData[] = [
			{ gender: "male", value: (genderCount.male / totalCount) * 100 },
			{ gender: "female", value: (genderCount.female / totalCount) * 100 },
			{ gender: "other", value: (genderCount.other / totalCount) * 100 },
		]
		setGenderData(newGenderData)

		// Age Distribution Calculation
		const newAgeData = calculateAgeDistribution(reports)
		setAgeData(newAgeData)
	}, [reports])

	return (
		<ReportContext.Provider
			value={{
				reports,
				monthlyFallCount,
				reasonFallCount,
				placeOfFallData,
				genderData,
				ageData,
				setReports,
			}}>
			{children}
		</ReportContext.Provider>
	)
}

// Custom hook to use the ReportContext
export const useReportContext = () => {
	const context = useContext(ReportContext)
	if (!context) {
		throw new Error("useReportContext must be used within a ReportProvider")
	}
	return context
}
