import { Link } from 'react-router-dom'

const entryCards = [
  { title: '进入工作台', desc: '快速进入业务管理后台，统一查看模块数据。', path: '/member-backend' },
  { title: '浏览数据看板', desc: '查看经营分析、趋势图与关键指标监控。', path: '/dashboard' },
  { title: '浏览大屏模板', desc: '体验可视化驾驶舱风格模板与行业展示页。', path: '/dashboard' }
]

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
        <button>评</button>
        <button>改</button>
        <button>询</button>
      </div>
    </div>
  )
}

export default Home
