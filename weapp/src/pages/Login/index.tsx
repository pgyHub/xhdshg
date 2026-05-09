import { useState } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginWithPassword, loginWithWechatMini, logout } from '../../store/slices/authSlice'
import './index.scss'

export default function Login() {
  const dispatch = useAppDispatch()
  const { status, errorMessage, accessToken, channel } = useAppSelector((s) => s.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const busy = status === 'loading'

  const goHome = () => {
    void Taro.reLaunch({ url: '/pages/Home/index' })
  }

  const onPasswordLogin = async () => {
    if (!username.trim() || !password) {
      await Taro.showToast({ title: '请填写账号和密码', icon: 'none' })
      return
    }
    const r = await dispatch(loginWithPassword({ username: username.trim(), password }))
    if (loginWithPassword.fulfilled.match(r)) {
      await Taro.showToast({ title: '登录成功', icon: 'success' })
      goHome()
    }
  }

  const onWechatLogin = async () => {
    const r = await dispatch(loginWithWechatMini())
    if (loginWithWechatMini.fulfilled.match(r)) {
      await Taro.showToast({ title: '登录成功', icon: 'success' })
      goHome()
    }
  }

  const onLogout = () => {
    dispatch(logout())
    void Taro.showToast({ title: '已退出', icon: 'none' })
  }

  return (
    <View className="page-login">
      <Text className="page-login__title">登录</Text>
      <Text className="page-login__sub">支持账号密码与微信两种方式（与 Web 共用后端 JWT）</Text>

      {accessToken ? (
        <View className="page-login__card">
          <Text className="page-login__ok">已登录</Text>
          <Text className="page-login__meta">方式：{channel === 'wechat' ? '微信' : '账号密码'}</Text>
          <Button className="page-login__btn page-login__btn--primary" onClick={goHome}>
            进入首页
          </Button>
          <Button className="page-login__btn" onClick={onLogout}>
            退出登录
          </Button>
        </View>
      ) : (
        <>
          <View className="page-login__card">
            <Text className="page-login__label">用户名</Text>
            <Input
              className="page-login__input"
              value={username}
              onInput={(e) => setUsername(e.detail.value)}
              placeholder="用户名"
            />
            <Text className="page-login__label">密码</Text>
            <Input
              className="page-login__input"
              password
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
              placeholder="密码"
            />
            <Button className="page-login__btn page-login__btn--primary" disabled={busy} onClick={() => void onPasswordLogin()}>
              账号密码登录
            </Button>
          </View>

          <View className="page-login__card">
            <Button className="page-login__btn page-login__btn--wechat" disabled={busy} onClick={() => void onWechatLogin()}>
              微信一键登录
            </Button>
            <Text className="page-login__hint">微信登录需后端配置 AppSecret；未配置时会提示改用账号密码。</Text>
          </View>
        </>
      )}

      {errorMessage ? <Text className="page-login__err">{errorMessage}</Text> : null}
    </View>
  )
}
