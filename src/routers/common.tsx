import { lazy, ReactNode } from 'react'
import { NonIndexRouteObject, RouteObject } from 'react-router-dom'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

const Home = lazy(() => import('@/views/home'))
const ConsultationRecord = lazy(() => import('@/views/consultationRecord'))
const PrescriptionRecord = lazy(() => import('@/views/prescriptionRecord'))

// individualCenter
const ChangePassword = lazy(() => import('@/views/individualCenter/ChangePassword'))
const MySchedule = lazy(() => import('@/views/individualCenter/MySchedule'))

interface MetaProp {
	title: string
	icon?: ReactNode
}

export interface CommonRouterProps extends NonIndexRouteObject {
	meta?: MetaProp
	children?: []
}

const individualCenterChildren: CommonRouterProps[] = [
	{
		path: '/common/individualCenter/ChangePassword',
		id: 'ChangePassword',
		element: <ChangePassword />,
		meta: {
			title: '修改密码'
		}
	},
	{
		path: '/common/individualCenter/MySchedule',
		id: 'MySchedule',
		element: <MySchedule />,
		meta: {
			title: '我的排班'
		}
	}
]

export const commonRouters: CommonRouterProps[] = [
	{
		path: '/common/Home',
		element: <Home />,
		meta: {
			title: '首页',
			icon: <DesktopOutlined />
		}
	},
	{
		path: '/common/ConsultationRecord',
		element: <ConsultationRecord />,
		meta: {
			title: '问诊记录',
			icon: <FileOutlined />
		}
	},
	{
		path: '/common/PrescriptionRecord',
		element: <PrescriptionRecord />,
		meta: {
			title: '处方记录',
			icon: <TeamOutlined />
		}
	},
	{
		path: '/common/individualCenter',
		children: individualCenterChildren as [],
		meta: {
			title: '个人中心',
			icon: <UserOutlined />
		}
	}
]

// 不渲染菜单 路由列表
// export const unrenderMenu: CommonRouterProps[] = [
// 	{
// 		path: '/common/PrescriptionManagement/detail/:id',
// 		element: <PrescriptionManagementDetail />,
// 		meta: {
// 			title: '处方详情'
// 		}
// 	}
// ]
