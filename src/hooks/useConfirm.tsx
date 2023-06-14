import { Modal, message, FormInstance } from 'antd'
import type { IResponse } from '@/typings/services'
import { SUCCESS_CODE } from '@/config/axios'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal

interface OptionProps {
	title?: string
	successMessage?: string
	dangerType?: boolean
	content?: JSX.Element
	formInstance?: FormInstance
}

const useConfirm = <T = any, F = any>(service: (params: T) => Promise<IResponse<F>>, option: OptionProps) => {
	const { title, successMessage, dangerType, content, formInstance } = option

	const requestConfirmation = (query: T): Promise<boolean> => {
		return new Promise(async (resolve, reject) => {
			const { code, msg } = await service(query)

			if (code === SUCCESS_CODE) {
				message.success(successMessage || '提交成功')
				resolve(true)
			} else {
				reject(false)
			}
		})
	}

	const onConfirm = (query: T) => {
		return new Promise((resolve, reject) => {
			confirm({
				title: title || '确认操作',
				icon: <ExclamationCircleFilled />,
				content,
				okType: dangerType ? 'danger' : 'primary',
				async onOk() {
					let validate = null
					if (formInstance) {
						validate = await formInstance.validateFields()
						if (!validate) return
					}
					const params = {
						...query,
						...validate
					}
					const confirmStatus = await requestConfirmation(params)
					confirmStatus && resolve(confirmStatus)
				},
				onCancel() {}
			})
		})
	}

	return { onConfirm }
}

export default useConfirm
