import React from "react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts"

export interface AgeData {
	ageGroup: string
	falls: number
}

export interface AgeDataProps {
	data: AgeData[]
}

const Age: React.FC<AgeDataProps> = ({ data = [] }) => {
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
						<Bar dataKey="falls" fill="#FF8F6B" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}

export default Age
