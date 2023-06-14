import { useCallback, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import type { IPageRes } from '@/typings/services'
import { SUCCESS_CODE } from '@/config/axios'

const useTable = <T, F>(
	service: (params: F & { current: number; size: number }) => Promise<{ code: string; data: IPageRes<T> }>,
	options?: {
		defaultCurrent?: number
		defaultPageSize?: number
		currentListKey?: string
		memoizedOption: {
			query: Omit<F, 'size' | 'current'> // 需要指定 state，保证局部更新后不重新创建变量 导致再次触发更新
		}
	}
) => {
	const { defaultCurrent = 1, defaultPageSize = 10, currentListKey = 'records', memoizedOption } = options || {}
	const memoizedOptionRef = useRef(memoizedOption)
	const [current, setCurrent] = useState(defaultCurrent)
	const [pageSize, setPageSize] = useState(defaultPageSize)
	const [total, setTotal] = useState<number | undefined>(undefined)
	const [tableLoading, setTableLoading] = useState(false)
	const [tableData, setTableData] = useState<T[]>([])

	const query = memoizedOption?.query || {}
	const fetchData = useCallback(
		async (params: F) => {
			try {
				setTableLoading(true)

				const { code, data } = await service({ ...params, current, size: pageSize })
				if (code === SUCCESS_CODE) {
					setTableData(
						data[currentListKey as keyof IPageRes<T>].map((el: T) => ({
							...el,
							key: window.crypto.randomUUID()
						}))
					)
					setTotal(data.total)
				}
			} catch (err) {
				console.error(err)
			} finally {
				setTableLoading(false)
			}
		},
		[current, pageSize, currentListKey, service, query]
	)

	useEffect(() => {
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		const fetchDataAsync = async () => {
			try {
				await fetchData(query as F)
			} catch (e) {
				console.error(e)
			}
		}
		fetchDataAsync()
		return () => {
			source.cancel()
		}
	}, [memoizedOptionRef, query, current, pageSize])

	const setPage = (page?: number, pageSize?: number, total?: number) => {
		page && setCurrent(page)
		pageSize && setPageSize(pageSize)
		total && setTotal(total)
	}

	const recaptureData = () => {
		current !== 1 ? setCurrent(1) : fetchData(query as F)
	}

	return {
		tableData,
		current,
		pageSize,
		total,
		tableLoading,
		setPage,
		recaptureData
	}
}

export default useTable
