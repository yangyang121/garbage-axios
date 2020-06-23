import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosRequestConfig, AxiosStatic } from './types'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initConfig)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
