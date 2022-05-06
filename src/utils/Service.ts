import Axios from 'axios'

// abort controller
const controller = new AbortController()

const Service = Axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
})

Service.interceptors.response.use(
	(res) => {
		return res.data
	},
	(err) => {
		return Promise.resolve(err)
	}
)
export { controller }
export default Service
