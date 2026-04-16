import { Link } from 'react-router-dom'
import { useState } from 'react'

const entryCards = [
  { title: '进入工作台', desc: '快速进入业务管理后台，统一查看模块数据。', path: '/member-backend' },
  { title: '浏览数据看板', desc: '查看经营分析、趋势图与关键指标监控。', path: '/dashboard' },
  { title: '浏览大屏模板', desc: '体验可视化驾驶舱风格模板与行业展示页。', path: '/dashboard' }
]

const Home = () => {
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
        <div className="cloud-hero-right">
          <img 
            src="https://code.coze.cn/api/sandbox/coze_coding/file/proxy?expire_time=-1&file_path=assets%2Fimage.png&nonce=72846ebd-51ac-4ee1-aa36-9c1b7fdef9b9&project_id=7629176607961399322&sign=1f511ecd4678db1085bfd2ccacf9604bef5c26ac2cc593fac596215e67f044f7" 
            alt="小红点生活馆"
            style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
          />
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
        <button onClick={() => setShowLoginModal(true)}>登录</button>
        <button onClick={() => setShowLoginModal(true)}>注册</button>
      </div>

      {showLoginModal && (
        <div className="login-modal-mask" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="login-modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            <div className="login-modal-left">
              <h3>登录</h3>
              <p>小红点APP/支付宝/钉钉</p>
              <div className="mock-qr">
                <div className="mock-qr-inner">二维码</div>
              </div>
              <span>其他方式：支付宝 / 淘宝 / 微博 / 飞书</span>
            </div>
            <div className="login-modal-right">
              <div className="login-modal-tabs">
                <button className="active">账号登录</button>
                <button>手机号登录</button>
                <button>通行密钥</button>
                <button className="go-register">前往注册</button>
              </div>
              <div className="login-modal-form">
                <input placeholder="账号名  请输入" />
                <input type="password" placeholder="密码  请输入" />
                <button className="login-submit">立即登录</button>
                <div className="login-links">
                  <span>忘记登录名</span>
                  <span>忘记密码</span>
                  <span>RAM登录</span>
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
