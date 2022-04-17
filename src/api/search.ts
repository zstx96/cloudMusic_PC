import { Service } from "@/utils/Service";

/*
 * @作者: zhao
 * @Date: 2022-03-18 21:09:39
 * @上次更新作者: your name
 * @上次更新时间: Do not edit
 * @描述: file content
 */
export function getHotSearch(){
    return Service.get('/search/hot')
}
export function getSearchSuggest(keywords:string){
    return Service.get('/search/suggest',{params:{keywords,type:'mobile'}})
}
export function getHotSearchDetail(){
    return Service.get('/search/hot/detail')
}
export function getMultimatch(keywords:string){
    return Service.get(`/search/multimatch?keywords=${keywords}`)
}
export function getSearchDefault(){
    return Service.get('/search/default')
}