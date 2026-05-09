import { useState } from 'react'
import { Text, StyleSheet, Alert, View } from 'react-native'
import { Screen } from '../../components/Screen'
import { FormTextField } from '../../components/FormTextField'
import { AppButton } from '../../components/AppButton'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginWithPassword, loginWithWechatOAuth, logout } from '../../store/slices/authSlice'

export function LoginScreen() {
  const dispatch = useAppDispatch()
  const { status, errorMessage, accessToken, channel, wechatOAuthOpened } = useAppSelector((s) => s.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const busy = status === 'loading'

  const onPasswordLogin = async () => {
    if (!username.trim() || !password) {
      Alert.alert('提示', '请填写账号和密码')
      return
    }
    const r = await dispatch(loginWithPassword({ username: username.trim(), password }))
    if (loginWithPassword.fulfilled.match(r)) {
      Alert.alert('登录成功', '已使用账号密码获取令牌')
    }
  }

  const onWechat = async () => {
    const r = await dispatch(loginWithWechatOAuth())
    if (loginWithWechatOAuth.fulfilled.match(r)) {
      Alert.alert(
        '已打开授权页',
        '在浏览器完成微信授权后，请按 OAUTH_LOGIN_INTEGRATION.md 将 Token 回传到应用（深度链接或自建页）。未配置 EXPO_PUBLIC_OAUTH_WECHAT_URL 时请使用账号密码。',
      )
    }
  }

  return (
    <Screen style={styles.pad}>
      <Text style={styles.title}>登录</Text>
      <Text style={styles.sub}>账号密码与微信 OAuth 两种方式；JWT 与 Web/小程序一致。</Text>

      {accessToken ? (
        <View>
          <Text style={styles.ok}>已登录（{channel === 'wechat' ? '微信' : '账号密码'}）</Text>
          <AppButton title="退出登录" onPress={() => dispatch(logout())} />
        </View>
      ) : (
        <>
          <FormTextField
            label="用户名"
            placeholder="用户名"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
          />
          <FormTextField
            label="密码"
            placeholder="密码"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <AppButton title="账号密码登录" disabled={busy} onPress={() => void onPasswordLogin()} />
          <AppButton title="微信登录（浏览器 OAuth）" disabled={busy} onPress={() => void onWechat()} style={styles.mt} />
        </>
      )}

      {wechatOAuthOpened ? <Text style={styles.info}>已尝试打开微信授权页，请查看系统浏览器。</Text> : null}
      {errorMessage ? <Text style={styles.err}>{errorMessage}</Text> : null}
    </Screen>
  )
}

const styles = StyleSheet.create({
  pad: { padding: 16 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 8 },
  sub: { fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 20 },
  ok: { fontSize: 16, marginBottom: 16 },
  err: { color: '#c41e3a', marginTop: 12, fontSize: 14 },
  info: { color: '#666', marginTop: 12, fontSize: 13 },
  mt: { marginTop: 12 },
})
