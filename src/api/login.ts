import Service from '@/utils/Service'

// 手机号登录
export function loginByPhone(phone: number, captcha: number) {
	return Service.get('/login/cellphone', {
		params: {
			phone,
			password: 123456,
			captcha,
		},
	})
}

export function sentCaptcha(phone: number) {
	return Service.get(`/captcha/sent?phone=${phone}`)
}
export function verifyCaptcha(phone: number, captcha: number) {
	return Service.get('/captcha/verify', {
		params: {
			phone,
			captcha,
		},
	})
}

// 扫码登录
export function getQrKey() {
	return Service.get<{ data: { unikey: string } }>('/login/qr/key')
}

export function getQrimg(key: string) {
	return Service.get<{ data: { qrimg: string, qrurl: string } }>('/login/qr/create', {
		params: {
			key,
			qrimg: true,
		},
	})
}
/**
 * @description 返回的状态码 800:over time 801:wait 802:waiting for confirm 803:authorized
 * @description code cookies data message
 * @param key
 * @returns
 */
export function checkQr(key: string) {
	const now = +new Date()
	return Service.get<{code:number,message:string,cookie?:string}>('/login/qr/check', {
		params: { key, now },
	})
}
export function refreshLogin() {
	return Service.get('/login/refresh')
}
