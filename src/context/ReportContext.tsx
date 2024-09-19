import { createContext, useState, useContext, ReactNode } from "react"
import { countFallsByMonth, countFallsByReason } from "../utils/fallAlgorithms"
import { Report } from "../types/report" // Import the Report type

// Define the context types
interface ReportContextType {
	reports: Report[] // An array of Report objects
	monthlyFallCount: { [key: string]: number } // Keyed by month name
	reasonFallCount: { [key: string]: number } // Keyed by reason
	setReports: (reports: Report[]) => void // A function that accepts an array of reports
}

// Create the context
const ReportContext = createContext<ReportContextType | undefined>(undefined)

// Create a provider component
export const ReportProvider = ({ children }: { children: ReactNode }) => {
	const [reports, setReports] = useState<Report[]>([]) // Initialize reports with the Report[] type

	// Calculate the monthly fall count and reason fall count
	const monthlyFallCount = countFallsByMonth(reports)
	const reasonFallCount = countFallsByReason(reports)

	return (
		<ReportContext.Provider
			value={{
				reports,
				monthlyFallCount,
				reasonFallCount,
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
