import axios from 'axios'

const baseURL = (process.env.EXPO_PUBLIC_API_BASE || '').replace(/\/$/, '')

export const apiClient = axios.create({
  baseURL: baseURL || undefined,
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
})

export async function apiGet<T>(path: string): Promise<T> {
  const res = await apiClient.get<T>(path.startsWith('/') ? path : `/${path}`)
  return res.data
}

export async function apiPost<T, B = unknown>(path: string, body?: B): Promise<T> {
  const res = await apiClient.post<T>(path.startsWith('/') ? path : `/${path}`, body)
  return res.data
}
