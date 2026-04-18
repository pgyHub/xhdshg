import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { serviceAPI } from '../services/api'

type ServiceItem = {
  id: number
  name: string
  category: string
  price: number
  description: string
}

type IndustryPageProps = {
  category: string
  title: string
  subtitle: string
  highlights: string[]
  workflow: string[]
  scenarios: string[]
  marketStats: Array<{ label: string; value: string }>
  sampleCases: Array<{ title: string; data: string; desc: string }>
  mockServices: Array<{ name: string; price: number; description: string }>
  showcaseItems: Array<{ title: string; tag: string; summary: string }>
  capabilityMatrix: Array<{ name: string; detail: string }>
  insights: string[]
  faqs: Array<{ q: string; a: string }>
  quickActions?: string[]
  productSystems?: Array<{ title: string; items: string[] }>
  sceneCases?: Array<{ scene: string; desc: string }>
  referenceSites?: Array<{ name: string; url: string }>
  layoutModules?: Array<{ title: string; desc: string }>
  siteStyle?: 'beauty' | 'hair' | 'home' | 'video' | 'restaurant' | 'fashion'
  styleSections?: string[]
}

const IndustryPage = ({
  category,
  title,
  subtitle,
  highlights,
  workflow,
  scenarios,
  marketStats,
  sampleCases,
  mockServices,
  showcaseItems,
  capabilityMatrix,
  insights,
  faqs,
  quickActions,
  productSystems,
  sceneCases,
  referenceSites,
  layoutModules,
  siteStyle,
  styleSections
}: IndustryPageProps) => {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const styleTitleMap = {
    beauty: '品牌电商首页结构',
    hair: '门店服务门户结构',
    home: '全屋定制官网结构',
    video: '创作工具平台结构',
    restaurant: '餐饮品牌门店结构',
    fashion: '服饰零售电商结构'
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceAPI.getServices(category)
        setServices(data as ServiceItem[])
      } catch (err) {
        setError('获取服务数据失败，请稍后重试。')
        console.error('获取服务数据失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [category])

  return (
    <div className={`page-wrap site-style-${siteStyle ?? 'beauty'}`}>
      <section className="industry-hero">
        <div>
          <span className="section-tag">{category}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="industry-hero-actions">
            <Link to="/info/booking-service" className="button button-primary">立即预约</Link>
            <Link to="/dashboard" className="button button-light">查看经营数据</Link>
          </div>
        </div>
        <div className="hero-side-card">
          <h4>热门场景</h4>
          <ul>
            {scenarios.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-visual-placeholder">
            <span>主视觉占位图</span>
            <p>后续替换为业务实拍图 / 品牌KV / 项目效果图</p>
          </div>
        </div>
      </section>

      <section className="promo-strip">
        <p>{category}限时活动：新用户首单立减 12%，企业客户可申请专属方案。当前为演示内容。</p>
        <Link to="/dashboard" className="button button-primary">领取活动方案</Link>
      </section>

      <section className="section site-style-showcase">
        <div className="section-title-row">
          <h3>{styleTitleMap[siteStyle ?? 'beauty']}</h3>
          <span>按你提供的参考网站提炼页面骨架</span>
        </div>
        <div className="style-layout-bar">
          {(styleSections && styleSections.length > 0 ? styleSections : ['主视觉', '分类导航', '核心推荐', '转化入口']).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>分类导航</h3>
          <span>按业务常见服务分类快速浏览</span>
        </div>
        <div className="quick-action-row">
          {highlights.map((item) => (
            <button key={item} className="button quick-action-button">{item}</button>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>推荐服务区</h3>
          <span>虚拟示例，可替换成真实套餐与图文</span>
        </div>
        <div className="cards-grid cards-grid-3">
          {mockServices.slice(0, 3).map((service) => (
            <article key={service.name} className="showcase-card">
              <span className="showcase-tag">推荐</span>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
              <span className="case-data">参考价：¥{service.price.toLocaleString()}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <h3>{title} 专属服务通道</h3>
          <p>当前为演示文案，可替换为你的真实运营活动、优惠信息或品牌主张。</p>
        </div>
        <div className="cta-banner-actions">
          <Link to="/dashboard" className="button button-primary">立即咨询</Link>
          <Link to="/dashboard" className="button button-light">查看案例数据</Link>
        </div>
      </section>

      {quickActions && quickActions.length > 0 && (
        <section className="section">
            <div className="section-title-row">
              <h3>快捷服务</h3>
              <span>参考头部全屋定制站点服务入口</span>
            </div>
            <div className="quick-action-row">
              {quickActions.map((action) => (
                <button key={action} className="button quick-action-button">{action}</button>
              ))}
            </div>
        </section>
      )}

      {productSystems && productSystems.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>产品体系</h3>
            <span>全屋成品 + 全屋定制 + 细分系统</span>
          </div>
          <div className="cards-grid cards-grid-3">
            {productSystems.map((group) => (
              <article className="feature-card" key={group.title}>
                <h4>{group.title}</h4>
                <ul className="plain-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      {sceneCases && sceneCases.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>场景案例</h3>
            <span>住宅 / 公寓 / 商业空间多场景落地</span>
          </div>
          <div className="cards-grid cards-grid-2">
            {sceneCases.map((item) => (
              <article className="showcase-card" key={item.scene}>
                <h4>{item.scene}</h4>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {referenceSites && referenceSites.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>参考站点</h3>
            <span>按指定网站梳理页面结构</span>
          </div>
          <div className="reference-links">
            {referenceSites.map((site) => (
              <a key={site.url} href={site.url} target="_blank" rel="noreferrer">
                {site.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {layoutModules && layoutModules.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>布局模块（虚拟示例）</h3>
            <span>后续可替换为真实图片与文案</span>
          </div>
          <div className="cards-grid cards-grid-3">
            {layoutModules.map((item) => (
              <article className="feature-card" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-title-row">
          <h3>经营数据概览</h3>
          <span>虚拟样例数据，用于页面展示</span>
        </div>
        <div className="dashboard-kpis">
          {marketStats.map((stat) => (
            <article key={stat.label}>
              <h4>{stat.label}</h4>
              <p>{stat.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>核心优势</h3>
          <span>对标行业主流服务标准</span>
        </div>
        <div className="cards-grid cards-grid-3">
          {highlights.map((item) => (
            <article className="feature-card" key={item}>
              <h4>{item}</h4>
              <p>围绕客户体验、交付效率和品质稳定性持续迭代，打造更可靠的服务交付链路。</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>标准流程</h3>
        </div>
        <div className="workflow-grid">
          {workflow.map((item, index) => (
            <div className="workflow-step" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{item}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>作品 / 项目展示</h3>
          <span>按头部站专题页结构呈现</span>
        </div>
        <div className="cards-grid cards-grid-3">
          {showcaseItems.map((item) => (
            <article className="showcase-card" key={item.title}>
              <span className="showcase-tag">{item.tag}</span>
              <h4>{item.title}</h4>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>案例展示</h3>
          <span>转化数据为模拟示例，可持续扩展</span>
        </div>
        <div className="cards-grid cards-grid-3">
          {sampleCases.map((item) => (
            <article className="feature-card" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <span className="case-data">{item.data}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>能力矩阵</h3>
          <span>覆盖咨询、执行、交付全链路</span>
        </div>
        <div className="cards-grid cards-grid-2">
          {capabilityMatrix.map((item) => (
            <article className="feature-card" key={item.name}>
              <h4>{item.name}</h4>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>服务套餐</h3>
          <span>支持按需组合与定制</span>
        </div>
        {error && <div className="status-error">{error}</div>}
        {loading ? (
          <div className="status-info">正在加载服务内容...</div>
        ) : (
          <div className="cards-grid cards-grid-2">
            {(services.length > 0 ? services : mockServices).map((service, index) => (
                <article key={`${service.name}-${index}`} className="service-card">
                  <div className="service-card-head">
                    <h4>{service.name}</h4>
                    <strong>¥{service.price.toLocaleString()}</strong>
                  </div>
                  <p>{service.description}</p>
                  <button className="button button-primary">咨询方案</button>
                </article>
              ))
            }
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>行业洞察</h3>
          <span>用于运营策略参考</span>
        </div>
        <div className="cards-grid">
          {insights.map((item) => (
            <article className="feature-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>常见问题</h3>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <article key={item.q} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? -1 : index)}
              >
                <h4>{item.q}</h4>
                <span>{openFaqIndex === index ? '−' : '+'}</span>
              </button>
              <p className="faq-answer">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}

export default IndustryPage
