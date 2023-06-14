import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

const pendingRequest: Map<string, any> = new Map()

const { CancelToken } = axios

// const API_PREFIX = "https://gdhongkang.cn:40001/api/"
export const API_PREFIX = import.meta.env.VITE_API_URL + ''

export const SUCCESS_CODE = '200'

const instance = axios.create({
	baseURL: API_PREFIX,
	timeout: 30 * 1000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	}
})

/**
 * 生成唯一的请求key
 * @param config
 */
const getRequestKey = (config: AxiosRequestConfig): string => {
	const { url, method, data, params } = config
	return `${method}${url}${JSON.stringify(method === 'GET' ? params : data)}`
}

/**
 * 将请求添加到请求队列里面
 * @param config
 */
const addPendingRequest = (config: AxiosRequestConfig): void => {
	const requestKey: string = getRequestKey(config)
	config.cancelToken =
		config.cancelToken ||
		new CancelToken((c) => {
			if (requestKey && !pendingRequest.has(requestKey)) {
				pendingRequest.set(requestKey, c)
			}
		})
}

/**
 * 移除请求队列中的重复请求
 * @param config
 */
const removePendingRequest = (config: AxiosRequestConfig): void => {
	const requestKey: string = getRequestKey(config)
	if (requestKey && pendingRequest.has(requestKey)) {
		const cancel = pendingRequest.get(requestKey)

		cancel(requestKey)
		pendingRequest.delete(requestKey)
	}
}

// 请求拦截
instance.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		try {
			removePendingRequest(config)
			addPendingRequest(config)
			if (localStorage.getItem('userData') && typeof config.headers?.set === 'function') {
				const token = JSON.parse(localStorage.getItem('userData')!)?.clientState?.queries?.[0]?.state?.data?.token
				const Authorization: string = 'Bearer ' + token
				token && config.headers.set('Authorization', Authorization)
			}
			if (import.meta.env.MODE === 'test') {
				config.url = '/api/pharmacist' + config.url?.split('/api')[1]
			}

			return config
		} catch (err) {
			removePendingRequest(config)
			return Promise.reject(err)
		}
	},
	(err) => {
		removePendingRequest(err.config)
		if (axios.isCancel(err)) {
			console.log('Request canceled', err.message)
		} else {
			return Promise.reject(err)
		}
	}
)

// 响应拦截
instance.interceptors.response.use(
	(res: AxiosResponse) => {
		try {
			removePendingRequest(res.config)
			const data = res.data
			if (res.config.responseType !== 'blob' && data.code !== SUCCESS_CODE) {
				message.error(data.msg || '请求异常')
			}

			if (data.code === '401') {
				window.location.hash = '/login'
				message.error('登录过期')
			}

			return data
		} catch (err) {
			console.error(err)
			return Promise.reject(err)
		}
	},
	(err) => Promise.reject(err)
)

export default instance
