import React from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts"

// Define the type for our data points
export interface MonthDataPoint {
	name: string
	value: number
}

// Define the props for our component
interface MonthOfFallChartProps {
	data: MonthDataPoint[]
}

// Sample data - replace with your actual data
const sampleMonthOfFallData: MonthDataPoint[] = [
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

const MonthOfFallChart: React.FC<MonthOfFallChartProps> = ({
	data = sampleMonthOfFallData,
}) => {
	return (
		<div className="w-full h-[400px] bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
			<div className="flex justify-end items-center mb-4">
				<h2 className="text-xl font-semibold mr-4">Month of Fall</h2>
			</div>
			<div className="w-full h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="value"
							stroke="#8884d8"
							strokeWidth={2}
							dot={{ r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default MonthOfFallChart
