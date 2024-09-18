const Loader = () => {
	return (
		<div className="flex h-screen items-center justify-center bg-transparent">
			{/* Outer circle */}
			<div className="relative">
				{/* First spinning circle */}
				<div className="h-32 w-32 animate-spin rounded-full border-6 border-solid border-white border-t-blue-700"></div>

				{/* Second inner circle (spins in the opposite direction) */}
				<div className="absolute inset-0 m-3 flex items-center justify-center">
					<div className="h-24 w-24 animate-spin-reverse rounded-full border-6 border-solid border-meta-8 border-t-transparent border-b-transparent border-l-transparent"></div>
				</div>
			</div>
		</div>
	)
}

export default Loader
