import { useState } from 'react'
import { Link } from 'react-router-dom'

const entryCards = [
  { title: '进入工作台', desc: '快速进入业务管理后台，统一查看模块数据。', path: '/member-backend' },
  { title: '浏览数据看板', desc: '查看经营分析、趋势图与关键指标监控。', path: '/dashboard' }
]

const businessQuickItems = [
  { name: '婚纱摄影', path: '/wedding-photography', imageTitle: '婚纱拍摄案例', imageHint: '主纱照 / 仪式跟拍 / 修图成片' },
  { name: '彩妆', path: '/makeup', imageTitle: '妆容风格展示', imageHint: '新娘妆 / 日常妆 / 主题妆' },
  { name: '美发', path: '/hairdressing', imageTitle: '发型设计展示', imageHint: '烫染造型 / 发质护理 / 头皮管理' },
  { name: '全屋定制', path: '/home-customization', imageTitle: '空间效果展示', imageHint: '客餐厅 / 卧室 / 全屋收纳' },
  { name: '短视频制作', path: '/short-video-production', imageTitle: '视频成片展示', imageHint: '脚本策划 / 拍摄剪辑 / 代运营' },
  { name: '中餐馆', path: '/chinese-restaurant', imageTitle: '菜品门店展示', imageHint: '招牌菜 / 包厢场景 / 到店活动' },
  { name: '服装定制', path: '/clothing-customization', imageTitle: '版型成衣展示', imageHint: '量体定制 / 面料挑选 / 套系搭配' }
]

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authMethod, setAuthMethod] = useState<'account' | 'phone' | 'passkey'>('account')

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
                setAuthMethod('account')
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
                setAuthMethod('account')
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
            <Link to="/dashboard" className="button cloud-secondary-button">帮助文档</Link>
            <Link to="/dashboard" className="button cloud-secondary-button">视频教程</Link>
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
        <button>评</button>
        <button>改</button>
        <button>询</button>
      </div>

      {showLoginModal && (
        <div className="login-modal-mask" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="login-modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            <div className="login-modal-left">
              <h3>{authMode === 'login' ? '登录' : '注册'}</h3>
              <p>小红点APP/支付宝/钉钉</p>
              <div className="mock-qr">
                <div className="mock-qr-inner">二维码</div>
              </div>
              <span>其他方式：支付宝 / 淘宝 / 微博 / 飞书</span>
            </div>
            <div className="login-modal-right">
              <div className="login-modal-tabs">
                <button
                  className={authMethod === 'account' ? 'active' : ''}
                  onClick={() => setAuthMethod('account')}
                >
                  账号登录
                </button>
                <button
                  className={authMethod === 'phone' ? 'active' : ''}
                  onClick={() => setAuthMethod('phone')}
                >
                  手机号登录
                </button>
                <button
                  className={authMethod === 'passkey' ? 'active' : ''}
                  onClick={() => setAuthMethod('passkey')}
                >
                  通行密钥
                </button>
                <button
                  className="go-register"
                  onClick={() => {
                    const nextMode = authMode === 'login' ? 'register' : 'login'
                    setAuthMode(nextMode)
                    setAuthMethod('account')
                  }}
                >
                  {authMode === 'login' ? '前往注册' : '返回登录'}
                </button>
              </div>
              <div className="login-modal-form">
                {authMethod === 'account' && (
                  <>
                    <input placeholder={authMode === 'login' ? '账号名  请输入' : '注册账号  请输入'} />
                    <input type="password" placeholder={authMode === 'login' ? '密码  请输入' : '设置密码  请输入'} />
                    {authMode === 'register' && <input type="password" placeholder="确认密码  请输入" />}
                  </>
                )}
                {authMethod === 'phone' && (
                  <>
                    <input placeholder="手机号  请输入" />
                    <input placeholder="验证码  请输入" />
                    {authMode === 'register' && <input type="password" placeholder="设置密码  请输入" />}
                  </>
                )}
                {authMethod === 'passkey' && (
                  <>
                    <input placeholder="设备标识  请输入" />
                    <input type="password" placeholder="安全口令  请输入" />
                  </>
                )}
                <button className="login-submit">{authMode === 'login' ? '立即登录' : '立即注册'}</button>
                <div className="login-links">
                  {authMode === 'login' ? (
                    <>
                      <span>忘记登录名</span>
                      <span>忘记密码</span>
                      <span>RAM登录</span>
                    </>
                  ) : (
                    <>
                      <span>已有账号？请登录</span>
                      <span>注册即视为同意用户协议</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home
