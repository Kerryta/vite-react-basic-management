import { Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { CSSProperties } from 'react'

export interface GroupListProp {
	label: string
	value: string
}

interface Props {
	groupList: GroupListProp[]
	defaultValue?: string
	onCurrentRadio: (current: string) => void
	style?: CSSProperties
}

const RadioButtonGroup = (props: Props): JSX.Element => {
	const { groupList, defaultValue, onCurrentRadio, style } = props

	return (
		<Radio.Group
			onChange={(e: RadioChangeEvent) => {
				onCurrentRadio(e.target.value)
			}}
			defaultValue={defaultValue}
			style={style}
		>
			{groupList.map((el) => (
				<Radio.Button value={el.value} key={window.crypto.randomUUID()}>
					{el.label}
				</Radio.Button>
			))}
		</Radio.Group>
	)
}

export default RadioButtonGroup
