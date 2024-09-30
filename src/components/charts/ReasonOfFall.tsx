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
import { useNumberAnimation } from "../../hooks/useNumberAnimation"
import { ReasonOfFallData, ReasonOfFallProps } from "../../types"

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

const CustomDot = (props: DotProps) => {
	const { cx, cy, stroke } = props

	// Check if the dot is on the right side (usually the last point)
	if (cx && cx > 50) {
		return (
			<rect
				x={cx! - 6}
				y={cy! - 6}
				width={12}
				height={12}
				rx={6}
				ry={6}
				fill={stroke}
				stroke="none"
			/>
		)
	}
	return null
}

const AnimatedValue = ({ value }: { value: number }) => {
	const animatedValue = useNumberAnimation(value)
	return <span>{animatedValue.toFixed()}</span>
}

const ReasonOfFall: React.FC<ReasonOfFallProps> = ({ data = [] }) => {
	if (!Array.isArray(data) || data.length === 0) {
		return <div>No data available</div>
	}

	const maxValue = Math.max(...data.map((d) => d.value))
	const colors = ["#FF8F6B", "#5B93FF"]
	const minLineWidth = 50 // Minimum width for very small values
	const maxLineWidth = 250 // Maximum width for the largest value

	return (
		<div className="flex flex-col space-y-1 h-64 overflow-y-auto">
			{/* Set fixed height and overflow */}
			{data.map((item, index) => {
				// Calculate the dynamic width as a percentage of the max value
				const lineWidth = Math.max(
					minLineWidth,
					(item.value / maxValue) * maxLineWidth
				)

				return (
					<div
						key={index}
						className="flex items-center justify-between sm:space-x-6">
						<span className="w-1/4 text-sm text-left">{item.reason}</span>
						<div
							className="flex-grow flex justify-start"
							style={{ maxWidth: `${maxLineWidth}px` }}>
							<div
								style={{
									width: `${lineWidth}px`,
									maxWidth: `${maxLineWidth}`,
								}}>
								<ResponsiveContainer width="100%" height={12}>
									<LineChart
										data={[
											{ x: 0, value: 0 },
											{ x: 1, value: item.value },
										]}>
										<Line
											type="linear"
											dataKey="value"
											stroke={colors[index % colors.length]}
											strokeWidth={12}
											dot={<CustomDot />}
											animationDuration={2000}
											animationEasing="ease-in-out"
										/>
										<YAxis hide={true} domain={[0, maxValue]} />
										<XAxis hide={true} dataKey="x" />
										<Tooltip content={<CustomTooltip />} />
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>
						<span className="w-12 text-sm text-right">
							<AnimatedValue value={item.value} />
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default ReasonOfFall
