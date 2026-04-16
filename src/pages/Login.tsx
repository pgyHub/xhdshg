import { useState } from 'react'
import { authAPI } from '../services/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [registerName, setRegisterName] = useState('')
  const [registerPhone, setRegisterPhone] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await authAPI.login(username, password)
      localStorage.setItem('token', response.access_token)
      navigate('/member-backend')
    } catch (err) {
      setError('登录失败，请检查用户名和密码')
      console.error('登录失败:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerName || !registerPhone || !registerPassword) {
      setError('请完整填写注册信息')
      return
    }
    setError('当前版本仅演示页面，注册接口可在后端扩展后接入。')
  }

  return (
    <div className="login-page">
      <section className="login-showcase">
        <span className="section-tag">小红点生活馆会员中心</span>
        <h2>账号体系与业务中心一体化</h2>
        <p>登录后可统一管理订单、服务资料、经营数据与会员权益，形成完整的用户服务闭环。</p>
        <ul>
          <li>业务资料上传与下载</li>
          <li>会员订单进度可视化</li>
          <li>多业务模块统一入口</li>
        </ul>
      </section>

      <section className="login-card">
        <div className="login-tabs">
          <button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>登录</button>
          <button className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>注册</button>
        </div>

        {error && <div className="status-error">{error}</div>}

        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              用户名
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
              密码
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit" className="button button-primary" disabled={loading}>
              {loading ? '登录中...' : '立即登录'}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <label>
              昵称
              <input type="text" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
            </label>
            <label>
              手机号
              <input type="tel" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} required />
            </label>
            <label>
              设置密码
              <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
            </label>
            <button type="submit" className="button button-primary">创建账号</button>
          </form>
        )}
      </section>
    </div>
  )
}

export default Login
