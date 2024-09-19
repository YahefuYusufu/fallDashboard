import { Report } from "../types/report" // Import the Report type

// Simulate fetching reports data (e.g., from a JSON file or mock API)
export const fetchReports = async (): Promise<Report[]> => {
	// Simulate a delay for fetching the data (optional)
	return new Promise((resolve) => {
		setTimeout(() => {
			// Fetch or import the mock data here
			import("../data/mock_fall_reports.json")
				.then((data) => {
					resolve(data.default) // Assuming the JSON file is default exported
				})
				.catch((error) => {
					console.error("Error fetching mock reports", error)
					resolve([]) // Return empty if error
				})
		}, 500) // Simulated delay of 500ms
	})
}
