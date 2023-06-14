export interface IResponse<T = any, F = any> {
	msg: string | null
	code: string | '200'
	data: T
	obj: F
}

export interface IPaginationParams {
	size: number
	current: number
	total?: number
}

export interface IPageParams<T> extends IResposeWithReadonlyNull<IPaginationParams> {
	data: T
	ifPage: boolean
}

export interface IPageRes<T> {
	total: number
	size: number
	current: number
	map: any
	records: T[]
}

export type IResposeWithReadonlyNull<R> = {
	readonly [K in keyof R]?: R[K] | null | undefined
}

export interface BlobPayload {
	data: Blob
	headers: any
}

export * from './user'
