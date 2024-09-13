import React from "react"

const Dashboard: React.FC = () => {
	return (
		<div className="h-screen w-full  p-4 dark:bg-boxdark rounded-lg ">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
				<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Chart 1</h2>
					{/* Render your chart component here */}
				</div>
				<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Chart 2</h2>
					{/* Render your chart component here */}
				</div>
				<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Chart 3</h2>
					{/* Render your chart component here */}
				</div>
				<div className="bg-bodydark1 dark:bg-bodydark2 p-4 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Chart 4</h2>
					{/* Render your chart component here */}
				</div>
			</div>
		</div>
	)
}

export default Dashboard
