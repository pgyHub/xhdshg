import Taro from '@tarojs/taro'

/** 与 Web 同源时可在构建环境变量中配置，例如 https://your-domain.com/api */
const BASE_URL = process.env.TARO_APP_API_BASE || ''

/** 请求用的 API 根路径（无末尾 /） */
export function getApiBase(): string {
  return BASE_URL.replace(/\/$/, '')
}

export async function apiGet<T>(path: string): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`
  const res = await Taro.request<T>({
    url,
    method: 'GET',
  })
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data as T
  }
  throw new Error(`GET ${url} failed: ${res.statusCode}`)
}

export async function apiPost<T, B = unknown>(path: string, body?: B): Promise<T> {
  const url = `${getApiBase()}${path.startsWith('/') ? path : `/${path}`}`
  const res = await Taro.request<T>({
    url,
    method: 'POST',
    data: body,
    header: { 'Content-Type': 'application/json' },
  })
  if (res.statusCode >= 200 && res.statusCode < 300) {
    return res.data as T
  }
  throw new Error(`POST ${url} failed: ${res.statusCode}`)
}
