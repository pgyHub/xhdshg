import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI, getApiErrorMessage, userAPI } from '../services/api'
import { PublicImg } from '../components/PublicImg'
import { homePageCardImages } from '../data/stockRealPhotos'

const CORE_BUSINESS_ITEMS = [
  {
    title: '时尚美发',
    desc: '定制潮流发型，打造个人专属造型与气质表达。',
    image: homePageCardImages.hair
  },
  {
    title: '精致彩妆',
    desc: '覆盖日常妆、舞台妆、婚礼跟妆等多场景妆造服务。',
    image: homePageCardImages.makeup
  },
  {
    title: '婚纱摄影',
    desc: '婚纱写真、情侣旅拍与纪念摄影，记录人生高光时刻。',
    image: homePageCardImages.wedding
  },
  {
    title: '高端服装定制',
    desc: '私人成衣与礼服量身定制，兼顾审美、版型与穿着舒适度。',
    image: homePageCardImages.fashion
  },
  {
    title: '全屋定制',
    desc: '家装设计、柜体定制与整体软装搭配，提升空间品质感。',
    image: homePageCardImages.home
  },
  {
    title: '特色中餐馆',
    desc: '家常风味与特色宴席并重，满足家庭聚餐与商务社交需求。',
    image: homePageCardImages.restaurant
  },
  {
    title: '短视频制作',
    desc: '短视频策划、拍摄、剪辑、文案与运营，助力品牌传播增长。',
    image: homePageCardImages.video
  }
] as const

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
          <span className="cloud-sub-badge">品牌焕新升级，多业态一站式生活美学服务平台</span>
          <h2>小红点生活馆 品牌简介</h2>
          <p>
            名称灵感源自德国红点设计奖。我们以设计审美、匠心品质与创新服务为品牌底色，覆盖个人形象、
            婚嫁影像、空间定制、品质餐饮与新媒体运营，打造有质感、有温度的一站式生活馆。
          </p>
          <div className="cloud-hero-actions">
            <Link to="/member-backend" className="button button-primary">进入会员中心</Link>
            <Link to="/dashboard" className="button cloud-secondary-button">查看数据驾驶舱</Link>
          </div>
        </div>
        <div className="cloud-hero-right">
          <div className="planet-mock"></div>
          <div className="floating-screen top">红点设计灵感</div>
          <div className="floating-screen middle">生活美学空间</div>
          <div className="floating-screen bottom">多业态融合服务</div>
        </div>
      </section>

      <section className="section brand-intro-section">
        <h3>一、名称由来</h3>
        <p>
          品牌名称“小红点”，灵感源自享誉全球的德国红点设计奖。红点奖被誉为设计界的奥斯卡，是卓越审美、
          创新设计与高端品质的全球标杆。我们以此为初心，将精致设计与匠心美学融入每一项服务，以高品质标准
          打造多元生活美学空间，传递时尚、高级与质感生活理念。
        </p>
      </section>

      <section className="section brand-intro-section">
        <h3>二、品牌发展历程</h3>
        <div className="brand-timeline">
          <article className="brand-timeline-item">
            <h4>初期创立：丽时尚工作室</h4>
            <p>深耕美业基础服务，奠定时尚美学根基。</p>
          </article>
          <article className="brand-timeline-item">
            <h4>迭代升级：一米阳光时尚店</h4>
            <p>拓展服务品类，打造温馨舒适的消费体验。</p>
          </article>
          <article className="brand-timeline-item">
            <h4>全面升级：小红点生活馆</h4>
            <p>打破单一服务模式，实现多业态融合发展，迈向综合化、品质化经营。</p>
          </article>
        </div>
      </section>

      <section className="section brand-intro-section">
        <h3>三、核心业务范围</h3>
        <p>集合美学服务、定制设计、餐饮文旅、新媒体运营于一体，一站式满足多元需求：</p>
        <div className="brand-business-grid">
          {CORE_BUSINESS_ITEMS.map((item) => (
            <article key={item.title} className="brand-business-card">
              <div className="brand-business-image-wrap">
                <PublicImg src={item.image} alt={item.title} className="brand-business-image" loading="lazy" />
              </div>
              <div className="brand-business-copy">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section brand-intro-section">
        <h3>四、品牌理念</h3>
        <p>
          以红点设计美学为内核，兼顾颜值与实用、匠心与创新。从个人形象打造，到居家空间设计，再到休闲餐饮、
          新媒体服务，全方位覆盖个人、婚嫁、居家、商业等场景。小红点生活馆坚持“设计驱动服务，品质定义体验”，
          用心打造一站式美好生活体验馆。
        </p>
      </section>

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
