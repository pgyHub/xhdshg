import { Linking } from 'react-native'
import { apiClient } from './api'

/** OAuth2 表单登录，与 Web / 小程序一致 */
export async function loginWithPassword(
  username: string,
  password: string,
): Promise<{ access_token: string; token_type: string }> {
  const body = new URLSearchParams()
  body.append('username', username)
  body.append('password', password)
  const res = await apiClient.post<{ access_token: string; token_type: string }>(
    '/auth/login',
    body.toString(),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  )
  return res.data
}

/** App 端 H5 微信 OAuth：打开授权页（与 `OAUTH_LOGIN_INTEGRATION.md` 中 EXPO_PUBLIC_OAUTH_WECHAT_URL 一致） */
export async function openWeChatOAuthInBrowser(): Promise<void> {
  const url = process.env.EXPO_PUBLIC_OAUTH_WECHAT_URL?.trim()
  if (!url) {
    throw new Error('未配置 EXPO_PUBLIC_OAUTH_WECHAT_URL，请使用账号密码登录。')
  }
  await Linking.openURL(url)
}
