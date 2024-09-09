import React from "react"
import { Home, Calendar, PieChart, Bell, Settings, Menu } from "react-feather"

const Drawer: React.FC = () => {
	return (
		<div className="fixed top-0 left-0 h-full w-32 bg-gray-200  ">
			<div className="">
				<li className="p-2 flex">
					<Menu size={24} />
					<a href="/hunburger" />
				</li>
			</div>
			<div>
				<ul className="p-4">
					<li className="p-2 flex items-center">
						<Home size={24} />
						<a href="/home" />
					</li>
					<li className="p-2 flex items-center">
						<Calendar size={24} />
						<a href="/calendar" />
					</li>
					<li className="p-2 flex items-center">
						<PieChart size={24} />
						<a href="/analysis" />
					</li>
					<li className="p-2 flex items-center">
						<Bell size={24} />
						<a href="/notification" />
					</li>
					<li className="p-2 flex items-center">
						<Settings size={24} />
						<a href="/settings" />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Drawer
