// SectionHeader.tsx
import React from "react"

// Define the props type
interface SectionHeaderProps {
	title: string
	year?: string
	className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
	title,
	year,
	className = "",
}) => {
	return (
		<div className={`flex justify-between mb-0 ${className}`}>
			<h2 className="text-lg font-bold text-black">{title}</h2>
			{year && <h4 className="font-semibold">{year}</h4>}
		</div>
	)
}

export default SectionHeader
