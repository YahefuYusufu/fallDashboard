/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import {
	HomeIcon,
	CalendarIcon,
	ChartBarIcon,
	BellIcon,
	CogIcon,
	ArrowRightStartOnRectangleIcon,
	Bars3CenterLeftIcon,
} from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
import Logo from "../../assets/hestia_logo.png"
import User from "../../images/user/user-01.png"

interface SidebarProps {
	sidebarOpen: boolean
	setSidebarOpen: (arg: boolean) => void
	theme: "light" | "dark" // Add theme prop or use context/hook for theme management
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, theme }: SidebarProps) => {
	const trigger = useRef<any>(null)
	const sidebar = useRef<any>(null)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

	const storedSideBarExpanded = localStorage.getItem("sidebar-expanded")
	const [sidebarExpanded] = useState(
		storedSideBarExpanded === null ? false : storedSideBarExpanded === "true"
	)

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

	const handleMouseEnter = (index: number) => {
		setHoveredIndex(index)
	}

	const handleMouseLeave = () => {
		setHoveredIndex(null)
	}

	const handleLinkClick = (index: number) => {
		setActiveIndex(index)
		setSidebarOpen(false)
	}

	const isActive = (index: number) =>
		activeIndex === index || hoveredIndex === index

	// Determine colors based on theme
	const iconColor = theme === "dark" ? "text-bodydark" : "text-body"
	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-27.5 flex-col overflow-y-hidden bg-whiter duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}>
			{/* SIDEBAR HEADER */}
			<div className="flex items-center justify-between gap-1 px-8 py-5.5 lg:py-2.5">
				<Link to="/" className="hidden lg:block">
					<img
						src={Logo}
						alt="Logo"
						className="transition-transform duration-300 ease-in-out transform hover:scale-125"
					/>
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

			{/* SIDEBAR CONTENT */}
			<Link to="/" className="ml-1">
				<ul className="p-6">
					<li
						className="p-4 flex items-center justify-between hover:bg-blue-500 rounded-lg transition duration-300 ease-in-out"
						onClick={() => handleLinkClick(0)}>
						<Bars3CenterLeftIcon className="w-5 h-5 text-slate-300 transition-transform duration-300 ease-in-out transform hover:scale-125" />
						<a href="/hamburger" />
					</li>
				</ul>
			</Link>
			<div className="mt-8">
				<ul>
					{[
						{
							to: "/",
							icon: (
								<HomeIcon className="w-5 h-5 text-slate-300 transition-transform duration-300 ease-in-out transform hover:scale-125" />
							),
						},
						{
							to: "/calendar",
							icon: (
								<CalendarIcon className="w-5 h-5 text-slate-300 transition-transform duration-300 ease-in-out transform hover:scale-125" />
							),
						},
						{
							to: "/analysis",
							icon: (
								<ChartBarIcon className="w-5 h-5 text-slate-300 transition-transform duration-300 ease-in-out transform hover:scale-125" />
							),
						},
						{
							to: "/notification",
							icon: (
								<BellIcon className="w-5 h-5 text-slate-300 transition-transform duration-300 ease-in-out transform hover:scale-125" />
							),
						},
						{
							to: "/settings",
							icon: (
								<CogIcon className="w-6 h-6 text-slate-300 transition-transform duration-300 ease-in-out transform hover:scale-110" />
							),
						},
					].map(({ to, icon }, index) => (
						<li
							key={index}
							className="relative flex items-center p-5 rounded-lg transition duration-300 ease-in-out"
							onMouseEnter={() => handleMouseEnter(index)}
							onMouseLeave={handleMouseLeave}
							onClick={() => setActiveIndex(index)}>
							<div className="relative flex items-center w-full  pl-5 hover:bg-blue-500 rounded-lg">
								{/* Blue line */}
								<div
									className={`absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 transition-all duration-300 ease-in-out ${
										isActive(index) ? "opacity-100" : "opacity-0"
									}`}
								/>
								<Link to={to} className="flex items-center w-full space-x-2">
									<div className="p-1 rounded-full transition duration-300 ease-in-out">
										{icon}
									</div>
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* PROFILE IMAGE AND LOGOUT */}
			<div className="mt-auto flex flex-col items-center justify-center p-6 mb-1">
				{/* Profile Image */}
				<div className="flex space-x-4 mb-6">
					<img
						src={User}
						alt="User"
						className="w-8 h-8 rounded-full border border-gray-300 transition-transform duration-300 ease-in-out transform hover:scale-125"
					/>
				</div>

				{/* Logout Button */}
				<div className="flex justify-center">
					<button className="p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
						<ArrowRightStartOnRectangleIcon className="w-5 h-5 text-white" />
					</button>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
