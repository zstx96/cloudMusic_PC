/*
 * @作者: zhao
 * @Date: 2022-03-17 12:34:16
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */

export * from "./interface"
export * from "./user"
export * from "../enum"
export * from "./Artist"
export * from "./Album"

export interface NavItem {
    iconUrl?: string,
    title?: string,
    path: string,
    children?: Nav
}
export interface NavGroup {
    title?: string,
    children: NavItem[]
}
export type Nav = NavItem[]

