import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BUSINESS_MODULES } from '../data/businessNav'
import { authAPI, getApiErrorMessage, userAPI } from '../services/api'

const entryCards = [
  { title: '进入工作台', desc: '快速进入业务管理后台，统一查看模块数据。', path: '/member-backend' },
  { title: '浏览数据看板', desc: '查看经营分析、趋势图与关键指标监控。', path: '/dashboard' }
]

const businessQuickItems = BUSINESS_MODULES.map((m) => ({
  name: m.homeName,
  path: m.path,
  imageTitle: m.imageTitle,
  imageHint: m.imageHint
}))

const Home = () => {
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [modalUser, setModalUser] = useState('')
  const [modalEmail, setModalEmail] = useState('')
  const [modalPass, setModalPass] = useState('')
  const [modalConfirm, setModalConfirm] = useState('')
  const [modalError, setModalError] = useState('')
  const [modalSuccess, setModalSuccess] = useState('')
  const [modalLoading, setModalLoading] = useState(false)
  const [agreedTerms, setAgreedTerms] = useState(false)

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setModalError('')
    setModalSuccess('')
    if (authMode === 'register' && !agreedTerms) {
      setModalError('请阅读并勾选同意用户协议与隐私说明')
      return
    }
    if (!modalUser.trim() || !modalPass) {
      setModalError('请填写账号与密码')
      return
    }
    if (authMode === 'register') {
      if (!modalEmail.trim()) {
        setModalError('请填写邮箱（需为有效邮箱格式，如 name@example.com）')
        return
      }
      if (modalPass !== modalConfirm) {
        setModalError('两次输入的密码不一致')
        return
      }
    }
    setModalLoading(true)
    try {
      if (authMode === 'login') {
        const res = await authAPI.login(modalUser.trim(), modalPass)
        localStorage.setItem('token', res.access_token)
        setShowLoginModal(false)
        navigate('/member-backend')
      } else {
        await userAPI.register(modalUser.trim(), modalEmail.trim(), modalPass)
        setModalSuccess('注册成功，请登录')
        setAuthMode('login')
        setAgreedTerms(false)
        setModalPass('')
        setModalConfirm('')
      }
    } catch (err) {
      setModalError(getApiErrorMessage(err))
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <div className="cloud-home">
      <section className="cloud-hero">
        <div className="cloud-hero-left">
          <div className="home-auth-actions">
            <button
              type="button"
              className="header-login-button"
              onClick={() => {
                setAuthMode('login')
                setModalError('')
                setModalSuccess('')
                setShowLoginModal(true)
              }}
            >
              登录
            </button>
            <button
              type="button"
              className="header-register-entry"
              onClick={() => {
                setAuthMode('register')
                setModalError('')
                setModalSuccess('')
                setAgreedTerms(false)
                setShowLoginModal(true)
              }}
            >
              免费注册
            </button>
          </div>
          <span className="cloud-badge">重磅升级</span>
          <span className="cloud-sub-badge">数据可视化平台新版上线，首月免费试用</span>
          <h2>智能数据可视化 Sugar BI</h2>
          <p>
            面向小红点生活馆多业务场景，提供图表分析、数据看板和可视化大屏能力。
            无需复杂开发，分钟级完成数据呈现与经营汇报。
          </p>
          <div className="cloud-hero-actions">
            <Link to="/dashboard" className="button button-primary">创建我的报表大屏</Link>
            <Link to="/info/operation-tools" className="button cloud-secondary-button">帮助文档</Link>
            <Link to="/info/training-course" className="button cloud-secondary-button">视频教程</Link>
          </div>
        </div>
        <div className="cloud-hero-right">
          <div className="planet-mock"></div>
          <div className="floating-screen top">经营总览大屏</div>
          <div className="floating-screen middle">销售趋势分析</div>
          <div className="floating-screen bottom">业务洞察卡片</div>
        </div>
      </section>

      <section className="cloud-entry-grid">
        {entryCards.map((item) => (
          <Link key={item.title} to={item.path} className="cloud-entry-card">
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
            <span>立即进入 ↗</span>
          </Link>
        ))}
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>业务模块快速入口</h3>
          <span>按模块查看专题页面</span>
        </div>
        <div className="cards-grid business-quick-list">
          {businessQuickItems.map((item) => (
            <Link key={item.name} to={item.path} className="category-card">
              <div className="business-quick-image">
                <strong>{item.imageTitle}</strong>
                <span>{item.imageHint}</span>
              </div>
              <div className="business-quick-copy">
                <h4>{item.name}</h4>
                <p>进入{item.name}专题页面，查看案例、套餐、运营洞察与参考站点。</p>
              </div>
              <span>查看详情</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="right-floating-tools">
        <Link to="/info/strategy-review" aria-label="查看策略复盘">评</Link>
        <Link to="/info/operation-tools" aria-label="查看运营工具">改</Link>
        <Link to="/info/online-consulting" aria-label="在线咨询">询</Link>
      </div>

      {showLoginModal && (
        <div className="auth-split-mask" role="dialog" aria-modal="true" aria-labelledby="auth-split-title" onClick={() => setShowLoginModal(false)}>
          <div className="auth-split-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="auth-split-close" onClick={() => setShowLoginModal(false)} aria-label="关闭">
              ×
            </button>
            <div className="auth-split-brand">
              <div className="auth-split-logo">小红点生活馆</div>
              <p className="auth-split-tagline">生活服务平台</p>
              <p className="auth-split-slogan">
                用数据与内容
                <br />
                让本地生活服务更简单
              </p>
              <footer className="auth-split-footer">
                <Link to="/info/contact-us" onClick={() => setShowLoginModal(false)}>
                  帮助中心
                </Link>
                <span>2026 © 小红点生活馆</span>
              </footer>
            </div>
            <div className="auth-split-card">
              <h2 id="auth-split-title">{authMode === 'register' ? '欢迎注册' : '欢迎登录'}</h2>
              <p className="auth-split-switch">
                {authMode === 'register' ? (
                  <>
                    已有账号？
                    <button
                      type="button"
                      className="auth-split-link-btn"
                      onClick={() => {
                        setAuthMode('login')
                        setModalError('')
                        setModalSuccess('')
                      }}
                    >
                      登录
                    </button>
                  </>
                ) : (
                  <>
                    没有账号？
                    <button
                      type="button"
                      className="auth-split-link-btn"
                      onClick={() => {
                        setAuthMode('register')
                        setModalError('')
                        setModalSuccess('')
                        setAgreedTerms(false)
                      }}
                    >
                      注册
                    </button>
                  </>
                )}
              </p>
              <form className="auth-split-form" onSubmit={handleModalSubmit}>
                {modalError && <div className="status-error auth-split-status">{modalError}</div>}
                {modalSuccess && <div className="login-modal-success auth-split-status">{modalSuccess}</div>}

                <label className="auth-split-field">
                  <span className="auth-split-label">用户名</span>
                  <input
                    value={modalUser}
                    onChange={(e) => setModalUser(e.target.value)}
                    placeholder="请设置用户名"
                    autoComplete="username"
                    title="用户名在系统内唯一，建议使用字母、数字或常用昵称"
                  />
                </label>

                {authMode === 'register' && (
                  <label className="auth-split-field">
                    <span className="auth-split-label">邮箱</span>
                    <input
                      type="email"
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      placeholder="可用于登录与找回密码"
                      autoComplete="email"
                    />
                  </label>
                )}

                <label className="auth-split-field">
                  <span className="auth-split-label">密码</span>
                  <input
                    type="password"
                    value={modalPass}
                    onChange={(e) => setModalPass(e.target.value)}
                    placeholder="请设置登录密码"
                    autoComplete={authMode === 'login' ? 'current-password' : 'new-password'}
                  />
                </label>

                {authMode === 'register' && (
                  <label className="auth-split-field">
                    <span className="auth-split-label">确认密码</span>
                    <input
                      type="password"
                      value={modalConfirm}
                      onChange={(e) => setModalConfirm(e.target.value)}
                      placeholder="请再次输入密码"
                      autoComplete="new-password"
                    />
                  </label>
                )}

                {authMode === 'register' && (
                  <label className="auth-split-agree">
                    <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} />
                    <span>
                      阅读并接受
                      <Link to="/info/agreement" onClick={() => setShowLoginModal(false)}>
                        《用户协议》
                      </Link>
                      及
                      <Link to="/info/contact-us" onClick={() => setShowLoginModal(false)}>
                        《隐私与联系说明》
                      </Link>
                    </span>
                  </label>
                )}

                <button type="submit" className="auth-split-submit" disabled={modalLoading}>
                  {modalLoading ? '处理中...' : authMode === 'login' ? '登录' : '注册'}
                </button>

                <div className="auth-split-footlink">
                  <Link to="/login" onClick={() => setShowLoginModal(false)}>
                    打开完整登录页
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home
