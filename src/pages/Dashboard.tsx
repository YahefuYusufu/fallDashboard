import React from "react"
import MonthOfFallChart, {
	MonthDataPoint,
} from "../components/charts/MonthOfFall"
import SectionHeader from "../components/charts/SectionHeader"
import ReasonOfFall, {
	ReasonOfFallData,
} from "../components/charts/ReasonOfFall"
import PlaceOfFall from "../components/charts/PlaceOfFall"

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

export const sampleReasonOfFallData: ReasonOfFallData[] = [
	{ reason: "Halkade", value: 23.4 },
	{ reason: "Yrsel", value: 15.0 },
	{ reason: "Mörker", value: 30.0 },
	{ reason: "Olämpliga skor", value: 22.0 },
	{ reason: "Icke fungerande hjälpmedel", value: 10.0 },
]

export const placeOfFallData = [
	{ place: "Inside", people: 240 },
	{ place: "Outside", people: 187 },
]

const Dashboard: React.FC = () => {
	return (
		<div className="h-screen w-full p-4 dark:bg-boxdark rounded-lg">
			<div className="grid grid-cols-1 md:grid-cols-8 gap-7 h-full">
				{/* First Column */}
				<div className="md:col-span-5 flex flex-col gap-y-4 h-full">
					<SectionHeader title="Month Of Fall" year="Year" />
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<MonthOfFallChart data={sampleMonthOfFallData} />
					</div>

					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black mb-4">
							Reason Of Fall
						</h2>
						<ReasonOfFall data={sampleReasonOfFallData} />
					</div>
				</div>

				{/* Second Column */}
				<div className="md:col-span-3 flex flex-col gap-y-4 h-full">
					<SectionHeader title="Place Of Fall" year="Year" />
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<PlaceOfFall data={placeOfFallData} />
					</div>
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black">Gender</h2>
					</div>
					<div className="bg-white dark:bg-bodydark2 p-4 rounded-lg shadow-md flex-1">
						<h2 className="text-xl font-semibold text-black">Age</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
