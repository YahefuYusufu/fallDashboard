import { useState, useEffect } from "react"

export const useNumberAnimation = (
	endValue: number,
	duration: number = 2000
) => {
	const [displayValue, setDisplayValue] = useState(0)

	useEffect(() => {
		let startTime: number | null = null
		let animationFrameId: number

		const animateValue = (timestamp: number) => {
			if (!startTime) startTime = timestamp
			const progress = timestamp - startTime
			const percentage = Math.min(progress / duration, 1)

			setDisplayValue(Math.floor(endValue * percentage))

			if (percentage < 1) {
				animationFrameId = requestAnimationFrame(animateValue)
			}
		}

		animationFrameId = requestAnimationFrame(animateValue)

		return () => cancelAnimationFrame(animationFrameId)
	}, [endValue, duration])

	return displayValue
}
