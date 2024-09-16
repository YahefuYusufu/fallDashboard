import React from "react"
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts"

export interface ReasonOfFallData {
	reason: string
	value: number
}

export interface ReasonOfFallProps {
	data: ReasonOfFallData[]
}

const ReasonOfFall: React.FC<ReasonOfFallProps> = ({ data }) => {
	return (
		<div className="w-full h-[295px] mt-8 relative">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="reason" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="value" fill="#FF8F6B" />
				</BarChart>
			</ResponsiveContainer>

			{/* Y-axis labels */}
			<div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2">
				{[30, 22, 15, 10, 0].map((value, index) => (
					<div
						key={index}
						className="text-sm text-[#030229] font-medium opacity-70">
						{value.toFixed(2)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ReasonOfFall
