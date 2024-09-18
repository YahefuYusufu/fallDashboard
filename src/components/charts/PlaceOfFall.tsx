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

// import { AnnotationIcon } from "@heroicons/react/outline"

export interface PlaceOfFallData {
	place: string
	people: number
}

export interface PlaceOfFallProps {
	data: PlaceOfFallData[]
}

interface CustomTooltipProps extends TooltipProps<number, string> {
	active?: boolean
	payload?: Array<{
		value: number
		payload: PlaceOfFallData
	}>
	label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white p-2 border border-gray-300 rounded shadow">
				<p>{`${payload[0].value} people`}</p>
			</div>
		)
	}
	return null
}

const CustomDot = (props: DotProps) => {
	const { cx, cy, stroke } = props

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

const AnimatedValue = ({ value }: { value: number }) => {
	const animatedValue = useNumberAnimation(value)
	return <span>{animatedValue}</span>
}

const AnimatedPercentage = ({ value }: { value: number }) => {
	const animatedValue = useNumberAnimation(value)
	return <span>{animatedValue.toFixed(1)}%</span>
}

const PlaceOfFall: React.FC<PlaceOfFallProps> = ({ data = [] }) => {
	if (!Array.isArray(data) || data.length === 0) {
		return <div>No data available</div>
	}

	const totalPeople = data.reduce((acc, curr) => acc + curr.people, 0)
	const colors = ["#FF8F6B", "#5B93FF"]

	const insideData = data.find((item) => item.place === "Inside")
	const outsideData = data.find((item) => item.place === "Outside")

	const insidePercentage = insideData
		? (insideData.people / totalPeople) * 100
		: 0
	const outsidePercentage = outsideData
		? (outsideData.people / totalPeople) * 100
		: 0

	return (
		<div className="flex flex-col space-y-4 w-full">
			{data.map((item, index) => {
				const lineWidth = Math.max(
					30,
					(item.people / Math.max(...data.map((d) => d.people))) * 90
				)

				return (
					<div
						key={index}
						className="relative flex flex-col items-center w-full">
						<div className="flex flex-col items-center space-y-2 w-full">
							<div className="flex flex-row items-center justify-between w-full overflow-hidden">
								<span className="w-1/4 text-xs sm:text-sm md:text-base text-left flex-shrink-0">
									{item.place}
								</span>
								<div
									className="flex-grow flex justify-start"
									style={{ maxWidth: `120px`, width: "100%" }}>
									<div
										className="w-full"
										style={{
											width: `${lineWidth}px`,
											minWidth: `40px`,
											maxWidth: `120px`,
										}}>
										<ResponsiveContainer width="100%" height={10}>
											<LineChart
												data={[
													{ x: 0, people: 0 },
													{ x: 1, people: item.people },
												]}>
												<Line
													type="monotone"
													dataKey="people"
													stroke={colors[index % colors.length]}
													strokeWidth={10}
													dot={<CustomDot />}
													animationDuration={2000}
													animationEasing="ease-in-out"
												/>
												<YAxis
													hide={true}
													domain={[0, Math.max(...data.map((d) => d.people))]}
												/>
												<XAxis hide={true} dataKey="x" />
												<Tooltip content={<CustomTooltip />} />
											</LineChart>
										</ResponsiveContainer>
									</div>
								</div>

								<div className="flex flex-row items-center justify-end text-xs sm:text-sm md:text-sm space-x-1 sm:space-x-2 w-1/4">
									<AnimatedValue value={item.people} />
									<span className="hidden sm:inline">people</span>
									{/* <AnnotationIcon className="h-4 w-4 text-gray-500" /> 
									Adjust size and color as needed */}
								</div>
							</div>
						</div>
					</div>
				)
			})}

			<div className="flex flex-row justify-center space-x-8 sm:space-x-16 w-full mt-8 sm:mt-10">
				<div className="relative flex flex-col items-center">
					<span className="mt-7">Inside</span>
					<div
						className="w-7 h-7 rounded-lg mt-2"
						style={{
							background: colors[0],
						}}
					/>
					<div className="text-center text-xs mt-3">
						<AnimatedPercentage value={insidePercentage} />
					</div>
				</div>
				<div className="relative flex flex-col items-center">
					<span className="mt-7">Outside</span>
					<div
						className="w-7 h-7 rounded-lg mt-2"
						style={{
							background: colors[1],
						}}
					/>
					<div className="text-center text-xs mt-3">
						<AnimatedPercentage value={outsidePercentage} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PlaceOfFall
