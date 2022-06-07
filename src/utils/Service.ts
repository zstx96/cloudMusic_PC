import Axios from 'axios'

// abort controller
const controller = new AbortController()

const Service = Axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
})

const noCacheUrl = ['/user/playlist']
Service.interceptors.request.use((request) => {
	if (noCacheUrl.includes(request.url || '')) {
		request.params['timestamp'] = +new Date()
	}
	return request
})

Service.interceptors.response.use(
	(res) => {
		if (res.data?.code === 200 || res.data?.data?.code === 200) {
			return res.data
		} else {
			throw res.data
		}
	},
	(err) => {
		return Promise.resolve(err)
	}
)
export { controller }
export default Service
