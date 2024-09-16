import React from "react"
import {
	LineChart,
	Line,
	YAxis,
	Tooltip,
	XAxis,
	ResponsiveContainer,
	TooltipProps,
	DotProps,
} from "recharts"

export interface ReasonOfFallData {
	reason: string
	value: number
}

export interface ReasonOfFallProps {
	data: ReasonOfFallData[]
}

interface CustomTooltipProps extends TooltipProps<number, string> {
	active?: boolean
	payload?: Array<{
		value: number
		payload: ReasonOfFallData
	}>
	label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-2 border border-gray-300 rounded shadow">
				<p>{`${payload[0].value}`}</p>
			</div>
		)
	}
	return null
}

// Custom dot to add a circular effect to the end of the line
const CustomDot = (props: DotProps) => {
	const { cx, cy } = props
	return (
		<circle
			cx={cx}
			cy={cy}
			r={6} // Adjust size of the circle here
			stroke="none"
			fill={props.stroke}
			style={{
				borderTopRightRadius: "10px", // Simulate the rounded corner
			}}
		/>
	)
}

const ReasonOfFall: React.FC<ReasonOfFallProps> = ({ data = [] }) => {
	if (!Array.isArray(data) || data.length === 0) {
		// Handle the case when data is not an array or is empty
		return <div>No data available</div>
	}

	const maxValue = Math.max(...data.map((d) => d.value))
	const colors = ["#FF8F6B", "#5B93FF"]
	const minLineWidth = 100 // Minimum fixed width for the lines
	const containerWidth = 400 // Width of the container for responsive design

	return (
		<div className="flex flex-col space-y-4">
			{data.map((item, index) => {
				// Calculate the dynamic width as a percentage of the max value
				const dynamicWidth =
					(item.value / maxValue) * (containerWidth - minLineWidth) +
					minLineWidth // Adjusting width proportionally
				const lineWidth = Math.max(minLineWidth, dynamicWidth) // Ensure width doesn't go below minimum

				return (
					<div
						key={index}
						className="flex items-center justify-between relative">
						<span className="w-1/4 text-sm text-left">{item.reason}</span>
						<div
							className="flex-grow flex justify-center"
							style={{ width: `${lineWidth}px` }}>
							<ResponsiveContainer width="100%" height={6}>
								<LineChart
									data={[
										{ x: 0, value: 0 }, // Starting point
										{ x: 1, value: item.value }, // End point with item value
									]}>
									<Line
										type="linear" // Make lines straight
										dataKey="value"
										stroke={colors[Math.floor(Math.random() * colors.length)]} // Random color
										strokeWidth={12}
										dot={<CustomDot />} // Custom dot on the right top
									/>
									<XAxis hide={true} dataKey="x" />{" "}
									{/* X-axis to fix the line */}
									<YAxis hide={true} domain={[0, maxValue]} />
									<Tooltip content={<CustomTooltip />} />
								</LineChart>
							</ResponsiveContainer>
						</div>
						<span className="w-12 text-sm text-right">
							{item.value.toFixed(1)}
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default ReasonOfFall
