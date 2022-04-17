import { Service } from "@/utils/Service";

/*
 * @作者: zhao
 * @Date: 2021-12-04 17:22:28
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */

  export function getFollows(id: number, limit?: number, offset?: number) {
    return Service.get("/user/follows", {
      params: {
        uid: id,
        limit,
        offset,
      },
    });
  }
  export function status() {
    return Service.get("/login/status");
  }
  export function logout() {
    return Service.get("/logout");
  }

export function getUserDetail(uid:number){
  return Service.get(`/user/detail?uid=${uid}`)
}

