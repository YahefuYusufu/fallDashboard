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
} from "../types"

interface ReportContextType {
	reports: Report[]
	monthlyFallCount: MonthlyFallCount
	reasonFallCount: ReasonFallCount
	placeOfFallData: PlaceOfFallData[]
	genderData: GenderData[]
	ageData: AgeData[]
	setReports: (reports: Report[]) => void
}

const ReportContext = createContext<ReportContextType | undefined>(undefined)

export const ReportProvider = ({ children }: { children: ReactNode }) => {
	const [reports, setReports] = useState<Report[]>([])
	const [monthlyFallCount, setMonthlyFallCount] = useState<MonthlyFallCount>({})
	const [reasonFallCount, setReasonFallCount] = useState<ReasonFallCount>({})
	const [placeOfFallData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([])
	const [genderData, setGenderData] = useState<GenderData[]>([])
	const [ageData, setAgeData] = useState<AgeData[]>([])

	useEffect(() => {
		if (reports.length === 0) {
			setMonthlyFallCount({})
			setReasonFallCount({})
			setPlaceOfFallData([])
			setGenderData([])
			setAgeData([])
			return
		}

		const newMonthlyFallCount = countFallsByMonth(reports)
		setMonthlyFallCount(newMonthlyFallCount)

		const newReasonFallCount = countFallsByReason(reports)
		setReasonFallCount(newReasonFallCount)

		const newPlaceOfFallData = countFallsByPlace(reports)
		setPlaceOfFallData(newPlaceOfFallData)

		const genderCount = reports.reduce(
			(acc, report) => {
				const { person_number } = report
				if (typeof person_number !== "string" || person_number.length < 10) {
					return acc
				}

				const { gender } = getGenderAndAgeFromPersonNumber(person_number)

				if (gender === "man") {
					acc.man += 1
				} else if (gender === "kvinna") {
					acc.kvinna += 1
				}
				return acc
			},
			{ male: 0, female: 0 }
		)

		const totalCount = genderCount.man + genderCount.kvinna
		const newGenderData: GenderData[] = [
			{ gender: "man", value: (genderCount.man / totalCount) * 100 },
			{ gender: "kvinna", value: (genderCount.kvinna / totalCount) * 100 },
		]
		setGenderData(newGenderData)

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

export const useReportContext = () => {
	const context = useContext(ReportContext)
	if (!context) {
		throw new Error("useReportContext must be used within a ReportProvider")
	}
	return context
}
