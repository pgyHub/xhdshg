import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const WeddingPhotography = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = ['全部', '室内韩式', '城市旅拍', '海岛风光', '森系草坪', '中式国风']
  
  const portfolioItems = [
    { id: 1, title: '三亚海岛旅拍', category: '海岛风光', price: '¥5,999', image: '🏝️' },
    { id: 2, title: '法式浪漫棚拍', category: '室内韩式', price: '¥3,999', image: '💐' },
    { id: 3, title: '大理洱海旅拍', category: '城市旅拍', price: '¥6,999', image: '🌊' },
    { id: 4, title: '森系草坪婚礼', category: '森系草坪', price: '¥7,999', image: '🌿' },
    { id: 5, title: '中式凤冠霞帔', category: '中式国风', price: '¥8,999', image: '🐉' },
    { id: 6, title: '厦门鼓浪屿', category: '城市旅拍', price: '¥5,499', image: '🏖️' },
    { id: 7, title: '韩式极简风', category: '室内韩式', price: '¥3,599', image: '💕' },
    { id: 8, title: '青岛海边日落', category: '海岛风光', price: '¥5,799', image: '🌅' },
  ]

  const filteredItems = activeCategory === 'all' || activeCategory === '全部' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <div className="wedding-photography-page">
      {/* Hero Banner */}
      <section className="wp-hero-banner">
        <div className="wp-hero-overlay"></div>
        <div className="wp-hero-content">
          <h1>定格永恒瞬间</h1>
          <p>专业团队 · 匠心之作 · 记录你们的爱情故事</p>
          <div className="wp-hero-actions">
            <button className="wp-btn-primary">立即预约</button>
            <button className="wp-btn-secondary">查看套餐</button>
          </div>
        </div>
        <div className="wp-hero-gallery">
          <div className="wp-gallery-item large">💍</div>
          <div className="wp-gallery-item">👰</div>
          <div className="wp-gallery-item">🤵</div>
          <div className="wp-gallery-item">💒</div>
        </div>
      </section>

      {/* 品牌优势 */}
      <section className="wp-advantages">
        <div className="wp-section-container">
          <h2 className="wp-section-title">为什么选择我们</h2>
          <div className="wp-advantage-grid">
            <div className="wp-advantage-card">
              <div className="wp-advantage-icon">📷</div>
              <h3>双摄影师团队</h3>
              <p>主摄影师+副摄影师全程跟拍，不错过任何精彩瞬间</p>
            </div>
            <div className="wp-advantage-card">
              <div className="wp-advantage-icon">💄</div>
              <h3>专属造型团队</h3>
              <p>资深化妆师+造型师，打造完美妆发造型</p>
            </div>
            <div className="wp-advantage-card">
              <div className="wp-advantage-icon">🎬</div>
              <h3>微电影拍摄</h3>
              <p>赠送婚礼纪实微电影，留下动态的美好回忆</p>
            </div>
            <div className="wp-advantage-card">
              <div className="wp-advantage-icon">📚</div>
              <h3>相册精装定制</h3>
              <p>进口材质相册，精工装帧，终身保存</p>
            </div>
          </div>
        </div>
      </section>

      {/* 风格分类 */}
      <section className="wp-style-categories">
        <div className="wp-section-container">
          <div className="wp-category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`wp-category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 客片展示 */}
      <section className="wp-portfolio">
        <div className="wp-section-container">
          <h2 className="wp-section-title">真实客片展示</h2>
          <p className="wp-section-subtitle">每一组照片都来自真实的客户故事</p>
          <div className="wp-portfolio-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="wp-portfolio-item">
                <div className="wp-portfolio-image">{item.image}</div>
                <div className="wp-portfolio-info">
                  <h3>{item.title}</h3>
                  <span className="wp-portfolio-category">{item.category}</span>
                  <span className="wp-portfolio-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 套餐推荐 */}
      <section className="wp-packages">
        <div className="wp-section-container">
          <h2 className="wp-section-title">热门套餐</h2>
          <div className="wp-packages-grid">
            <div className="wp-package-card featured">
              <div className="wp-package-badge">最受欢迎</div>
              <h3>城市轻旅拍</h3>
              <div className="wp-package-price">
                <span className="currency">¥</span>
                <span className="amount">4,299</span>
              </div>
              <ul className="wp-package-features">
                <li>✓ 资深摄影师拍摄</li>
                <li>✓ 专属化妆造型</li>
                <li>✓ 2套服装拍摄</li>
                <li>✓ 35张精修底片</li>
                <li>✓ 电子相册一份</li>
                <li>✓ 8寸精美相册</li>
              </ul>
              <button className="wp-package-btn">立即预约</button>
            </div>
            
            <div className="wp-package-card">
              <h3>高定婚礼跟拍</h3>
              <div className="wp-package-price">
                <span className="currency">¥</span>
                <span className="amount">8,999</span>
              </div>
              <ul className="wp-package-features">
                <li>✓ 双机位全程跟拍</li>
                <li>✓ 婚礼快剪视频</li>
                <li>✓ 精修照片80张</li>
                <li>✓ 短视频花絮</li>
                <li>✓ 12寸豪华相册</li>
                <li>✓ 底片全送</li>
              </ul>
              <button className="wp-package-btn outline">立即预约</button>
            </div>
            
            <div className="wp-package-card">
              <h3>韩式棚拍经典</h3>
              <div className="wp-package-price">
                <span className="currency">¥</span>
                <span className="amount">3,599</span>
              </div>
              <ul className="wp-package-features">
                <li>✓ 4组场景拍摄</li>
                <li>✓ 3套精致造型</li>
                <li>✓ 25张精修照片</li>
                <li>✓ 亲友同框拍摄</li>
                <li>✓ 6寸相册一本</li>
              </ul>
              <button className="wp-package-btn outline">立即预约</button>
            </div>
          </div>
        </div>
      </section>

      {/* 拍摄流程 */}
      <section className="wp-process">
        <div className="wp-section-container">
          <h2 className="wp-section-title">拍摄流程</h2>
          <div className="wp-process-timeline">
            <div className="wp-process-step">
              <div className="wp-step-number">01</div>
              <div className="wp-step-content">
                <h3>咨询预约</h3>
                <p>在线预约，专业顾问1对1服务</p>
              </div>
            </div>
            <div className="wp-process-step">
              <div className="wp-step-number">02</div>
              <div className="wp-step-content">
                <h3>风格沟通</h3>
                <p>确定拍摄风格、服装和场景</p>
              </div>
            </div>
            <div className="wp-process-step">
              <div className="wp-step-number">03</div>
              <div className="wp-step-content">
                <h3>拍摄执行</h3>
                <p>专业团队全程服务</p>
              </div>
            </div>
            <div className="wp-process-step">
              <div className="wp-step-number">04</div>
              <div className="wp-step-content">
                <h3>后期精修</h3>
                <p>专业调色和精修处理</p>
              </div>
            </div>
            <div className="wp-process-step">
              <div className="wp-step-number">05</div>
              <div className="wp-step-content">
                <h3>交付成品</h3>
                <p>精美相册和电子版交付</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 底部CTA */}
      <section className="wp-cta">
        <div className="wp-section-container">
          <h2>记录你们的爱情故事</h2>
          <p>专业团队，为您打造独一无二的婚纱照</p>
          <div className="wp-cta-actions">
            <button className="wp-btn-primary large">立即预约拍摄</button>
            <Link to="/makeup" className="wp-btn-link">查看彩妆服务 →</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default WeddingPhotography
