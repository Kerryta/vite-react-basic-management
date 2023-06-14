import React, { useState, useEffect, Suspense } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme, Button, message } from 'antd'
import type { MenuProps } from 'antd'
import { commonRouters, CommonRouterProps } from '@/routers/common'
import styled from 'styled-components'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ILogin } from '@/typings/user'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

const formatRouters = (data: CommonRouterProps[]): MenuItem[] => {
	let lastKey = 1
	const renderData = data.map((el, index) => {
		let returnProps: MenuItem = {} as MenuItem
		if (!el.children) {
			returnProps = {
				label: el.meta?.title,
				path: el.path,
				key: lastKey + '',
				icon: el.meta?.icon,
				children: undefined
			} as MenuItem
			lastKey += 1
		} else {
			const currentChildren: MenuItem[] = el.children.map((child: any, childIndex: number) => {
				const returnChildProps = {
					label: child.meta.title,
					path: child.path,
					key: lastKey + '',
					icon: undefined,
					children: undefined
				}
				lastKey += 1
				return returnChildProps
			})

			returnProps = {
				label: el.meta?.title,
				path: undefined,
				key: el.meta?.title + '',
				icon: el.meta?.icon,
				children: currentChildren
			} as MenuItem
		}
		return returnProps
	})
	return renderData
}

const Common: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	const [selectedKeys, setSelectedKeys] = useState<string[]>([])
	const [openKeys, setOpenKeys] = useState<string[]>([])
	const [selectedkeyPath, setSelectedkeyPath] = useState<string[]>([])
	const [renderMenu, setRenderMenu] = useState<MenuItem[]>([])
	const {
		token: { colorBgContainer }
	} = theme.useToken()

	const navigate = useNavigate()
	const { pathname } = useLocation()

	const userData = useQuery<ILogin.Response>(['userData'], { enabled: false })
	const queryClient = useQueryClient()

	const onSelectMenuItem = ({ item, key, keyPath }: { item: any; key: string; keyPath: string[] }) => {
		setSelectedKeys([key])
		setSelectedkeyPath(keyPath)
		keyPath.length === 1 && setOpenKeys([])
	}

	const onOpenChangeItem = (openKeys: string[]) => {
		setOpenKeys(openKeys)
	}

	const onSelectKeysSelect = () => {
		const [keys] = selectedKeys
		if (selectedkeyPath.length === 1) {
			// @ts-ignore
			const renderPath = renderMenu.find((el: any) => el?.key === keys)?.path
			navigate(renderPath)
		} else if (selectedkeyPath.length === 2) {
			let childPath = ''
			renderMenu.forEach((el: any) => {
				if (el.children) {
					childPath = el.children.find((child: any) => child.key === keys)?.path
					if (childPath) return
				}
			})
			navigate(childPath)
		}
	}

	const findSelectKey = (): void => {
		let selectedKey: string = ''
		for (let i = 0; i < renderMenu.length; i++) {
			const el = renderMenu[i] as any
			if (el.path === pathname) {
				selectedKey = el.key
				break
			}
			const children = el.children
			if (children && children.length > 0) {
				selectedKey = findChildSelectedKey(children)
				if (selectedKey) {
					setOpenKeys([el.key])
					break
				}
			}
		}
		setSelectedKeys([selectedKey])
	}

	const findChildSelectedKey = (children: any[]): string => {
		for (let i = 0; i < children.length; i++) {
			const child = children[i]
			if (child.path === pathname) {
				return child.key
			}
			if (child.children) {
				const selectedKey = findChildSelectedKey(child.children)
				if (selectedKey) {
					return selectedKey
				}
			}
		}
		return ''
	}

	const onUserLogout = () => {
		queryClient.setQueryData(['userData'], {})
		navigate('/')
		message.success('用户退出登录')
	}

	useEffect(() => {
		setRenderMenu(formatRouters(commonRouters))
	}, [])

	useEffect(() => {
		findSelectKey()
	}, [renderMenu, pathname])

	useEffect(() => {
		onSelectKeysSelect()
	}, [selectedKeys])

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div
					style={{
						height: 32,
						margin: 16,
						background: 'rgba(255, 255, 255, 0.2)'
					}}
				/>
				<Menu
					theme="dark"
					selectedKeys={selectedKeys}
					openKeys={openKeys}
					mode="inline"
					items={renderMenu}
					onSelect={({ item, key, keyPath }) => onSelectMenuItem({ item, key, keyPath })}
					onOpenChange={(openKeys) => onOpenChangeItem(openKeys)}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<HeaderWrapper>
						<div className="hospital-name">{import.meta.env.VITE_SYSTEM_NAME}</div>
						<div className="button-wrapper">
							<div className="user-name">{userData.data?.name || 'user name'}</div>
							<Button type="primary" onClick={() => onUserLogout()}>
								退出
							</Button>
						</div>
					</HeaderWrapper>
				</Header>
				<Content style={{ margin: '0 16px', overflowX: 'auto' }}>
					<Breadcrumb style={{ margin: '8px 0' }}>
						{/* <Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item> */}
					</Breadcrumb>
					<div
						style={{
							minHeight: 360,
							minWidth: '1400px',
							background: colorBgContainer
						}}
					>
						<Suspense>
							<Outlet />
						</Suspense>
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>©2023 Created by kerryta</Footer>
			</Layout>
		</Layout>
	)
}

const HeaderWrapper = styled.div`
	padding: 0 32px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.hospital-name {
		font-size: 20px;
		font-weight: bold;
	}
	.button-wrapper {
		display: flex;
		align-items: center;
		.user-name {
			font-size: 20px;
			margin-right: 40px;
		}
	}
`

export default Common
