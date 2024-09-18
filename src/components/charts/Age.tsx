import React, { useState, useEffect } from "react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	DotProps,
} from "recharts"

export interface AgeData {
	ageGroup: string
	falls: number
}

export interface AgeDataProps {
	data: AgeData[]
}

// Custom shape for the bars with rounded top corners
const RoundedBar = (props: DotProps) => {
	const { x, y, width, height, fill } = props
	const radius = 3 // Adjust the border radius value as needed
	return (
		<g>
			<rect
				x={x}
				y={y}
				width={width}
				height={height}
				rx={radius} // Applies the border-radius to the top corners
				ry={radius}
				fill={fill}
			/>
		</g>
	)
}

const Age: React.FC<AgeDataProps> = ({ data = [] }) => {
	// State to store the dynamic bar size
	const [barSize, setBarSize] = useState<number>(10)

	// Adjust bar size based on screen width
	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth
			if (screenWidth < 640) {
				// Small screens
				setBarSize(10)
			} else if (screenWidth >= 640 && screenWidth < 1024) {
				// Medium screens
				setBarSize(10)
			} else {
				// Large screens
				setBarSize(10)
			}
		}

		// Set initial bar size based on current screen width
		handleResize()

		// Add event listener for screen resizing
		window.addEventListener("resize", handleResize)

		// Cleanup event listener
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<div className="flex flex-col items-center space-x-2">
			{/* Bar Chart */}
			<div className="w-full h-[236px] sm:w-[200px] md:w-[250px] md:h-[180px] lg:w-[300px] lg:h-[180px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						barCategoryGap="20%"
						margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
						<XAxis
							dataKey="ageGroup"
							tick={{ fontSize: 11 }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis hide={true} />
						<Tooltip />
						<Bar
							dataKey="falls"
							fill="#FF8F6B"
							barSize={barSize}
							shape={<RoundedBar />}
							animationDuration={2000}
							animationEasing="ease-in-out"
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default Age
