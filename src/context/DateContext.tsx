import React, { createContext, useContext, useState } from "react"

interface DateContextType {
	startDate: Date | null
	endDate: Date | null
	setStartDate: (date: Date | null) => void
	setEndDate: (date: Date | null) => void
}

const DateContext = createContext<DateContextType | undefined>(undefined)

export const DateProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)

	return (
		<DateContext.Provider
			value={{ startDate, endDate, setStartDate, setEndDate }}>
			{children}
		</DateContext.Provider>
	)
}

export const useDateContext = () => {
	const context = useContext(DateContext)
	if (!context) {
		throw new Error("useDateContext must be used within a DateProvider")
	}
	return context
}
