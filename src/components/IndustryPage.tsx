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
  sceneCases
}: IndustryPageProps) => {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
    <div className="page-wrap">
      <section className="industry-hero">
        <div>
          <span className="section-tag">{category}</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
          <div className="industry-hero-actions">
            <Link to="/login" className="button button-primary">立即预约</Link>
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
          {faqs.map((item) => (
            <article key={item.q}>
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}

export default IndustryPage
