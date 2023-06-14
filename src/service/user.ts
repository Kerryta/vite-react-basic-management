import request from '@/config/axios'
import type { IResponse } from '@/typings/services'
import type { ILogin, UpdatePwdParams } from '@/typings/user'

// 登录服务
export const loginService = (params: ILogin.Params): Promise<ILogin.Res> => {
	return request.post('/api/wxMiniProgram/doctorLogin', params)
}

// 1.2 修改密码
export const updatePwd = (params: UpdatePwdParams): Promise<IResponse> => {
	return request.post('/api/login/updatePwd', params)
}
