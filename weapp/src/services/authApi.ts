import Taro from '@tarojs/taro'
import { getApiBase } from './api'

function joinUrl(path: string): string {
  const base = getApiBase()
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

function readDetail(data: unknown): string | undefined {
  if (data && typeof data === 'object' && 'detail' in data) {
    const d = (data as { detail: unknown }).detail
    if (typeof d === 'string') return d
  }
  return undefined
}

/** OAuth2 表单登录，与 Web 端 /auth/login 一致 */
export async function loginWithPassword(
  username: string,
  password: string,
): Promise<{ access_token: string; token_type: string }> {
  const res = await Taro.request<{ access_token: string; token_type: string }>({
    url: joinUrl('/auth/login'),
    method: 'POST',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
  })
  if (res.statusCode >= 200 && res.statusCode < 300 && res.data?.access_token) {
    return res.data
  }
  throw new Error(readDetail(res.data) || `登录失败（${res.statusCode}）`)
}

/** 小程序 wx.login → 后端换 JWT（后端未接入时返回 501） */
export async function exchangeWechatMiniCode(
  code: string,
): Promise<{ access_token: string; token_type: string }> {
  const res = await Taro.request<{ access_token: string; token_type: string }>({
    url: joinUrl('/auth/wechat/miniprogram'),
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    data: { code },
  })
  if (res.statusCode >= 200 && res.statusCode < 300 && res.data?.access_token) {
    return res.data
  }
  throw new Error(readDetail(res.data) || `微信登录失败（${res.statusCode}）`)
}
