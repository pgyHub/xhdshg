import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import * as authApi from '../../services/authApi'

export type AuthChannel = 'password' | 'wechat'

export const loginWithPassword = createAsyncThunk(
  'auth/loginPassword',
  async (args: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.loginWithPassword(args.username, args.password)
      return { accessToken: data.access_token, channel: 'password' as const }
    } catch (e: unknown) {
      const msg =
        typeof e === 'object' &&
        e !== null &&
        'response' in e &&
        typeof (e as { response?: { data?: { detail?: unknown } } }).response?.data?.detail === 'string'
          ? String((e as { response: { data: { detail: string } } }).response.data.detail)
          : e instanceof Error
            ? e.message
            : '登录失败'
      return rejectWithValue(msg)
    }
  },
)

/** 打开系统浏览器中的微信 OAuth（拿到 Token 需按文档做深度链接或 WebView 回传） */
export const loginWithWechatOAuth = createAsyncThunk(
  'auth/loginWechatOAuth',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.openWeChatOAuthInBrowser()
      return true
    } catch (e: unknown) {
      return rejectWithValue(e instanceof Error ? e.message : '无法打开授权页')
    }
  },
)

type AuthState = {
  status: 'idle' | 'loading' | 'error'
  errorMessage: string | null
  accessToken: string | null
  channel: AuthChannel | null
  /** 最近一次仅打开浏览器授权（尚未拿到 JWT） */
  wechatOAuthOpened: boolean
}

const initialState: AuthState = {
  status: 'idle',
  errorMessage: null,
  accessToken: null,
  channel: null,
  wechatOAuthOpened: false,
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
      state.wechatOAuthOpened = false
    },
    /** 若通过深度链接等方式写入 Token，可 dispatch 此 action 标记为微信渠道 */
    setSessionFromWechat(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken
      state.channel = 'wechat'
      state.status = 'idle'
      state.errorMessage = null
      state.wechatOAuthOpened = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithPassword.pending, (state) => {
      state.status = 'loading'
      state.errorMessage = null
      state.wechatOAuthOpened = false
    })
    builder.addCase(loginWithPassword.fulfilled, (state, action) => {
      state.status = 'idle'
      state.accessToken = action.payload.accessToken
      state.channel = action.payload.channel
      state.errorMessage = null
    })
    builder.addCase(loginWithPassword.rejected, (state, action) => {
      state.status = 'error'
      state.errorMessage = (action.payload as string) || '登录失败'
    })
    builder.addCase(loginWithWechatOAuth.pending, (state) => {
      state.status = 'loading'
      state.errorMessage = null
      state.wechatOAuthOpened = false
    })
    builder.addCase(loginWithWechatOAuth.fulfilled, (state) => {
      state.status = 'idle'
      state.errorMessage = null
      state.wechatOAuthOpened = true
    })
    builder.addCase(loginWithWechatOAuth.rejected, (state, action) => {
      state.status = 'error'
      state.errorMessage = (action.payload as string) || '微信登录失败'
      state.wechatOAuthOpened = false
    })
  },
})

export const { logout, setSessionFromWechat } = authSlice.actions
export default authSlice.reducer
