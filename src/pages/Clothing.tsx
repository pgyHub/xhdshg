
const categories = [
  { name: '西装定制', emoji: '👔', desc: '商务正装' },
  { name: '衬衫定制', emoji: '👕', desc: '品质衬衫' },
  { name: '礼服定制', emoji: '🎩', desc: '特殊场合' },
  { name: '旗袍定制', emoji: '👘', desc: '中式定制' },
  { name: '大衣定制', emoji: '🧥', desc: '秋冬单品' },
  { name: '裤装定制', emoji: '👖', desc: '裤装系列' },
]

const products = [
  { name: '经典西装套装', price: '¥3,980', emoji: '👔', category: '西装' },
  { name: '高支棉衬衫', price: '¥680', emoji: '👕', category: '衬衫' },
  { name: '婚礼礼服套餐', price: '¥8,880', emoji: '🎩', category: '礼服' },
  { name: '量身定制旗袍', price: '¥2,980', emoji: '👘', category: '旗袍' },
  { name: '羊绒大衣', price: '¥5,800', emoji: '🧥', category: '大衣' },
  { name: '休闲裤定制', price: '¥580', emoji: '👖', category: '裤装' },
]

const features = [
  { icon: '📏', title: '精准量体', desc: '专业量体师，精准测量每一个部位' },
  { icon: '🧵', title: '精选面料', desc: '来自意大利、英国的品质面料' },
  { icon: '✂️', title: '精湛工艺', desc: '传统裁缝技艺，现代工艺标准' },
  { icon: '🔧', title: '终身服务', desc: '免费修改，终身售后服务' },
]

const Clothing = () => {
  return (
    <div className="clothing-page">
      {/* Hero */}
      <section className="cl-hero">
        <div className="cl-hero-content">
          <h1>量身定制 · 品质生活</h1>
          <p>专业服装定制，为您打造专属魅力</p>
          <button className="cl-btn-primary">立即预约量体</button>
        </div>
      </section>

      {/* 定制分类 */}
      <section className="cl-categories">
        <div className="cl-container">
          <h2 className="cl-section-title">定制品类</h2>
          <div className="cl-categories-grid">
            {categories.map((cat, index) => (
              <div key={index} className="cl-category-card">
                <div className="cl-category-emoji">{cat.emoji}</div>
                <h4>{cat.name}</h4>
                <span>{cat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产品展示 */}
      <section className="cl-products">
        <div className="cl-container">
          <h2 className="cl-section-title">热门产品</h2>
          <div className="cl-products-grid">
            {products.map((product, index) => (
              <div key={index} className="cl-product-card">
                <div className="cl-product-image">{product.emoji}</div>
                <div className="cl-product-info">
                  <span className="cl-product-category">{product.category}</span>
                  <h4>{product.name}</h4>
                  <span className="cl-product-price">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 定制优势 */}
      <section className="cl-features">
        <div className="cl-container">
          <h2 className="cl-section-title">定制优势</h2>
          <div className="cl-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="cl-feature-card">
                <div className="cl-feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cl-cta">
        <div className="cl-container">
          <h2>开启您的定制之旅</h2>
          <p>专业团队，为您打造独一无二的服装</p>
          <button className="cl-btn-primary">立即预约</button>
        </div>
      </section>
    </div>
  )
}

export default Clothing
