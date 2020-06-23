import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHeaderName(headers: any, normalizedName: string) {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string) {
  const parsed = Object.create(null)
  if (!headers) return
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (value) {
      value = value.trim()
    }
    if (!key || !value) return
    parsed[key] = value
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method) {
  if (!headers) return headers
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
