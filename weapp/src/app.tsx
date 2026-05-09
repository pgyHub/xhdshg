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
