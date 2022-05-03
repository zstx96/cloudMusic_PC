import { ElLoading, LoadingOptions } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

let instance: LoadingInstance | null
const withLoading = <T>(
	cb: (...args: any[]) => Promise<T>,
	options: LoadingOptions = {}
) => {
	const newFn = async (...args: any[]) => {
		try {
			instance = ElLoading.service(options)
			const result = await cb(...args)
			instance.close()
			return Promise.resolve(result)
		} catch (e) {
			if (instance) {
				instance.close()
			}
			return Promise.reject(e)
		}
	}
	return newFn
}
const closeLoading = () => {
	if (instance?.visible) {
		instance.close()
	}
}

export { withLoading, closeLoading }
