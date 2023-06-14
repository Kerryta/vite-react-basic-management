import { Empty } from 'antd'
import styled from 'styled-components'

interface Props {
	description?: string
}

const EmptyComponent = (props: Props) => {
	return (
		<EmptyWrapper>
			<Empty description={props.description} className="empty-container" />
		</EmptyWrapper>
	)
}

const EmptyWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	user-select: none;

	.empty-container {
		font-size: 20px;
	}
`

export default EmptyComponent
