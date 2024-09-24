import { Report } from "../types" // Import the Report type

// Simulate fetching reports data (e.g., from a JSON file or mock API)
export const fetchReports = async (): Promise<Report[]> => {
	try {
		// Simulate a delay for fetching the data (optional)
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				import("../data/mock_fall_reports.json")
					.then((data) => {
						resolve(data.default) // Assuming the JSON file is default exported
					})
					.catch((error) => {
						console.error("Error fetching mock reports", error)
						reject(error) // Pass the error to be handled later
					})
			}, 500) // Simulated delay of 500ms
		})
	} catch (error) {
		console.error("Unexpected error in fetchReports", error)
		throw new Error("Failed to fetch reports")
	}
}
