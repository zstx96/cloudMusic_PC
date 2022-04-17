import Axios from "axios";


const baseURL = import.meta.env.PROD ? '' : ""

 const Service = Axios.create({
    baseURL
})

export default Service