import { Link } from 'react-router-dom'

const Home = () => {
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
            <Link to="/dashboard" className="button button-primary">立即体验</Link>
            <Link to="/dashboard" className="button cloud-secondary-button">帮助文档</Link>
            <Link to="/dashboard" className="button cloud-secondary-button">视频教程</Link>
          </div>
        </div>
        
        {/* 右侧扫码登录界面 */}
        <div className="cloud-hero-right">
          <div className="login-register-panel qr-only-panel">
            <div className="qr-scan-section">
              <div className="qr-container">
                <div className="qr-code-box">
                  <div className="qr-placeholder">
                    <svg width="140" height="140" viewBox="0 0 140 140">
                      <rect x="10" y="10" width="35" height="35" fill="none" stroke="#1d4ed8" strokeWidth="3"/>
                      <rect x="95" y="10" width="35" height="35" fill="none" stroke="#1d4ed8" strokeWidth="3"/>
                      <rect x="10" y="95" width="35" height="35" fill="none" stroke="#1d4ed8" strokeWidth="3"/>
                      <rect x="20" y="20" width="15" height="15" fill="#1d4ed8"/>
                      <rect x="100" y="20" width="15" height="15" fill="#1d4ed8"/>
                      <rect x="20" y="105" width="15" height="15" fill="#1d4ed8"/>
                      <rect x="50" y="50" width="40" height="40" fill="none" stroke="#1d4ed8" strokeWidth="2"/>
                      <rect x="58" y="58" width="24" height="24" fill="#1d4ed8"/>
                      <rect x="55" y="15" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="62" y="15" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="69" y="15" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="55" y="121" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="62" y="121" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="69" y="121" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="15" y="55" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="15" y="62" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="15" y="69" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="121" y="55" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="121" y="62" width="4" height="4" fill="#1d4ed8"/>
                      <rect x="121" y="69" width="4" height="4" fill="#1d4ed8"/>
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
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>业务模块快速入口</h3>
          <span>按模块查看专题页面</span>
        </div>
        <div className="cards-grid cards-grid-4">
          {[
            ['婚纱摄影', '/wedding-photography', '💍', '记录永恒瞬间，专业团队打造梦幻婚礼'],
            ['彩妆', '/makeup', '💄', '精致妆容，发现你的独特之美'],
            ['美发', '/hairdressing', '✂️', '时尚造型，从头开始改变'],
            ['全屋定制', '/home-customization', '🏠', '专属空间，打造理想家居'],
            ['服装定制', '/clothing', '👔', '量身定制，彰显个性品味'],
            ['短视频制作', '/short-video-production', '🎬', '创意影像，记录精彩瞬间'],
            ['中餐馆', '/chinese-restaurant', '🍜', '传承经典，品味地道美食']
          ].map(([name, path, icon, desc]) => (
            <Link key={name} to={path} className="category-card">
              <div className="category-icon">{icon}</div>
              <h4>{name}</h4>
              <p>{desc}</p>
              <span>查看详情</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="right-floating-tools">
        <button>咨询</button>
      </div>
    </div>
  )
}

export default Home
