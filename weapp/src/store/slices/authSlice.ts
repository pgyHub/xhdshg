import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Taro from '@tarojs/taro'
import * as authApi from '../../services/authApi'

export type AuthChannel = 'password' | 'wechat'

/** Taro 请求失败时常抛出带 errMsg 的普通对象，避免界面只显示笼统「登录失败」 */
function thunkErrorMessage(e: unknown, fallback: string): string {
  if (e instanceof Error) return e.message
  if (typeof e === 'string' && e.trim()) return e
  if (e && typeof e === 'object') {
    const o = e as Record<string, unknown>
    if (typeof o.errMsg === 'string') return o.errMsg
    if (typeof o.message === 'string') return o.message
  }
  return fallback
}

export const loginWithPassword = createAsyncThunk(
  'auth/loginPassword',
  async (args: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.loginWithPassword(args.username, args.password)
      return { accessToken: data.access_token, channel: 'password' as const }
    } catch (e: unknown) {
      return rejectWithValue(thunkErrorMessage(e, '登录失败'))
    }
  },
)

export const loginWithWechatMini = createAsyncThunk(
  'auth/loginWechatMini',
  async (_, { rejectWithValue }) => {
    try {
      const { code } = await Taro.login()
      if (!code) return rejectWithValue('未获取到微信登录 code')
      const data = await authApi.exchangeWechatMiniCode(code)
      return { accessToken: data.access_token, channel: 'wechat' as const }
    } catch (e: unknown) {
      return rejectWithValue(thunkErrorMessage(e, '微信登录失败'))
    }
  },
)

type AuthState = {
  status: 'idle' | 'loading' | 'error'
  errorMessage: string | null
  accessToken: string | null
  /** 最近一次成功登录所用方式；未登录为 null */
  channel: AuthChannel | null
}

const initialState: AuthState = {
  status: 'idle',
  errorMessage: null,
  accessToken: null,
  channel: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null
      state.channel = null
      state.status = 'idle'
      state.errorMessage = null
      try {
        Taro.removeStorageSync('access_token')
        Taro.removeStorageSync('login_channel')
      } catch {
        /* noop */
      }
    },
    /** 冷启动时从本地恢复两种登录态之一 */
    hydrateFromStorage(state) {
      try {
        const token = Taro.getStorageSync('access_token')
        const ch = Taro.getStorageSync('login_channel') as AuthChannel | ''
        if (typeof token === 'string' && token) {
          state.accessToken = token
          state.channel = ch === 'password' || ch === 'wechat' ? ch : null
        }
      } catch {
        /* noop */
      }
    },
  },
  extraReducers: (builder) => {
    const pending = (state: AuthState) => {
      state.status = 'loading'
      state.errorMessage = null
    }
    const rejected = (state: AuthState, msg: string) => {
      state.status = 'error'
      state.errorMessage = msg
    }
    builder.addCase(loginWithPassword.pending, pending)
    builder.addCase(loginWithWechatMini.pending, pending)
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      state.status = 'idle'
      state.accessToken = action.payload.accessToken
      state.channel = action.payload.channel
      state.errorMessage = null
      Taro.setStorageSync('access_token', action.payload.accessToken)
      Taro.setStorageSync('login_channel', action.payload.channel)
    })
    builder.addCase(loginWithWechatMini.fulfilled, (state, action) => {
      state.status = 'idle'
      state.accessToken = action.payload.accessToken
      state.channel = action.payload.channel
      state.errorMessage = null
      Taro.setStorageSync('access_token', action.payload.accessToken)
      Taro.setStorageSync('login_channel', action.payload.channel)
    })
    builder.addCase(loginWithPassword.rejected, (state, action) => {
      rejected(state, (action.payload as string) || '登录失败')
    })
    builder.addCase(loginWithWechatMini.rejected, (state, action) => {
      rejected(state, (action.payload as string) || '微信登录失败')
    })
  },
})

export const { logout, hydrateFromStorage } = authSlice.actions
export default authSlice.reducer
