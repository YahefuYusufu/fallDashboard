import { Report } from "../types" // Import the Report type

// Simulate fetching reports data (e.g., from a JSON file or mock API)
export const fetchReportsJson = async (): Promise<Report[]> => {
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

export const fetchReports = async (): Promise<Report[]> => {
	try {
		// Fetch data from the endpoint
		const response = await fetch("http://192.168.1.168:3000/api/reports", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})

		// Check if the request was successful
		if (!response.ok) {
			throw new Error(`Error fetching reports: ${response.statusText}`)
		}

		// Parse the response data as JSON
		const data: Report[] = await response.json()

		return data
	} catch (error) {
		console.error("Error fetching reports", error)
		throw new Error("Failed to fetch reports")
	}
}
