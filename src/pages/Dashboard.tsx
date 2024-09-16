import React from "react"
import MonthOfFallChart, {
	MonthDataPoint,
} from "../components/charts/MonthOfFall"

// Sample data - replace with your actual data
export const sampleMonthOfFallData: MonthDataPoint[] = [
	{ name: "Jan", value: 30 },
	{ name: "Feb", value: 25 },
	{ name: "Mar", value: 35 },
	{ name: "Apr", value: 40 },
	{ name: "May", value: 28 },
	{ name: "Jun", value: 32 },
	{ name: "Jul", value: 38 },
	{ name: "Aug", value: 42 },
	{ name: "Sep", value: 30 },
	{ name: "Oct", value: 35 },
	{ name: "Nov", value: 28 },
	{ name: "Dec", value: 32 },
]

const Dashboard: React.FC = () => {
	return (
		<div className="h-screen w-full p-4 dark:bg-boxdark rounded-lg">
			<div className="grid grid-cols-1 md:grid-cols-8 gap-4 h-full">
				{/* First Column */}
				<div className="md:col-span-5 flex flex-col gap-y-4 h-full">
					<div className="flex justify-between">
						<h2 className="text-lg font-bold">Month Of Fall</h2>
						<h4 className="font-semibold">Year</h4>
					</div>
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<MonthOfFallChart data={sampleMonthOfFallData} />
					</div>
					<div className="flex">
						<h2 className="text-lg font-bold">Reason Of Fall</h2>
					</div>
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold">Chart 2</h2>
						{/* Render your chart component here */}
					</div>
				</div>

				{/* Second Column */}
				<div className="md:col-span-3 grid grid-cols-1 gap-4">
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold">Chart 3</h2>
						{/* Render your chart component here */}
					</div>
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold">Chart 4</h2>
						{/* Render your chart component here */}
					</div>
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold">Chart 5</h2>
						{/* Render your chart component here */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
