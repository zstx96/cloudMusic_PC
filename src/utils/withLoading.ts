import { ElLoading, LoadingOptions } from "element-plus"





const withLoading = <T = any>(cb: (...args: any[]) => Promise<T>, options: LoadingOptions = {}) => {
    let instance: any
    const newFn = async (...args: any[]) => {
        try {
            let result
            instance = ElLoading.service(options)
            result = await cb(...args)
            instance.close()
            return Promise.resolve(result)
        } catch (e) {
            instance.close()
            return Promise.reject(e)
        }
    }
    return newFn
}

export { withLoading }