import axios, { type AxiosRequestConfig, isAxiosError } from 'axios'

/** 将后端 FastAPI 返回的 detail / 校验 issues 转为可展示文案 */
export function getApiErrorMessage(err: unknown): string {
  if (!isAxiosError(err)) {
    return err instanceof Error ? err.message : '请求失败，请稍后重试'
  }
  if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
    return '无法连接服务器，请确认后端已启动（例如在本机运行：uvicorn，端口 8000），且前端通过 Vite 代理访问 /api。'
  }
  const status = err.response?.status
  const data = err.response?.data as Record<string, unknown> | undefined
  if (data && data.detail !== undefined && data.detail !== null) {
    const d = data.detail
    if (typeof d === 'string') {
      // 常见：未配置 preview 代理时，/api 落到预览服务器返回英文 Not Found
      if (
        status === 404 &&
        (d === 'Not Found' || d.toLowerCase().includes('not found'))
      ) {
        return '接口返回 404：未找到该地址。请确认后端已在本地运行（如 uvicorn 端口 8000），且通过「npm run dev」或已配置 preview.proxy 的「npm run preview」访问前端，使 /api 能代理到后端。'
      }
      return d
    }
    if (Array.isArray(d)) {
      const parts = d.map((x: unknown) => (typeof x === 'object' && x !== null && 'msg' in x ? String((x as { msg?: string }).msg) : String(x)))
      if (parts.some(Boolean)) return parts.filter(Boolean).join('；')
    }
  }
  if (data && Array.isArray(data.issues)) {
    const issues = data.issues as Array<{ msg?: string }>
    return issues.map((i) => i.msg).filter(Boolean).join('；') || '参数校验失败'
  }
  if (status === 401) {
    return '登录失败：用户名或密码不正确（请确认已执行 ensure_admin.py --reset 且用新密码登录）。'
  }
  if (status === 403) {
    return '没有权限执行该操作。'
  }
  return err.response?.status === 422 ? '提交内容不符合要求，请检查邮箱格式与必填项' : '请求失败，请稍后重试'
}

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/** 无默认 JSON Content-Type，专用于 OAuth2 表单登录，避免与实例级 application/json 合并后把表单发成 JSON */
const apiForm = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

const unwrap = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  const response = await request
  return response.data
}

// 认证相关API
export const authAPI = {
  login: (username: string, password: string) => {
    const body = new URLSearchParams()
    body.append('username', username)
    body.append('password', password)
    return unwrap<{ access_token: string; token_type: string }>(
      apiForm.post('/auth/login', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
    )
  }
}

export type CurrentUser = {
  id: number
  username: string
  email: string
  is_active: boolean
  is_member: boolean
  is_admin: boolean
  sex: number | null
  hobby: string | null
  created_at: string
  updated_at: string
}

export type AdminUserRow = CurrentUser
export type BusinessRecordRow = {
  id: number
  module: string
  project: string
  unit_price: number | null
  quantity: number | null
  subtotal: number | null
  customer_name: string | null
  contact: string | null
  appointment_time: string | null
  notes: string | null
  source_file: string | null
  created_at: string | null
}

// 用户相关API
export const userAPI = {
  register: (username: string, email: string, password: string) => {
    return unwrap<CurrentUser>(api.post('/users/', { username, email, password }))
  },
  getCurrentUser: () => {
    return unwrap<CurrentUser>(api.get('/users/me'))
  },
  updateUser: (data: Record<string, unknown>) => {
    return unwrap<CurrentUser>(api.put('/users/me', data))
  }
}

export const adminAPI = {
  listUsers: (params: {
    page?: number
    limit?: number
    keyword?: string
    sex?: string
    start?: string
    end?: string
  }) => {
    return unwrap<{
      total: number
      page: number
      page_size: number
      items: AdminUserRow[]
    }>(api.get('/users/admin/list', { params }))
  },
  patchUser: (
    id: number,
    data: Partial<{ is_member: boolean; sex: number | null; hobby: string; email: string }>
  ) => {
    return unwrap<AdminUserRow>(api.patch(`/users/admin/${id}`, data))
  },
  deleteUser: (id: number) => {
    return unwrap<{ detail: string }>(api.delete(`/users/admin/${id}`))
  },
  getUserDetails: (id: number) => {
    return unwrap<{ user: AdminUserRow; records: BusinessRecordRow[] }>(api.get(`/users/admin/${id}/details`))
  }
}

// 服务相关API
export const serviceAPI = {
  getServices: (category?: string) => {
    const config: AxiosRequestConfig = category ? { params: { category } } : {}
    return unwrap<Array<{ id: number; name: string; category: string; price: number; description: string }>>(
      api.get('/services', config)
    )
  },
  getService: (id: number) => {
    return unwrap(api.get(`/services/${id}`))
  }
}

// 文件相关API
export const fileAPI = {
  uploadFiles: (files: FormData) => {
    return unwrap<{
      message: string
      uploaded_files: Array<{ filename: string; path: string }>
      imported_users: number
      skipped_import_files?: string[]
      created_usernames?: string[]
      file_import_reports?: Array<{ filename: string; imported_users: number; created_usernames: string[] }>
    }>(
      api.post('/files/upload', files, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    )
  },
  listFiles: () => {
    return unwrap<{ files: Array<{ filename: string; size: number }> }>(api.get('/files/list'))
  },
  deleteFile: (filename: string) => {
    return unwrap<{
      message: string
      filename: string
      deleted_users?: number
      deleted_usernames?: string[]
      deleted_business_records?: number
    }>(
      api.delete(`/files/${encodeURIComponent(filename)}`)
    )
  },
  downloadFile: (filename: string) => {
    return unwrap(api.get(`/files/download/${filename}`))
  }
}

export default api
