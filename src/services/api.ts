import axios from 'axios'

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

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 认证相关API
export const authAPI = {
  login: (username: string, password: string) => {
    return api.post('/auth/login', {
      username,
      password
    })
  }
}

// 用户相关API
export const userAPI = {
  getCurrentUser: () => {
    return api.get('/users/me')
  },
  updateUser: (data: any) => {
    return api.put('/users/me', data)
  }
}

// 服务相关API
export const serviceAPI = {
  getServices: (category?: string) => {
    return api.get('/services', {
      params: { category }
    })
  },
  getService: (id: number) => {
    return api.get(`/services/${id}`)
  }
}

// 文件相关API
export const fileAPI = {
  uploadFiles: (files: FormData) => {
    return api.post('/files/upload', files, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  listFiles: () => {
    return api.get('/files/list')
  },
  downloadFile: (filename: string) => {
    return api.get(`/files/download/${filename}`)
  }
}

export default api
