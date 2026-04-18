import { Link } from 'react-router-dom'
import { fashionFlagship } from '../data/fashionFlagshipImages'

/**
 * 参考优衣库类服饰电商首页：全宽首屏、四分类入口、双主题带、三列推荐。
 * 配图来自 Unsplash，非优衣库官方素材。
 */
const FashionFlagshipHero = () => {
  const categories = [
    { to: '/info/booking-service', label: '男装定制', sub: '通勤 · 商务', img: fashionFlagship.mens, alt: '男装陈列与搭配' },
    { to: '/info/booking-service', label: '女装定制', sub: '日常 · 礼仪', img: fashionFlagship.womens, alt: '女装展示' },
    { to: '/info/booking-service', label: '亲子童装', sub: '舒适 · 安全', img: fashionFlagship.kids, alt: '童装场景' },
    { to: '/info/booking-service', label: '量体定制', sub: '版型 · 面料', img: fashionFlagship.custom, alt: '量体与面料选择' },
  ]

  const picks = [
    {
      title: '春夏轻商务通勤',
      desc: '易打理面料与微宽松版型，适合高频穿着。',
      img: fashionFlagship.pick1,
      alt: '轻商务风格服饰',
    },
    {
      title: '企业团体工装',
      desc: '统一标识与岗位差异，支持刺绣与批次交付。',
      img: fashionFlagship.pick2,
      alt: '团队服装形象',
    },
    {
      title: '活动与礼仪套装',
      desc: '礼仪场合与主题活动，支持加急打样。',
      img: fashionFlagship.pick3,
      alt: '礼仪服饰搭配',
    },
  ]

  return (
    <div className="fashion-flagship">
      <section className="ff-hero">
        <div className="ff-hero-media">
          <img src={fashionFlagship.hero} alt="服饰门店与陈列空间" loading="eager" />
          <div className="ff-hero-overlay">
            <p className="ff-hero-kicker">小红点生活馆 · 服装定制</p>
            <h1>简约质感，为你量体裁衣</h1>
            <p className="ff-hero-lead">参考旗舰电商的信息架构：大横幅、清晰分类、主题推荐位。配图为开源图库，可替换为你的实拍。</p>
            <div className="ff-hero-actions">
              <Link to="/info/booking-service" className="button button-primary">预约量体</Link>
              <Link to="/dashboard" className="button button-light">查看定制案例数据</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ff-section ff-categories">
        <div className="section-title-row">
          <h2>分类直达</h2>
          <span>按人群与场景快速进入预约与咨询</span>
        </div>
        <div className="ff-category-grid">
          {categories.map((c) => (
            <Link key={c.label} to={c.to} className="ff-category-card">
              <div className="ff-category-img">
                <img src={c.img} alt={c.alt} loading="lazy" />
              </div>
              <div className="ff-category-text">
                <strong>{c.label}</strong>
                <span>{c.sub}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="ff-section ff-dual-bands">
        <div className="ff-dual">
          <Link to="/info/online-consulting" className="ff-dual-card">
            <img src={fashionFlagship.themeLeft} alt="主题系列 · 换季上新" loading="lazy" />
            <div className="ff-dual-caption">
              <h3>换季主题系列</h3>
              <p>面料与色系按季节更新，支持企业团购。</p>
            </div>
          </Link>
          <Link to="/info/booking-service" className="ff-dual-card">
            <img src={fashionFlagship.themeRight} alt="功能科技 · 舒适穿着" loading="lazy" />
            <div className="ff-dual-caption">
              <h3>功能与舒适</h3>
              <p>抗皱、透气、弹力等标签可写入定制方案。</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="ff-section ff-picks">
        <div className="section-title-row">
          <h2>本季推荐方案</h2>
          <span>虚拟示例，可对接真实 SKU 与价格</span>
        </div>
        <div className="ff-pick-grid">
          {picks.map((p) => (
            <article key={p.title} className="ff-pick-card">
              <div className="ff-pick-img">
                <img src={p.img} alt={p.alt} loading="lazy" />
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <p className="ff-footnote">
        说明：未下载优衣库官网图片；使用 Unsplash 授权图模拟「网络旗舰店」版式。你可替换为自有拍摄或购买授权素材。
      </p>
    </div>
  )
}

export default FashionFlagshipHero
