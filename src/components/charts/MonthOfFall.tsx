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
import { MonthOfFallChartProps } from "../../types"

const MonthOfFallChart: React.FC<MonthOfFallChartProps> = ({ data }) => {
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

	// Function to handle month click
	const handleMonthClick = (month: string) => {
		setSelectedMonth(month)
	}

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
				y={y + 40}
				fill={isSelected ? "#3C50E0" : "#AEB7C0"}
				fontWeight={isSelected ? "bold" : "normal"}
				textAnchor="middle"
				style={{ cursor: "pointer" }}
				onClick={() => handleMonthClick(month)}>
				{month}
			</text>
		)
	}

	// Check if data is empty
	if (!data || data.length === 0) {
		return <div>No data available</div>
	}

	const selectedDataPoint = data.find((point) => point.name === selectedMonth)

	return (
		<>
			<style>{`.custom-li::marker { color: blue; }`}</style>

			<div className="w-full" style={{ height: 300 }}>
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={data}
						margin={{ top: 25, right: 20, left: 20, bottom: 23 }}>
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
							stroke="#3C50E0"
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
									value={`Antal: ${selectedDataPoint.value}`}
									position="top"
									offset={10}
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
