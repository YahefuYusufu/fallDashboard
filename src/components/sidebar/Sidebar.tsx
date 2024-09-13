import React, { useEffect, useRef, useState, useCallback } from "react"
import {
	ArrowLeftIcon,
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
	theme: "light" | "dark"
}

const navItems = [
	{ to: "/", icon: HomeIcon },
	{ to: "/calendar", icon: CalendarIcon },
	{ to: "/analysis", icon: ChartBarIcon },
	{ to: "/notification", icon: BellIcon },
	{ to: "/settings", icon: CogIcon },
]

const Sidebar: React.FC<SidebarProps> = ({
	sidebarOpen,
	setSidebarOpen,
	theme,
}) => {
	const trigger = useRef<HTMLButtonElement>(null)
	const sidebar = useRef<HTMLDivElement>(null)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

	const clickHandler = useCallback(
		({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return
			if (
				!sidebarOpen ||
				sidebar.current.contains(target as Node) ||
				trigger.current.contains(target as Node)
			)
				return
			setSidebarOpen(false)
		},
		[sidebarOpen, setSidebarOpen]
	)

	const keyHandler = useCallback(
		({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return
			setSidebarOpen(false)
		},
		[sidebarOpen, setSidebarOpen]
	)

	useEffect(() => {
		document.addEventListener("click", clickHandler)
		document.addEventListener("keydown", keyHandler)
		return () => {
			document.removeEventListener("click", clickHandler)
			document.removeEventListener("keydown", keyHandler)
		}
	}, [clickHandler, keyHandler])

	const handleMouseEnter = (index: number) => setHoveredIndex(index)
	const handleMouseLeave = () => setHoveredIndex(null)
	const handleLinkClick = (index: number) => {
		setActiveIndex(index)
		setSidebarOpen(false)
	}

	const isActive = (index: number) =>
		activeIndex === index || hoveredIndex === index

	const iconClassName =
		"w-5 h-5 transition-all duration-300 ease-in-out transform group-hover:scale-125 group-hover:text-white"

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-27.5 flex-col overflow-y-hidden bg-whiter duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? "translate-x-0" : "-translate-x-full"
			}`}>
			{/* SIDEBAR HEADER */}
			<div className="flex items-center justify-between gap-1 px-6 py-5.5 lg:py-2.5">
				<Link to="/" className="hidden lg:block">
					<img
						src={Logo}
						alt="Logo"
						className="transform transition-all duration-300 ease-in-out group-hover:scale-125"
					/>
				</Link>
				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls="sidebar"
					aria-expanded={sidebarOpen}
					className="block lg:hidden">
					<ArrowLeftIcon
						className={`w-6 h-6 ml-4 transform transition-all duration-300 ease-in-out hover:scale-125 
      ${theme === "light" ? "text-bodydark2  " : "text-white"}`}
					/>
				</button>
			</div>

			{/* SIDEBAR CONTENT */}
			<Link to="/" className="ml-1">
				<ul className="p-6">
					<li
						className="p-4 flex items-center justify-between   transition duration-300 ease-in-out group"
						onClick={() => handleLinkClick(-1)}>
						<Bars3CenterLeftIcon className="w-5 h-5 transition-all duration-300 ease-in-out transform group-hover:scale-125" />
						<a href="/hamburger" />
					</li>
				</ul>
			</Link>
			<div className="mt-8">
				<ul>
					{navItems.map(({ to, icon: Icon }, index) => (
						<li
							key={to}
							className="relative flex items-center p-6 rounded-lg transition duration-300 ease-in-out group"
							onMouseEnter={() => handleMouseEnter(index)}
							onMouseLeave={handleMouseLeave}
							onClick={() => handleLinkClick(index)}>
							<div className="relative flex items-center w-full pl-4  rounded-lg">
								{/* Left blue line */}
								<div
									className={`absolute -left-5 top-1/2 transform -translate-y-1/2 w-1.5 h-8 bg-customPurple rounded-lg transition-all duration-300 ease-in-out ${
										isActive(index) ? "opacity-100" : "opacity-0"
									}`}
								/>
								{/* Icon with theme-based color and consistent transitions */}
								<Link to={to} className="flex items-center w-full ">
									<div
										className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ease-in-out ${
											isActive(index) ? "bg-customPurple" : "bg-transparent"
										}`}>
										<Icon
											className={`w-5 h-5 transform transition-all duration-300 ease-in-out group-hover:scale-125 ${
												isActive(index) ? "text-white" : "text-gray-600"
											}`}
										/>
									</div>
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* PROFILE IMAGE AND LOGOUT */}
			<div className="mt-auto flex flex-col items-center justify-center p-6 mb-1">
				<div className="flex space-x-4 mb-6">
					<img
						src={User}
						alt="User"
						className="w-8 h-8 rounded-full border border-gray-300 transition-transform duration-300 ease-in-out transform hover:scale-125"
					/>
				</div>
				<div className="flex justify-center">
					<button className="p-3   hover:bg-blue-600 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 group">
						<ArrowRightStartOnRectangleIcon className={iconClassName} />
					</button>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
