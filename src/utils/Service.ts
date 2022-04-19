import config from "@/config";
import Axios from "axios";
import { ElMessage } from "element-plus";


const baseURL = import.meta.env.PROD ? '' : config.baseURL_Dev

const Service = Axios.create({
    baseURL
})

Service.interceptors.response.use(res => {

    return res.data
}, err => {
    ElMessage.warning('请求发生错误')
    console.log(err);
    
    // return Promise.resolve(err)
})
export default Service