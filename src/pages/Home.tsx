import { Link } from 'react-router-dom'
import { useState } from 'react'

const entryCards = [
  { title: '进入工作台', desc: '快速进入业务管理后台，统一查看模块数据。', path: '/member-backend' },
  { title: '浏览数据看板', desc: '查看经营分析、趋势图与关键指标监控。', path: '/dashboard' },
  { title: '浏览大屏模板', desc: '体验可视化驾驶舱风格模板与行业展示页。', path: '/dashboard' }
]

const Home = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'sms'>('account')
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <div className="cloud-home">
      <section className="cloud-hero">
        <div className="cloud-hero-left">
          <span className="cloud-badge">重磅升级</span>
          <span className="cloud-sub-badge">数据可视化平台新版上线，首月免费试用</span>
          <h2>智能数据可视化 Sugar BI</h2>
          <p>
            面向小红点生活馆多业务场景，提供图表分析、数据看板和可视化大屏能力。
            无需复杂开发，分钟级完成数据呈现与经营汇报。
          </p>
          <div className="cloud-hero-actions">
            <button onClick={() => setShowLoginModal(true)} className="button button-primary">立即体验</button>
            <Link to="/dashboard" className="button cloud-secondary-button">帮助文档</Link>
            <Link to="/dashboard" className="button cloud-secondary-button">视频教程</Link>
          </div>
        </div>
        
        {/* 右侧登录注册界面 */}
        <div className="cloud-hero-right">
          <div className="login-register-panel">
            {/* 左侧扫码区域 */}
            <div className="qr-scan-section">
              <div className="qr-container">
                <div className="qr-code-box">
                  <div className="qr-placeholder">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <rect x="10" y="10" width="30" height="30" fill="none" stroke="#333" strokeWidth="3"/>
                      <rect x="80" y="10" width="30" height="30" fill="none" stroke="#333" strokeWidth="3"/>
                      <rect x="10" y="80" width="30" height="30" fill="none" stroke="#333" strokeWidth="3"/>
                      <rect x="20" y="20" width="10" height="10" fill="#333"/>
                      <rect x="90" y="20" width="10" height="10" fill="#333"/>
                      <rect x="20" y="90" width="10" height="10" fill="#333"/>
                      <rect x="45" y="45" width="30" height="30" fill="none" stroke="#333" strokeWidth="2"/>
                      <rect x="50" y="50" width="20" height="20" fill="#333"/>
                    </svg>
                  </div>
                </div>
                <div className="phone-mockup">
                  <div className="phone-screen">
                    <div className="phone-header">小红点生活馆</div>
                    <div className="phone-scan-icon">📱</div>
                  </div>
                </div>
              </div>
              <p className="qr-hint">请使用小红点APP扫码登录</p>
              <button className="download-app-btn">
                <span className="app-icon">📲</span>
                <span>下载小红点APP</span>
              </button>
              <div className="third-party-login">
                <button className="third-party-btn wechat">
                  <span>💬</span>
                </button>
                <button className="third-party-btn alipay">
                  <span>💳</span>
                </button>
                <button className="third-party-btn weibo">
                  <span>📧</span>
                </button>
              </div>
            </div>

            {/* 右侧账号登录区域 */}
            <div className="account-login-section">
              <div className="login-tabs">
                <button 
                  className={activeTab === 'account' ? 'active' : ''}
                  onClick={() => setActiveTab('account')}
                >
                  账号登录
                </button>
                <button 
                  className={activeTab === 'sms' ? 'active' : ''}
                  onClick={() => setActiveTab('sms')}
                >
                  短信登录
                </button>
              </div>

              <div className="login-form">
                {activeTab === 'account' ? (
                  <>
                    <div className="input-group">
                      <input type="text" placeholder="手机号/用户名/邮箱" />
                    </div>
                    <div className="input-group">
                      <input type="password" placeholder="密码" />
                      <span className="forgot-password">忘记密码？</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input-group">
                      <input type="text" placeholder="请输入手机号" />
                    </div>
                    <div className="input-group sms-input">
                      <input type="text" placeholder="请输入验证码" />
                      <button className="get-code-btn">获取验证码</button>
                    </div>
                  </>
                )}

                <div className="agreement-row">
                  <input type="checkbox" id="agreement" />
                  <label htmlFor="agreement">
                    阅读并接受 <a href="#">《小红点用户协议》</a> 和 <a href="#">《隐私政策》</a>
                  </label>
                </div>

                <button className="login-submit-btn">登录</button>

                <div className="register-link">
                  <span>还没有账号？</span>
                  <a href="#">立即注册</a>
                </div>
              </div>
            </div>
          </div>
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
        <div className="cards-grid cards-grid-3">
          {[
            ['婚纱摄影', '/wedding-photography'],
            ['彩妆', '/makeup'],
            ['美发', '/hairdressing'],
            ['全屋定制', '/home-customization'],
            ['短视频制作', '/short-video-production'],
            ['中餐馆', '/chinese-restaurant']
          ].map(([name, path]) => (
            <Link key={name} to={path} className="category-card">
              <h4>{name}</h4>
              <p>进入{name}专题页面，查看案例、套餐、运营洞察与参考站点。</p>
              <span>查看详情</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="right-floating-tools">
        <button onClick={() => setShowLoginModal(true)}>咨询</button>
      </div>
    </div>
  )
}

export default Home
