import { useState } from "react"
import DarkModeSwitcher from "./DarkModeSwitcher"
import TimePicker from "./CustomDatePicker"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

const Header = (props: {
	sidebarOpen: string | boolean | undefined
	setSidebarOpen: (arg0: boolean) => void
}) => {
	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)

	return (
		<header className="sticky top-0 z-999 flex w-full  drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
			<div className="flex flex-grow items-center justify-between px-4 py-4   md:px-6 2xl:px-11">
				<div className="flex items-center gap-2 sm:gap-4 lg:hidden">
					{/* Hamburger Toggle BTN */}
					<button
						aria-controls="sidebar"
						onClick={(e) => {
							e.stopPropagation()
							props.setSidebarOpen(!props.sidebarOpen)
						}}
						className="z-99999 block rounded-sm border border-stroke bg-white text-bodydark2 p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden">
						{/* Hamburger Icon */}
						<span className="relative block h-5.5 w-5.5 cursor-pointer">
							{/* Inner lines for hamburger with animation */}
							<span
								className={`absolute top-0 left-0 w-full h-0.5 bg-bodydark2 dark:bg-white transition-transform duration-300 ${
									props.sidebarOpen ? "rotate-45 translate-y-2" : ""
								}`}></span>
							<span
								className={`absolute top-2 left-0 w-full h-0.5 bg-bodydark2 dark:bg-white transition-opacity duration-300 ${
									props.sidebarOpen ? "opacity-0" : ""
								}`}></span>
							<span
								className={`absolute top-4 left-0 w-full h-0.5 bg-bodydark2 dark:bg-white transition-transform duration-300 ${
									props.sidebarOpen ? "-rotate-45 -translate-y-2" : ""
								}`}></span>
						</span>
					</button>
					{/* Hamburger Toggle BTN */}
				</div>
				<div className="hidden sm:block">
					<form action="https://formbold.com/s/unique_form_id" method="POST">
						<div className="relative">
							<input
								type="text"
								placeholder="Type to search..."
								className="w-full  dark:bg-body text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:ring-opacity-50 transition-all duration-500 ease-in-out transform xl:w-125"
							/>
							<button
								type="submit"
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary dark:text-bodydark2 dark:hover:text-blue-600">
								<MagnifyingGlassIcon className="w-5 h-5" />
							</button>
						</div>
					</form>
				</div>
				{/*datePicker*/}
				<div className="lg:flex md:flex  items-center gap-4 hidden sm:hidden">
					<TimePicker
						selectedDate={startDate}
						onChange={(date) => setStartDate(date)}
						placeHolder="From"
					/>
					<TimePicker
						selectedDate={endDate}
						onChange={(date) => setEndDate(date)}
						placeHolder="To"
					/>
				</div>

				<div className="flex items-center gap-2 lg:hidden">
					<DarkModeSwitcher />
				</div>
			</div>
		</header>
	)
}

export default Header
