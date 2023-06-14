export interface MenuItem {
	name: string
	hidden?: boolean
	path?: string
	children?: MenuItem[]
	icon?: string | any
	end?: boolean
	id?: string | number
	pId?: string | number | null
	expand?: boolean
}
