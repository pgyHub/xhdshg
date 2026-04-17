import Footer from '../components/Footer'

const services = [
  { 
    name: '短视频代运营', 
    price: '¥3,980/月',
    desc: '全托管式服务，省心省力',
    features: ['账号定位规划', '内容策划拍摄', '后期剪辑制作', '数据运营分析', '粉丝互动管理'],
    emoji: '📱'
  },
  { 
    name: '单条视频制作', 
    price: '¥1,280/条',
    desc: '高品质单条视频定制',
    features: ['脚本策划', '专业拍摄', '精细剪辑', '配音字幕', '3次修改'],
    emoji: '🎬'
  },
  { 
    name: '企业宣传片', 
    price: '¥12,800起',
    desc: '品牌级宣传视频制作',
    features: ['创意策划', '4K拍摄', '专业配音', '特效包装', '多版本输出'],
    emoji: '🎥'
  },
]

const process = [
  { step: '01', title: '需求沟通', desc: '了解您的品牌和目标受众', icon: '💬' },
  { step: '02', title: '方案策划', desc: '制定内容策略和创意方向', icon: '📝' },
  { step: '03', title: '拍摄执行', desc: '专业团队现场拍摄', icon: '📹' },
  { step: '04', title: '后期制作', desc: '剪辑、调色、特效包装', icon: '✂️' },
  { step: '05', title: '审核交付', desc: '满意后交付成片', icon: '✅' },
]

const ShortVideoProduction = () => {
  return (
    <div className="short-video-page">
      {/* Hero */}
      <section className="sv-hero">
        <div className="sv-hero-content">
          <span className="sv-hero-tag">CAPCUT</span>
          <h1>用视频讲述您的故事</h1>
          <p>专业短视频制作团队，让品牌更具影响力</p>
          <div className="sv-hero-actions">
            <button className="sv-btn-primary">立即咨询</button>
            <button className="sv-btn-secondary">查看案例</button>
          </div>
        </div>
      </section>

      {/* 服务项目 */}
      <section className="sv-services">
        <div className="sv-container">
          <h2 className="sv-section-title">服务项目</h2>
          <div className="sv-services-grid">
            {services.map((service, index) => (
              <div key={index} className="sv-service-card">
                <div className="sv-service-icon">{service.emoji}</div>
                <h3>{service.name}</h3>
                <div className="sv-service-price">{service.price}</div>
                <p className="sv-service-desc">{service.desc}</p>
                <ul className="sv-service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button className="sv-service-btn">立即预约</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务流程 */}
      <section className="sv-process">
        <div className="sv-container">
          <h2 className="sv-section-title">制作流程</h2>
          <div className="sv-process-grid">
            {process.map((item, index) => (
              <div key={index} className="sv-process-item">
                <div className="sv-process-num">{item.step}</div>
                <div className="sv-process-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 案例展示 */}
      <section className="sv-cases">
        <div className="sv-container">
          <h2 className="sv-section-title">作品案例</h2>
          <div className="sv-cases-grid">
            {[
              { title: '品牌形象片', type: '品牌宣传', emoji: '🎯' },
              { title: '产品种草视频', type: '电商带货', emoji: '🛒' },
              { title: '门店引流视频', type: '本地生活', emoji: '📍' },
              { title: '活动纪实', type: '活动记录', emoji: '🎉' },
              { title: '知识科普', type: '内容输出', emoji: '📚' },
              { title: '剧情短片', type: '内容创作', emoji: '🎭' },
            ].map((item, index) => (
              <div key={index} className="sv-case-card">
                <div className="sv-case-emoji">{item.emoji}</div>
                <h4>{item.title}</h4>
                <span>{item.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sv-cta">
        <div className="sv-container">
          <h2>开启您的视频营销之旅</h2>
          <p>专业团队，助力品牌增长</p>
          <button className="sv-btn-primary">立即预约</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ShortVideoProduction
