import { useState } from 'react'
import { Link } from 'react-router-dom'

const Makeup = () => {
  const [activeTab, setActiveTab] = useState('bridal')
  
  const services = {
    bridal: {
      title: '新娘妆',
      items: [
        { name: '韩式新娘妆', price: '¥1,980', duration: '全天', features: ['主妆造型', '敬酒妆', '送客服妆', '全程跟妆'] },
        { name: '中式龙凤褂妆', price: '¥2,280', duration: '全天', features: ['中式造型', '龙凤褂配套', '多次换装', '补妆服务'] },
        { name: '欧式宫廷妆', price: '¥2,580', duration: '全天', features: ['欧式造型', '皇冠配饰', '王室风格', '精致眼妆'] },
      ]
    },
    commercial: {
      title: '商务形象妆',
      items: [
        { name: '商务会议妆', price: '¥299', duration: '45分钟', features: ['自然妆容', '职业形象', '快速打造', '日常适用'] },
        { name: '商务酒会妆', price: '¥499', duration: '60分钟', features: ['优雅妆容', '晚宴风格', '配饰建议', '持久定型'] },
        { name: '商务拍摄妆', price: '¥399', duration: '50分钟', features: ['上镜妆容', '光影优化', '专业效果', '快速完成'] },
      ]
    },
    event: {
      title: '活动晚宴妆',
      items: [
        { name: '晚宴精致妆', price: '¥699', duration: '90分钟', features: ['高级感妆容', '礼服搭配', '发型设计', '氛围造型'] },
        { name: '红毯妆容', price: '¥999', duration: '120分钟', features: ['明星同款', '奢华造型', '全套服务', '摄影优化'] },
        { name: '派对主题妆', price: '¥599', duration: '75分钟', features: ['时尚妆容', '主题造型', '创意设计', '个性展现'] },
      ]
    }
  }

  const looks = [
    { name: '轻氧裸感妆', tag: '日常', emoji: '💄', desc: '通透自然，伪素颜的高级感' },
    { name: '高级感烟熏妆', tag: '晚宴', emoji: '✨', desc: '深邃眼眸，神秘优雅气质' },
    { name: '元气蜜桃妆', tag: '约会', emoji: '🍑', desc: '甜美清新，元气少女感' },
    { name: '复古红唇妆', tag: '派对', emoji: '💋', desc: '经典东方美，惊艳全场' },
    { name: '清冷茶艺妆', tag: '气质', emoji: '🍵', desc: '清冷疏离感，文艺女神范' },
    { name: '混血欧美妆', tag: '时尚', emoji: '👁️', desc: '立体深邃，异域风情' },
  ]

  const artists = [
    { name: 'Linda Wang', title: '首席化妆师', specialty: '新娘妆/商业妆', emoji: '👩‍🎨', experience: '12年经验' },
    { name: 'Mona Chen', title: '高级化妆师', specialty: '晚宴妆/派对妆', emoji: '💄', experience: '8年经验' },
    { name: 'Sophie Liu', title: '资深化妆师', specialty: '影视妆/特效妆', emoji: '🎬', experience: '10年经验' },
    { name: 'Amy Zhang', title: '化妆师', specialty: '日常妆/约会妆', emoji: '💋', experience: '5年经验' },
  ]

  return (
    <div className="makeup-page">
      {/* Hero Section */}
      <section className="mk-hero">
        <div className="mk-hero-content">
          <div className="mk-hero-text">
            <span className="mk-hero-tag">MAOGEPING BEAUTY</span>
            <h1>发现你的独特之美</h1>
            <p>专业彩妆团队，为您打造完美形象</p>
            <div className="mk-hero-actions">
              <button className="mk-btn-primary">立即预约</button>
              <button className="mk-btn-secondary">浏览妆面</button>
            </div>
          </div>
          <div className="mk-hero-visual">
            <div className="mk-visual-main">💄</div>
            <div className="mk-visual-accent">
              <span>✨</span>
              <span>💋</span>
              <span>👑</span>
            </div>
          </div>
        </div>
      </section>

      {/* 服务分类 */}
      <section className="mk-services">
        <div className="mk-container">
          <h2 className="mk-section-title">服务项目</h2>
          <div className="mk-service-tabs">
            <button 
              className={`mk-tab ${activeTab === 'bridal' ? 'active' : ''}`}
              onClick={() => setActiveTab('bridal')}
            >
              💍 新娘妆
            </button>
            <button 
              className={`mk-tab ${activeTab === 'commercial' ? 'active' : ''}`}
              onClick={() => setActiveTab('commercial')}
            >
              💼 商务形象
            </button>
            <button 
              className={`mk-tab ${activeTab === 'event' ? 'active' : ''}`}
              onClick={() => setActiveTab('event')}
            >
              🥂 活动晚宴
            </button>
          </div>
          
          <div className="mk-service-content">
            <h3 className="mk-service-title">{services[activeTab].title}</h3>
            <div className="mk-service-grid">
              {services[activeTab].items.map((service, index) => (
                <div key={index} className="mk-service-card">
                  <div className="mk-service-header">
                    <h4>{service.name}</h4>
                    <span className="mk-service-duration">{service.duration}</span>
                  </div>
                  <div className="mk-service-price">{service.price}</div>
                  <ul className="mk-service-features">
                    {service.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <button className="mk-service-btn">立即预约</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 热门妆面 */}
      <section className="mk-looks">
        <div className="mk-container">
          <h2 className="mk-section-title">热门妆面</h2>
          <p className="mk-section-subtitle">精选当下最流行的妆容风格</p>
          <div className="mk-looks-grid">
            {looks.map((look, index) => (
              <div key={index} className="mk-look-card">
                <div className="mk-look-visual">{look.emoji}</div>
                <div className="mk-look-info">
                  <span className="mk-look-tag">{look.tag}</span>
                  <h4>{look.name}</h4>
                  <p>{look.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 造型师团队 */}
      <section className="mk-artists">
        <div className="mk-container">
          <h2 className="mk-section-title">造型师团队</h2>
          <p className="mk-section-subtitle">专业团队，为您量身定制</p>
          <div className="mk-artists-grid">
            {artists.map((artist, index) => (
              <div key={index} className="mk-artist-card">
                <div className="mk-artist-avatar">{artist.emoji}</div>
                <h4>{artist.name}</h4>
                <span className="mk-artist-title">{artist.title}</span>
                <span className="mk-artist-specialty">{artist.specialty}</span>
                <span className="mk-artist-experience">{artist.experience}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌特色 */}
      <section className="mk-features">
        <div className="mk-container">
          <div className="mk-features-grid">
            <div className="mk-feature-card">
              <div className="mk-feature-icon">🌿</div>
              <h3>天然成分</h3>
              <p>选用国际知名品牌彩妆，确保对肌肤无刺激</p>
            </div>
            <div className="mk-feature-card">
              <div className="mk-feature-icon">💎</div>
              <h3>专业品质</h3>
              <p>资深化妆师团队，多年行业经验</p>
            </div>
            <div className="mk-feature-card">
              <div className="mk-feature-icon">⏰</div>
              <h3>准时交付</h3>
              <p>严格把控时间，确保准时完成</p>
            </div>
            <div className="mk-feature-card">
              <div className="mk-feature-icon">📱</div>
              <h3>便捷预约</h3>
              <p>在线预约，专业顾问全程服务</p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="mk-cta">
        <div className="mk-container">
          <h2>开启您的美丽之旅</h2>
          <p>专业彩妆服务，让每一天都闪耀光彩</p>
          <div className="mk-cta-actions">
            <button className="mk-btn-primary">立即预约</button>
            <Link to="/hairdressing" className="mk-btn-link">查看美发服务 →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Makeup
