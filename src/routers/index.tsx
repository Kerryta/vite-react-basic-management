import { lazy, useEffect } from 'react'
import { Navigate, useRoutes, RouteObject, useLocation, matchRoutes } from 'react-router-dom'
import { Modal } from 'antd'
import Login from '@/views/login'
import { commonRouters } from './common'

const Common = lazy(() => import('@/layout/Common'))

export const rootRouters: RouteObject[] = [
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/',
		element: <Navigate to="/login" />
	},
	{
		path: '/common',
		element: <Common />,
		children: [...commonRouters]
	}
]

const Router = () => {
	const location = useLocation()
	const matches = matchRoutes(rootRouters, location)

	useEffect(() => {
		// @ts-ignore
		const title = matches?.at(-1)?.route?.meta?.title || ''
		title && (window.document.title = title)

		return () => {
			Modal.destroyAll()
		}
	}, [location])

	return useRoutes(rootRouters)
}

export default Router
