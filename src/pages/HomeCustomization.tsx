
const spaces = [
  { name: '客厅', emoji: '🛋️', desc: '会客娱乐核心区域' },
  { name: '卧室', emoji: '🛏️', desc: '私密休息空间' },
  { name: '厨房', emoji: '🍳', desc: '烹饪料理中心' },
  { name: '书房', emoji: '📚', desc: '学习工作空间' },
  { name: '衣帽间', emoji: '👔', desc: '收纳整理区域' },
  { name: '阳台', emoji: '🌿', desc: '休闲观景区' },
]

const styles = [
  { name: '现代简约', color: '#607d8b', emoji: '🏠', desc: '简洁线条，注重空间感' },
  { name: '欧式古典', color: '#8d6e63', emoji: '🏰', desc: '精致雕花，华丽氛围' },
  { name: '新中式', color: '#bf360c', emoji: '🐉', desc: '传统元素，现代演绎' },
  { name: '北欧自然', color: '#558b2f', emoji: '🌲', desc: '原木质感，温馨舒适' },
]

const services = [
  { name: '全屋设计方案', price: '免费', features: ['上门量房', '3套方案供选', 'VR全景预览'] },
  { name: '基础套餐', price: '¥680/㎡', features: ['柜体定制', '标准五金', '专业安装'] },
  { name: '尊享套餐', price: '¥980/㎡', features: ['全屋定制', '进口五金', '终身质保'] },
]

const HomeCustomization = () => {
  return (
    <div className="home-customization-page">
      {/* Hero */}
      <section className="hc-hero">
        <div className="hc-hero-bg"></div>
        <div className="hc-hero-content">
          <span className="hc-hero-tag">HOMEKOODW</span>
          <h1>定制专属理想家</h1>
          <p>专业设计团队 · 品质材料 · 一站式服务</p>
          <div className="hc-hero-actions">
            <button className="hc-btn-primary">免费预约设计</button>
            <button className="hc-btn-secondary">查看案例</button>
          </div>
        </div>
      </section>

      {/* 空间分类 */}
      <section className="hc-spaces">
        <div className="hc-container">
          <h2 className="hc-section-title">全屋空间定制</h2>
          <div className="hc-spaces-grid">
            {spaces.map((space, index) => (
              <div key={index} className="hc-space-card">
                <div className="hc-space-emoji">{space.emoji}</div>
                <h4>{space.name}</h4>
                <p>{space.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 设计风格 */}
      <section className="hc-styles">
        <div className="hc-container">
          <h2 className="hc-section-title">设计风格</h2>
          <div className="hc-styles-grid">
            {styles.map((style, index) => (
              <div key={index} className="hc-style-card" style={{ borderBottomColor: style.color }}>
                <div className="hc-style-emoji">{style.emoji}</div>
                <h4>{style.name}</h4>
                <p>{style.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务套餐 */}
      <section className="hc-services">
        <div className="hc-container">
          <h2 className="hc-section-title">服务套餐</h2>
          <div className="hc-services-grid">
            {services.map((service, index) => (
              <div key={index} className={`hc-service-card ${index === 1 ? 'featured' : ''}`}>
                {index === 1 && <div className="hc-service-badge">推荐</div>}
                <h3>{service.name}</h3>
                <div className="hc-service-price">{service.price}</div>
                <ul className="hc-service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button className="hc-service-btn">立即咨询</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 流程 */}
      <section className="hc-process">
        <div className="hc-container">
          <h2 className="hc-section-title">服务流程</h2>
          <div className="hc-process-steps">
            <div className="hc-step">
              <div className="hc-step-num">01</div>
              <h4>预约量房</h4>
              <p>专业团队上门测量</p>
            </div>
            <div className="hc-step">
              <div className="hc-step-num">02</div>
              <h4>方案设计</h4>
              <p>3套方案供您选择</p>
            </div>
            <div className="hc-step">
              <div className="hc-step-num">03</div>
              <h4>确认下单</h4>
              <p>确定方案，签订合同</p>
            </div>
            <div className="hc-step">
              <div className="hc-step-num">04</div>
              <h4>生产配送</h4>
              <p>工厂生产，专业配送</p>
            </div>
            <div className="hc-step">
              <div className="hc-step-num">05</div>
              <h4>安装验收</h4>
              <p>专业安装，满意交付</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hc-cta">
        <div className="hc-container">
          <h2>开启您的定制之旅</h2>
          <p>专业团队，为您打造梦想家</p>
          <button className="hc-btn-primary">立即预约</button>
        </div>
      </section>
    </div>
  )
}

export default HomeCustomization
