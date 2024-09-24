import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

interface DatePickerProps {
	selectedDate: Date | null
	onDateChange: (date: Date | null) => void
	placeHolder: string
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
	selectedDate,
	onDateChange,
	placeHolder,
}) => {
	return (
		<div className="relative flex items-center gap-3 transition-transform transform hover:scale-105 lg:scale-100">
			<DatePicker
				selected={selectedDate}
				onChange={(date) => {
					console.log("Selected date at CustomDatePicker:", date) // Debugging line
					onDateChange(date)
				}}
				dateFormat="MMM d, yyyy"
				placeholderText={placeHolder}
				className="w-full bg-gray-100 dark:bg-body text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 pl-2 pr-1 py-2  rounded-lg shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ease-in-out"
			/>
			<ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-300 cursor-pointer" />
		</div>
	)
}

export default CustomDatePicker
