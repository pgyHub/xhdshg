/** RTK createAsyncThunk 使用 AbortController；须用仅 polyfill 入口（umd 版依赖 fetch，小程序无 fetch 会跳过） */
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { useLaunch } from '@tarojs/taro'
import { store } from './store'
import { hydrateFromStorage } from './store/slices/authSlice'
import './app.scss'

export default function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    store.dispatch(hydrateFromStorage())
  })
  return <Provider store={store}>{children}</Provider>
}
