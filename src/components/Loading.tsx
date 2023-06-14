import { FC } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 48
		}}
		spin
	/>
)

const Loading: FC = () => {
	return (
		<div
			style={{
				margin: '0 auto',
				padding: '10% 0',
				textAlign: 'center'
			}}
		>
			<Spin indicator={antIcon} />
		</div>
	)
}

export default Loading
