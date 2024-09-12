import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

interface DatePickerProps {
	selectedDate: Date | null
	onChange: (date: Date | null) => void
	placeHolder: string
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
	selectedDate,
	onChange,
	placeHolder,
}) => {
	return (
		<div className="flex items-center gap-3">
			<DatePicker
				selected={selectedDate}
				onChange={(date: Date | null) => onChange(date)}
				dateFormat="MMM d, yyyy"
				placeholderText={placeHolder}
				className="w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 pl-4 pr-10 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-primary dark:focus:ring-primary focus:ring-opacity-50 transition-all duration-300 ease-in-out"
			/>
			<ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-300 pointer-events-none" />
		</div>
	)
}

export default CustomDatePicker
