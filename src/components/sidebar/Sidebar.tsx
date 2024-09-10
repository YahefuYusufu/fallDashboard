/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import {
	Home,
	Calendar,
	BarChart,
	Bell,
	Settings,
	AlignLeft,
} from "react-feather"
import { Link, useLocation } from "react-router-dom"
import Logo from "../../assets/logo.svg"

interface SidebarProps {
	sidebarOpen: boolean
	setSidebarOpen: (arg: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	const location = useLocation()
	const { pathname } = location

	const trigger = useRef<any>(null)
	const sidebar = useRef<any>(null)

	const storedSideBarExpanded = localStorage.getItem("sidebar-expanded")
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSideBarExpanded === null ? false : storedSideBarExpanded === "true"
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
	}, [sidebarOpen])

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return
			setSidebarOpen(false)
		}
		document.addEventListener("keydown", keyHandler)
		return () => document.removeEventListener("keydown", keyHandler)
	}, [sidebarOpen])

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
			className={`absolute left-0 top-0 z-9999 flex h-screen w-27.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}>
			{/* <!-- SIDEBAR   --> */}

			<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
				<Link to="/">
					<img src={Logo} alt="Logo" />
				</Link>
				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls="sidebar"
					aria-expanded={sidebarOpen}
					className="block lg:hidden">
					<svg
						className="fill-current ml-4"
						width="20"
						height="18"
						viewBox="0 0 20 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
							fill=""
						/>
					</svg>
				</button>
			</div>

			{/* <!-- SIDEBAR   --> */}
			<div>
				<ul className="p-6">
					<li className="p-4 flex item-center justify-between indigo-700">
						<AlignLeft size={22} color="#51459E" />
						<a href="/hunburger" />
					</li>
				</ul>
			</div>
			<div>
				<ul className="p-6 mb-12">
					<li className="p-4 flex items-center">
						<Link to="/">
							<Home size={20} />
						</Link>
					</li>
					<li className="p-4 flex items-center">
						<Link to="/calendar">
							<Calendar size={20} />
						</Link>
					</li>
					<li className="p-4 flex items-center">
						<Link to="/analysis">
							<BarChart size={20} />
						</Link>
					</li>
					<li className="p-4 flex items-center">
						<Link to="/notification">
							<Bell size={20} />
						</Link>
					</li>
					<li className="p-4 flex items-center">
						<Link to="/settings">
							<Settings size={20} />
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	)
}

export default Sidebar
