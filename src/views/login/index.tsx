import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message } from 'antd'
import { loginService } from '@/service/user'
import styled from 'styled-components'
import jsMd5 from 'js-md5'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface FormState {
	password: string
	username: string
}

const Login: FC = () => {
	const navigate = useNavigate()

	const queryClient = useQueryClient()
	const userData = useQuery({ queryKey: ['userData'], enabled: false })

	const loginMutaion = useMutation(
		(params: FormState) =>
			loginService({
				channel: 'pc',
				hospitalId: import.meta.env.VITE_HOSPITAL_ID,
				contactPhone: params.username,
				pwd: jsMd5(params.password)
			}),
		{
			onSuccess: (res) => {
				// if (res.code === '200') {
				// queryClient.setQueryData(['userData'], res.data)
				// message.success('登录成功')
				navigate('/common/Home')
				// }
			}
		}
	)

	return (
		<LoginWrapper>
			<div className="hospital-name">{import.meta.env.VITE_SYSTEM_NAME} login</div>
			<div className="form">
				<Form
					name="basic"
					labelCol={{ span: 4 }}
					initialValues={{ remember: true }}
					onFinish={loginMutaion.mutate}
					autoComplete="off"
				>
					<Form.Item label="手机号" name="username" rules={[{ required: true, message: '请输入你的用户名!' }]}>
						<Input maxLength={11} />
					</Form.Item>

					<Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入你的密码!' }]}>
						<Input.Password />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 11, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</LoginWrapper>
	)
}

const LoginWrapper = styled.div`
	background-color: #2d3a4b;
	min-height: 100vh;
	padding: 100px 0 0 0;
	.hospital-name {
		text-align: center;
		color: #fff;
		font-size: 28px;
		font-weight: 700;
		margin-bottom: 100px;
	}
	.form {
		width: 500px;
		margin: 0 auto;
		.ant-form-item-required {
			color: #fff;
		}
	}
`

export default Login
