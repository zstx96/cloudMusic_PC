import { ElLoading, LoadingOptions } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const withLoading = <T>(callback: (...args: any[]) => Promise<T>, options: LoadingOptions = {}) => {
	let instance: LoadingInstance | null
	const newFn = (...args: any[]): Promise<T> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject(new Error('timeout'))
				instance?.close()
			}, 5000)

			try {
				instance = ElLoading.service(options)
				callback(...args)
					.then((result) => {
						instance && instance.close()
						resolve(result)
					})
					.catch((err) => {
						instance && instance.close()
						reject(err)
					})
			} catch (e) {
				instance && instance.close()
				reject(e)
			}
		})
	}
	return newFn
}

export { withLoading }
