import React, { createContext, useState, useContext, ReactNode } from "react"
import {
	countFallsByMonth,
	countFallsByReason,
	countFallsByPlace,
} from "../utils/fallAlgorithms"
import {
	MonthlyFallCount,
	PlaceOfFallData,
	ReasonFallCount,
	Report,
} from "../types" // Import the Report type

interface ReportContextType {
	reports: Report[] // An array of Report objects
	monthlyFallCount: MonthlyFallCount // Keyed by month name
	reasonFallCount: ReasonFallCount // Keyed by reason
	placeOfFallData: PlaceOfFallData[] // Array of places and counts
	setReports: (reports: Report[]) => void // Function to set reports
	setPlaceOfFallData: (data: PlaceOfFallData[]) => void // Function to set place of fall data
}

// Create the context
const ReportContext = createContext<ReportContextType | undefined>(undefined)

// Create a provider component
export const ReportProvider = ({ children }: { children: ReactNode }) => {
	const [reports, setReports] = useState<Report[]>([]) // Initialize reports with the Report[] type
	const [placeOfFallData, setPlaceOfFallData] = useState<PlaceOfFallData[]>([]) // Initialize placeOfFallData

	// Calculate the monthly fall count and reason fall count
	const monthlyFallCount = countFallsByMonth(reports)
	const reasonFallCount = countFallsByReason(reports)
	const placeData = countFallsByPlace(reports) // Function to get place of fall data

	// Update placeOfFallData whenever reports change
	React.useEffect(() => {
		setPlaceOfFallData(placeData)
	}, [reports, placeData])

	return (
		<ReportContext.Provider
			value={{
				reports,
				monthlyFallCount,
				reasonFallCount,
				placeOfFallData,
				setReports,
				setPlaceOfFallData,
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
