/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react"
import {
	Home,
	Calendar,
	PieChart,
	Bell,
	Settings,
	AlignLeft,
} from "react-feather"
import { useLocation } from "react-router-dom"

interface SidebarProps {
	sidebarOpen: boolean
	setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	const location = useLocation()
	const { pathname } = location

	const trigger = useRef<any>(null)
	const sidebar = useRef<any>(null)

	const storeedSideBarExpanded = localStorage.getItem("sidebar-expanded")
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storeedSideBarExpanded === null ? false : storeedSideBarExpanded === "true"
	)

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return
			if (
				!sidebarOpen ||
				sidebar.current.contains(target) ||
				trigger.current.contains(target)
			)
				return
			setSidebarOpen(false)
		}
		document.addEventListener("click", clickHandler)
		return () => document.removeEventListener("click", clickHandler)
	})

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return
			setSidebarOpen(false)
		}
		document.addEventListener("keydown", keyHandler)
		return () => document.removeEventListener("keydown", keyHandler)
	})

	useEffect(() => {
		localStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
		if (sidebarExpanded) {
			document.querySelector("body")?.classList.add("sidebar-expanded")
		} else {
			document.querySelector("body")?.classList.remove("sidebar-expanded")
		}
	}, [sidebarExpanded])

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}>
			<div>
				<ul className="p-4">
					<li className="p-4 flex item-center justify-between indigo-700">
						<AlignLeft size={22} color="#51459E" />
						<a href="/hunburger" />
					</li>
				</ul>
			</div>
			<div>
				<ul className="p-4 mb-12">
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
		</aside>
	)
}

export default Sidebar
