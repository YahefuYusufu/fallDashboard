export const getMonthFromDate = (dateString: string): string | null => {
	const date = new Date(dateString)
	if (isNaN(date.getTime())) {
		return null // Return null if the date is invalid
	}
	const monthIndex = date.getMonth() // 0-based index
	const monthNames = getAllMonths()
	return monthNames[monthIndex]
}
export const getAllMonths = (): string[] => [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
]
