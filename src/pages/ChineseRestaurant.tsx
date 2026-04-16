import { Link } from 'react-router-dom'

const ChineseRestaurant = () => {
  const dishes = [
    { name: '招牌北京烤鸭', category: '招牌菜', price: '¥298', emoji: '🦆', desc: '传统工艺，皮脆肉嫩' },
    { name: '宫保鸡丁', category: '经典川菜', price: '¥68', emoji: '🍗', desc: '麻辣鲜香，下饭神器' },
    { name: '清蒸鲈鱼', category: '鲜活海鲜', price: '¥168', emoji: '🐟', desc: '新鲜食材，清淡养生' },
    { name: '红烧狮子头', category: '淮扬名菜', price: '¥88', emoji: '🥩', desc: '入口即化，肥而不腻' },
    { name: '糖醋里脊', category: '酸甜口味', price: '¥58', emoji: '🍖', desc: '外酥里嫩，酸甜可口' },
    { name: '麻婆豆腐', category: '川菜代表', price: '¥38', emoji: '🧈', desc: '麻辣鲜香，开胃下饭' },
  ]

  const packages = [
    { name: '家庭聚会套餐', price: '¥888', people: '4-6人', features: ['8道热菜', '2道凉菜', '1份甜品', '茶水免费'] },
    { name: '商务宴请套餐', price: '¥1,888', people: '10人桌', features: ['12道菜品', '4道凉菜', '2份甜品', '指定酒水'] },
    { name: '婚宴寿宴套餐', price: '¥2,888', people: '10人桌', features: ['14道菜品', '6道凉菜', '3份甜品', '场地布置'] },
  ]

  return (
    <div className="restaurant-page">
      {/* Hero */}
      <section className="res-hero">
        <div className="res-hero-overlay"></div>
        <div className="res-hero-content">
          <span className="res-hero-badge">LXJ CHINA</span>
          <h1>传承经典 · 品味地道</h1>
          <p>正宗中餐，家的味道</p>
          <div className="res-hero-actions">
            <button className="res-btn-primary">立即订座</button>
            <button className="res-btn-secondary">浏览菜单</button>
          </div>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="res-story">
        <div className="res-container">
          <div className="res-story-content">
            <div className="res-story-text">
              <h2>关于龙香居</h2>
              <p>龙香居始创于1998年，专注于传承中华美食文化，选用新鲜食材，由资深厨师团队精心烹制，为您呈现地道的家乡味道。</p>
              <div className="res-story-stats">
                <div className="res-stat">
                  <span className="res-stat-num">26</span>
                  <span className="res-stat-label">年历史</span>
                </div>
                <div className="res-stat">
                  <span className="res-stat-num">50万+</span>
                  <span className="res-stat-label">顾客信赖</span>
                </div>
                <div className="res-stat">
                  <span className="res-stat-num">98%</span>
                  <span className="res-stat-label">好评率</span>
                </div>
              </div>
            </div>
            <div className="res-story-visual">🍜</div>
          </div>
        </div>
      </section>

      {/* 招牌菜品 */}
      <section className="res-dishes">
        <div className="res-container">
          <h2 className="res-section-title">招牌菜品</h2>
          <div className="res-dishes-grid">
            {dishes.map((dish, index) => (
              <div key={index} className="res-dish-card">
                <div className="res-dish-emoji">{dish.emoji}</div>
                <div className="res-dish-info">
                  <span className="res-dish-category">{dish.category}</span>
                  <h4>{dish.name}</h4>
                  <p>{dish.desc}</p>
                </div>
                <div className="res-dish-price">{dish.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 套餐推荐 */}
      <section className="res-packages">
        <div className="res-container">
          <h2 className="res-section-title">精选套餐</h2>
          <div className="res-packages-grid">
            {packages.map((pkg, index) => (
              <div key={index} className={`res-package-card ${index === 1 ? 'featured' : ''}`}>
                {index === 1 && <div className="res-package-badge">最受欢迎</div>}
                <h3>{pkg.name}</h3>
                <div className="res-package-price">{pkg.price}</div>
                <span className="res-package-people">{pkg.people}</span>
                <ul className="res-package-features">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button className="res-package-btn">立即预订</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 预约CTA */}
      <section className="res-cta">
        <div className="res-container">
          <h2>期待您的光临</h2>
          <p>订座热线：400-888-9999</p>
          <button className="res-btn-primary">立即订座</button>
        </div>
      </section>
    </div>
  )
}

export default ChineseRestaurant
