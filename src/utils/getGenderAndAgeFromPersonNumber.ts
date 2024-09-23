// utils/personUtils.ts
export const getGenderAndAgeFromPersonNumber = (personNumber: string) => {
	// Extract birthdate and identifier parts
	const birthdatePart = personNumber.substring(0, 8)
	const identifierPart = personNumber.substring(9)

	// Parse birthdate
	const birthYear = parseInt(birthdatePart.substring(0, 4), 10)
	const birthMonth = parseInt(birthdatePart.substring(4, 6), 10)
	const birthDay = parseInt(birthdatePart.substring(6, 8), 10)

	const birthDate = new Date(birthYear, birthMonth - 1, birthDay)

	// Calculate age
	const ageDifMs = Date.now() - birthDate.getTime()
	const ageDate = new Date(ageDifMs) // Time from epoch
	const age = Math.abs(ageDate.getUTCFullYear() - 1970)

	// Determine gender (even: female, odd: male)
	const genderDigit = parseInt(identifierPart.substring(0, 1), 10)
	const gender = genderDigit % 2 === 0 ? "female" : "male"

	return { gender, age }
}
