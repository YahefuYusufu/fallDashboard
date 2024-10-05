import React from "react"
import {
	LineChart,
	Line,
	YAxis,
	Tooltip,
	XAxis,
	ResponsiveContainer,
	DotProps,
} from "recharts"
import { useState, useEffect } from "react"
import { CustomTooltipProps, GenderData } from "../../types"

export interface GenderChartProps {
	data: GenderData[]
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-2 border border-gray-300 rounded shadow">
				<p>{`${payload[0].value.toFixed(1)}%`}</p>
			</div>
		)
	}
	return null
}

const CustomDot = (props: DotProps) => {
	const { cx, cy, stroke } = props
	if (typeof cx === "number" && typeof cy === "number" && cx > 50) {
		return (
			<rect
				x={cx - 5}
				y={cy - 5}
				width={10}
				height={10}
				rx={3}
				ry={3}
				fill={stroke}
				stroke="none"
			/>
		)
	}
	return null
}

const useNumberAnimation = (endValue: number) => {
	const [animatedValue, setAnimatedValue] = useState(0)

	useEffect(() => {
		let startTime: number
		const duration = 2000

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime
			const elapsedTime = currentTime - startTime
			const progress = Math.min(elapsedTime / duration, 1)
			setAnimatedValue(progress * endValue)

			if (progress < 1) {
				requestAnimationFrame(animate)
			}
		}

		requestAnimationFrame(animate)
	}, [endValue])

	return animatedValue
}

const AnimatedValue = ({ value }: { value: number }) => {
	const animatedValue = useNumberAnimation(value)
	return <span>{animatedValue.toFixed(0)}%</span>
}

const Gender: React.FC<GenderChartProps> = ({ data }) => {
	if (!Array.isArray(data) || data.length === 0) {
		return <div>No data available</div>
	}

	const maxValue = Math.max(...data.map((d) => d.value))
	const colors = ["#FF8F6B", "#5B93FF"]
	const minLineWidth = 30
	const maxLineWidth = 200

	return (
		<div className="flex flex-col space-y-4 mt-4">
			<div className="w-full h-[1px]" style={{ backgroundColor: "#3E71A4" }} />

			{data.map((item, index) => {
				const lineWidth = Math.max(
					minLineWidth,
					(item.value / maxValue) * maxLineWidth
				)

				return (
					<div
						key={index}
						className="flex items-center justify-between sm:space-x-6">
						<span className="w-1/4 text-sm text-left sm:text-sm">
							{item.gender.charAt(0).toUpperCase() + item.gender.slice(1)}
						</span>
						<div className="flex-grow flex justify-start my-3 md:max-w-[160px] lg:max-w-[200px]">
							<div
								className="w-full"
								style={{
									maxWidth: `${lineWidth}px`,
								}}>
								<ResponsiveContainer width="100%" height={12}>
									<LineChart
										data={[
											{ x: 0, value: item.value },
											{ x: 1, value: item.value },
										]}>
										<Line
											type="monotone"
											dataKey="value"
											stroke={colors[index % colors.length]}
											strokeWidth={10}
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
						<span className="w-16 text-sm text-right">
							<AnimatedValue value={item.value} />
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default Gender
