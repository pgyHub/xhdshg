import axios, { type AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
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
    const payload = new URLSearchParams()
    payload.append('username', username)
    payload.append('password', password)
    return unwrap<{ access_token: string; token_type: string }>(
      api.post('/auth/login', payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
    )
  }
}

// 用户相关API
export const userAPI = {
  getCurrentUser: () => {
    return unwrap<{ username: string; email: string; is_member: boolean }>(api.get('/users/me'))
  },
  updateUser: (data: Record<string, unknown>) => {
    return unwrap(api.put('/users/me', data))
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
    return unwrap(
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
  downloadFile: (filename: string) => {
    return unwrap(api.get(`/files/download/${filename}`))
  }
}

export default api
