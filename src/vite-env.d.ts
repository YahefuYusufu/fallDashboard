/// <reference types="vite/client" />
// src/custom.d.ts

declare module "@material-tailwind/react" {
	import { DrawerProps } from "@material-tailwind/react"
	export const Drawer: ComponentType<DrawerProps>
	export const Button: ComponentType<DrawerProps>
	export const Typography: ComponentType<DrawerProps>
	export const IconButton: ComponentType<DrawerProps>
}

declare module "@heroicons/react/solid" {
	const content: undefined
	export = content
}
declare module "@heroicons/react/outline" {
	// You can declare specific icons here or leave it generic if you use multiple icons
	export const MagnifyingGlassIcon: React.ComponentType<
		React.SVGProps<SVGSVGElement>
	>
	// Add other outline icons similarly if you need more
}
