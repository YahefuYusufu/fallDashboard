import React from "react"
import MonthOfFallChart from "../components/charts/MonthOfFall"

const Dashboard: React.FC = () => {
	return (
		<div className="h-screen w-full p-4 dark:bg-boxdark rounded-lg">
			<div className="grid grid-cols-1 md:grid-cols-8 gap-4 h-full">
				{/* First Column */}
				<div className="md:col-span-5 grid grid-cols-1 gap-4">
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<li className="text-xl font-semibold">Month of Fall</li>
						<MonthOfFallChart data={[]} />
					</div>
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold">Chart 2</h2>
						{/* Render your chart component here */}
					</div>
				</div>

				{/* Second Column */}
				<div className="md:col-span-3 grid grid-cols-1 gap-4">
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold">Chart 3</h2>
						{/* Render your chart component here */}
					</div>
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold">Chart 4</h2>
						{/* Render your chart component here */}
					</div>
					<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
						<h2 className="text-xl font-semibold">Chart 5</h2>
						{/* Render your chart component here */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
