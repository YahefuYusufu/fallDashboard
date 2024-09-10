import React from "react"
import {
	Home,
	Calendar,
	PieChart,
	Bell,
	Settings,
	AlignLeft,
} from "react-feather"

interface SidebarProps {
	sidebarOpen: boolean
	setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	return (
		<div className="fixed top-0 left-0 h-full w-24 bg-gray-200  ">
			<div>
				<ul className="p-4">
					<li className="p-4 flex item-center justify-between indigo-700">
						<AlignLeft size={22} color="#51459E" />
						<a href="/hunburger" />
					</li>
				</ul>
			</div>
			<div>
				<ul className="p-4">
					<li className="p-4 flex items-center">
						<Home size={20} />
						<a href="/home" />
					</li>
					<li className="p-4 flex items-center">
						<Calendar size={20} color="#030229" />
						<a href="/calendar" />
					</li>
					<li className="p-4 flex items-center">
						<PieChart size={20} color="#030229" />
						<a href="/analysis" />
					</li>
					<li className="p-4 flex items-center">
						<Bell size={20} color="#030229" />
						<a href="/notification" />
					</li>
					<li className="p-4 flex items-center">
						<Settings size={20} color="#030229" />
						<a href="/settings" />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Sidebar
