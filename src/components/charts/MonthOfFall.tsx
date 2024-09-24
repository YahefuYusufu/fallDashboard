import React, { useState } from "react"
import {
	LineChart,
	Line,
	XAxis,
	Tooltip,
	ResponsiveContainer,
	ReferenceDot,
	Label,
	YAxis,
} from "recharts"

// Define the type for our data points
export interface MonthDataPoint {
	name: string
	value: number
}

// Define the props for our component
export interface MonthOfFallChartProps {
	data: MonthDataPoint[]
}

const MonthOfFallChart: React.FC<MonthOfFallChartProps> = ({ data }) => {
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

	// Function to handle month click
	const handleMonthClick = (month: string) => {
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
				y={y + 40} // Increase the vertical position for more space
				fill={isSelected ? "#4E4E4E" : "#A3ABBD"}
				fontWeight={isSelected ? "bold" : "normal"}
				textAnchor="middle"
				style={{ cursor: "pointer" }}
				onClick={() => handleMonthClick(month)}>
				{month}
			</text>
		)
	}

	// Find the selected data point
	const selectedDataPoint = data.find((point) => point.name === selectedMonth)

	return (
		<>
			<style>{`.custom-li::marker { color: blue; }`}</style>
			<div className="flex justify-between items-center">
				<li className="text-xl font-bold ml-auto custom-li">Current Period</li>
			</div>

			<div className="w-full" style={{ height: 300 }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={data}
						margin={{ top: 25, right: 20, left: 20, bottom: 20 }} // Increase bottom margin for more space
					>
						<XAxis
							dataKey="name"
							tick={renderCustomAxisTick}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis hide />
						<Tooltip animationEasing="ease-in-out" />
						<Line
							type="natural"
							dataKey="value"
							stroke="#563BFF"
							strokeWidth={5}
							dot={false}
							animationDuration={2000}
							animationEasing="ease-in-out"
						/>
						{selectedDataPoint && (
							<ReferenceDot
								r={6}
								fill="#2D9CDB"
								stroke="#1C1C1E"
								strokeWidth={2}
								x={selectedDataPoint.name}
								y={selectedDataPoint.value}
								isFront={true}>
								<Label
									value={`Value: ${selectedDataPoint.value}`}
									position="top" // Position the label on top
									offset={10} // Increase offset to prevent overlapping
									fill="#333333"
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
