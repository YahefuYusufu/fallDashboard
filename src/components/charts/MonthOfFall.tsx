import React, { useState } from "react"
import {
	LineChart,
	Line,
	XAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	ReferenceDot,
	Label,
} from "recharts"
import { sampleMonthOfFallData } from "../../pages/Dashboard"

// Define the type for our data points
export interface MonthDataPoint {
	name: string
	value: number
}

// Define the props for our component
export interface MonthOfFallChartProps {
	data?: MonthDataPoint[]
}

const MonthOfFallChart: React.FC<MonthOfFallChartProps> = ({
	data = sampleMonthOfFallData, // Default parameter value
}) => {
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

	// Function to handle month click
	const handleMonthClick = (month: string) => {
		console.log("Selected Month:", month) // Debugging line
		setSelectedMonth(month)
	}

	// Custom tick for clickable month names with highlighting
	const renderCustomAxisTick = ({
		x,
		y,
		payload,
	}: {
		x: number
		y: number
		payload: { value: string }
	}) => {
		const month = payload.value
		const isSelected = month === selectedMonth
		return (
			<text
				x={x}
				y={y + 10} // Adjust vertical position
				fill={isSelected ? "#4E4E4E" : "#A3ADDB"} // Highlight selected month
				fontWeight={isSelected ? "bold" : "normal"} // Bold for the selected month
				textAnchor="middle"
				style={{ cursor: "pointer" }}
				onClick={() => handleMonthClick(month)} // Set the selected month when clicked
			>
				{month}
			</text>
		)
	}

	// Find the selected data point
	const selectedDataPoint = data.find((point) => point.name === selectedMonth)

	return (
		<>
			<div className="flex justify-between items-center mb-4">
				<li className="text-xl font-semibold">Month of Fall</li>
			</div>

			<div className="w-full" style={{ height: 300 }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" tick={renderCustomAxisTick} />
						<Tooltip />
						<Line
							type="natural"
							dataKey="value"
							stroke="#563BFF"
							strokeWidth={5}
							dot={false}
						/>
						{selectedDataPoint && (
							<ReferenceDot
								r={6}
								fill="#563BFF"
								stroke="#fff"
								strokeWidth={2}
								x={
									data.findIndex(
										(point) => point.name === selectedDataPoint.name
									) *
									(100 / data.length)
								}
								y={
									300 -
									(selectedDataPoint.value /
										Math.max(...data.map((d) => d.value))) *
										300
								}>
								<Label
									value={`Value: ${selectedDataPoint.value}`}
									position="top"
									offset={10}
									fill="#563BFF"
									fontSize={12}
								/>
							</ReferenceDot>
						)}
					</LineChart>
				</ResponsiveContainer>
			</div>
		</>
	)
}

export default MonthOfFallChart
