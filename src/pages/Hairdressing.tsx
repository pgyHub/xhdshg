import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Hairdressing = () => {
  const services = [
    { 
      category: '造型服务', 
      items: [
        { name: '精致剪发', price: '¥168', time: '60分钟', emoji: '✂️', desc: '资深发型师剪发+造型' },
        { name: '时尚烫发', price: '¥488', time: '120分钟', emoji: '💇', desc: '冷烫/热烫可选，含护理' },
        { name: '潮流染发', price: '¥398', time: '90分钟', emoji: '🎨', desc: '进口染剂，色彩饱满' },
        { name: '烫染套餐', price: '¥768', time: '180分钟', emoji: '💆', desc: '烫发+染发+护理全套' },
      ]
    },
    {
      category: '护理服务',
      items: [
        { name: '头皮深层护理', price: '¥288', time: '45分钟', emoji: '🌿', desc: '头皮清洁+按摩+滋养' },
        { name: '受损发质修护', price: '¥328', time: '60分钟', emoji: '💚', desc: '专业护理，还原秀发健康' },
        { name: '丝滑顺发护理', price: '¥268', time: '40分钟', emoji: '✨', desc: '瞬间顺滑，光泽亮丽' },
      ]
    },
    {
      category: '会员服务',
      items: [
        { name: '月度会员', price: '¥1,680/月', time: '', emoji: '👑', desc: '无限次洗剪吹+8折优惠' },
        { name: '季度会员', price: '¥4,280/季', time: '', emoji: '💎', desc: '全部服务5折+专属造型师' },
        { name: '年度会员', price: '¥15,800/年', time: '', emoji: '🌟', desc: '全年无限次+优先预约' },
      ]
    }
  ]

  const trends = [
    { name: '法式慵懒卷', style: '优雅', emoji: '💃', color: '#8B4513' },
    { name: '韩式空气刘海', style: '清新', emoji: '🌸', color: '#DDA0DD' },
    { name: '日系短发', style: '干练', emoji: '🍃', color: '#696969' },
    { name: '欧美挑染', style: '个性', emoji: '⚡', color: '#FF6B6B' },
    { name: '中式复古盘发', style: '端庄', emoji: '🐉', color: '#8B0000' },
    { name: '精灵短发', style: '俏皮', emoji: '✨', color: '#C0C0C0' },
  ]

  const stylists = [
    { name: 'Tony Zhang', position: '艺术总监', specialty: '创意染发/造型', experience: '15年', emoji: '👨‍🎨', rating: 4.9 },
    { name: 'Coco Wang', position: '资深发型师', specialty: '韩式烫发/护理', experience: '10年', emoji: '💇‍♀️', rating: 4.8 },
    { name: 'Ken Lee', position: '发型师', specialty: '日系剪发/造型', experience: '8年', emoji: '✂️', rating: 4.9 },
    { name: 'Mika Liu', position: '色彩总监', specialty: '创意染发/挑染', experience: '12年', emoji: '🎨', rating: 4.9 },
  ]

  return (
    <div className="hairdressing-page">
      {/* Hero Section */}
      <section className="hd-hero">
        <div className="hd-hero-content">
          <div className="hd-hero-text">
            <span className="hd-hero-tag">MEIFAZHAN</span>
            <h1>从头开始改变</h1>
            <p>专业美发团队，打造专属您的时尚造型</p>
          </div>
          <div className="hd-hero-visual">
            <div className="hd-hero-main">✂️</div>
          </div>
        </div>
      </section>

      {/* 热门趋势 */}
      <section className="hd-trends">
        <div className="hd-container">
          <h2 className="hd-section-title">热门发型趋势</h2>
          <p className="hd-section-subtitle">当下最in的发型灵感</p>
          <div className="hd-trends-grid">
            {trends.map((trend, index) => (
              <div key={index} className="hd-trend-card" style={{ borderTopColor: trend.color }}>
                <div className="hd-trend-emoji">{trend.emoji}</div>
                <h4>{trend.name}</h4>
                <span className="hd-trend-style">{trend.style}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务项目 */}
      <section className="hd-services">
        <div className="hd-container">
          {services.map((section, idx) => (
            <div key={idx} className="hd-service-section">
              <h3 className="hd-service-category">{section.category}</h3>
              <div className="hd-service-grid">
                {section.items.map((item, i) => (
                  <div key={i} className="hd-service-card">
                    <div className="hd-service-icon">{item.emoji}</div>
                    <div className="hd-service-info">
                      <h4>{item.name}</h4>
                      <p>{item.desc}</p>
                      {item.time && <span className="hd-service-time">{item.time}</span>}
                    </div>
                    <div className="hd-service-price-wrap">
                      <span className="hd-service-price">{item.price}</span>
                      <button className="hd-service-btn">预约</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 发型师团队 */}
      <section className="hd-stylists">
        <div className="hd-container">
          <h2 className="hd-section-title">发型师团队</h2>
          <div className="hd-stylists-grid">
            {stylists.map((stylist, index) => (
              <div key={index} className="hd-stylist-card">
                <div className="hd-stylist-avatar">{stylist.emoji}</div>
                <div className="hd-stylist-info">
                  <h4>{stylist.name}</h4>
                  <span className="hd-stylist-position">{stylist.position}</span>
                  <p className="hd-stylist-specialty">{stylist.specialty}</p>
                  <div className="hd-stylist-meta">
                    <span>{stylist.experience}</span>
                    <span className="hd-stylist-rating">★ {stylist.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 预约CTA */}
      <section className="hd-cta">
        <div className="hd-container">
          <div className="hd-cta-content">
            <h2>预约您的专属造型</h2>
            <p>专业团队，为您打造完美发型</p>
            <div className="hd-cta-buttons">
              <button className="hd-btn-primary">立即预约</button>
              <Link to="/makeup" className="hd-btn-link">查看彩妆服务 →</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Hairdressing
