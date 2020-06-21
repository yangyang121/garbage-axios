import { AxiosRequestConfig, AxiosResponse, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(url: any, config?: any) {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig) {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('post', url, config, data)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('put', url, config, data)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData('patch', url, config, data)
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    this.request(
      Object.assign(config || {}, {
        url,
        method
      })
    )
  }

  _requestMethodWithData(method: Method, url: string, config?: AxiosRequestConfig, data?: any) {
    this.request(
      Object.assign(config || {}, {
        url,
        method,
        data
      })
    )
  }
}
