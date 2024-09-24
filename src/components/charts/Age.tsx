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

const RoundedBar = (props: DotProps) => {
	const { x, y, width, height, fill } = props
	const radius = 3
	return (
		<g>
			<rect
				x={x}
				y={y}
				width={width}
				height={height}
				rx={radius}
				ry={radius}
				fill={fill}
			/>
		</g>
	)
}

const Age: React.FC<AgeDataProps> = ({ data = [] }) => {
	const [barSize, setBarSize] = useState<number>(10)

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth
			if (screenWidth < 640) {
				setBarSize(6)
			} else if (screenWidth >= 640 && screenWidth < 1024) {
				setBarSize(8)
			} else {
				setBarSize(10)
			}
		}

		handleResize()
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<div className="flex flex-col items-center space-x-2">
			<div className="w-full h-[236px] sm:w-[200px] md:w-[250px] md:h-[180px] lg:w-[300px] lg:h-[180px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						data={data}
						barCategoryGap="20%"
						margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
						<XAxis
							dataKey="ageGroup"
							tick={{ fontSize: 9 }}
							axisLine={false}
							tickLine={false}
							interval={0}
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
