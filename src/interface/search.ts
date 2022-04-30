import type { Artist, Playlist } from './interface'

/*
 * @作者: zhao
 * @Date: 2022-03-19 10:04:17
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
export interface SearchMultiRes {
    artist:Artist[]
    new_mlog?:any[]
    orders?:[]
    playlist?:Playlist[]
}
