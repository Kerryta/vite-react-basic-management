import type { MenuItem } from '@/typings/common'

import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

const menus: MenuItem[] = [
	{
		name: '订单管理',
		path: '/commom/orderManagement',
		id: '1',
		end: true,
		pId: null,
		icon: DesktopOutlined
	},
	{
		name: '药品管理',
		path: '/commom/drugManagement',
		id: '1',
		end: true,
		pId: null,
		icon: DesktopOutlined
	}
]

export default menus
