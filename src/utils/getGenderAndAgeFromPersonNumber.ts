export const getGenderAndAgeFromPersonNumber = (personNumber: string) => {
	if (!personNumber) {
		throw new Error("Person number is empty")
	}

	if (personNumber.length < 10) {
		throw new Error(
			`Invalid person number format: "${personNumber}" (length: ${personNumber.length})`
		)
	}

	// Extract birthdate and identifier parts
	const birthdatePart = personNumber.substring(0, 8)
	const identifierPart = personNumber.substring(9)

	// Validate birthdate part
	if (birthdatePart.length !== 8 || isNaN(Number(birthdatePart))) {
		throw new Error(
			`Invalid birthdate format in person number: "${personNumber}"`
		)
	}

	// Validate identifier part
	if (identifierPart.length < 3 || isNaN(Number(identifierPart))) {
		throw new Error(
			`Invalid identifier format in person number: "${personNumber}"`
		)
	}

	// Parse birthdate
	const birthYear = parseInt(birthdatePart.substring(0, 4), 10)
	const birthMonth = parseInt(birthdatePart.substring(4, 6), 10)
	const birthDay = parseInt(birthdatePart.substring(6, 8), 10)

	const birthDate = new Date(birthYear, birthMonth - 1, birthDay)

	// Calculate age
	const ageDifMs = Date.now() - birthDate.getTime()
	const ageDate = new Date(ageDifMs) // Time from epoch
	const age = Math.abs(ageDate.getUTCFullYear() - 1970)

	// Determine gender based on the third digit of the identifier part (even: female, odd: male)
	const genderDigit = parseInt(identifierPart.substring(2, 3), 10) // third digit in identifier part
	const gender = genderDigit % 2 === 0 ? "kvinna" : "man"

	return { gender, age }
}
