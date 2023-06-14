import { IResponse, IPageRes } from './services'

export declare namespace ILogin {
	interface Params {
		channel: string
		hospitalId: string
		contactPhone: string
		pwd: string
	}

	interface Response {
		id: number
		hospitalId: number
		hospitalName: string
		name: string
		mobilePhone: string
		loginId: string
		token: string
		employeeId: string
		nickName: string
		photo: string
		deptId: string
		deptName: string
		jobTitleName: string
		description: string
		speciality: string
		first: string
		type: string
	}

	type Res = IResponse<Response>
}

export interface UpdatePwdParams {
	oldPwd: string
	newPwd: string
	repeatPwd: string
}
