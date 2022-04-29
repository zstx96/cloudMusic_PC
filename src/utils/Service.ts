import config from "@/config";
import Axios from "axios";
import { ElMessage } from "element-plus";


const baseURL = import.meta.env.PROD ? '' : config.baseURL_Dev
// abort controller
const controller = new AbortController();


const Service = Axios.create({
    baseURL,
    withCredentials: true,
    timeout:5e3,
})

Service.interceptors.response.use((res) => {

    return res.data
}, err => {
    ElMessage.warning('请求发生错误')
    // console.dir(err);
    

    // return Promise.resolve(err)
})
export default Service