import { Service } from "@/utils/Service";
/*
 * @作者: zhao
 * @Date: 2021-12-04 11:46:57
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */

// 手机号登录
export function loginByPhone(phone: number, captcha: number) {
  return Service.get("/login/cellphone", {
    params: {
      phone,
      password: 123456,
      captcha,
    },
  });
}

export function sentCaptcha(phone: number) {
  return Service.get(`/captcha/sent?phone=${phone}`);
}
export function verifyCaptcha(phone: number, captcha: number) {
  return Service.get("/captcha/verify", {
    params: {
      phone,
      captcha,
    },
  });
}
export function getUserAccount() {
  return Service.get("/user/account");
}
export function getLoginStatus() {
  return Service.get("/login/status");
}
// 扫码登录
export function getQrKey() {
  return Service.get("/login/qr/key");
}

export function getQrimg(key: number) {
  return Service.get("/login/qr/create", {
    params: {
      key,
      qrimg: true,
    },
  });
}
/**
 * @description 返回的状态码 800:over time 801:wait 802:waiting for confirm 803:authorized
 * @description code cookies data message
 * @param key
 * @returns
 */
export function checkQr(key: number) {
  let now = +new Date();
  return Service.get(`/login/qr/check`, {
    params: { key, now },
  });
}
export function refreshLogin() {
  return Service.get("/login/refresh");
}
