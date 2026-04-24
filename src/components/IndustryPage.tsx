import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS_MODULES } from '../data/businessNav'
import { serviceAPI } from '../services/api'
import { PublicImg } from './PublicImg'
import { publicAsset } from '../utils/publicAsset'

type ServiceItem = {
  id: number
  name: string
  category: string
  price: number
  description: string
}

/** 避免接口/脏数据导致 price 非法时 toLocaleString 抛错、整页白屏 */
function formatYuan(value: unknown): string {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('zh-CN')
}

function normalizeServiceRows(raw: unknown): ServiceItem[] {
  if (!Array.isArray(raw)) return []
  return raw.map((row, i) => {
    const r = row as Record<string, unknown>
    const priceRaw = r.price
    const price = typeof priceRaw === 'number' ? priceRaw : Number(priceRaw)
    const idNum = typeof r.id === 'number' ? r.id : Number(r.id)
    return {
      id: Number.isFinite(idNum) ? idNum : -(i + 1),
      name: String(r.name ?? ''),
      category: String(r.category ?? ''),
      price: Number.isFinite(price) ? price : 0,
      description: String(r.description ?? '')
    }
  })
}

export type HeroMediaItem = { src: string; alt: string; kind?: 'image' | 'video'; imagePosition?: string }

const isHeroVideo = (m: HeroMediaItem) =>
  m.kind === 'video' || /\.(mp4|webm|ogg)(\?|$)/i.test(m.src)

type IndustryPageProps = {
  category: string
  title: string
  subtitle: string
  highlights: string[]
  workflow: string[]
  scenarios: string[]
  marketStats: Array<{ label: string; value: string }>
  sampleCases: Array<{ title: string; data: string; desc: string }>
  mockServices: Array<{ name: string; price: number; description: string; image?: string; imagePosition?: string }>
  showcaseItems: Array<{ title: string; tag: string; summary: string; image?: string; imagePosition?: string }>
  capabilityMatrix: Array<{ name: string; detail: string }>
  insights: string[]
  faqs: Array<{ q: string; a: string }>
  quickActions?: string[]
  productSystems?: Array<{ title: string; items: string[] }>
  sceneCases?: Array<{ scene: string; desc: string }>
  referenceSites?: Array<{ name: string; url: string }>
  layoutModules?: Array<{ title: string; desc: string; image?: string; imagePosition?: string }>
  /** 右侧主视觉：传入则用实拍图 / 视频替换灰底占位（可传多条纵向排列） */
  heroMedia?: HeroMediaItem | HeroMediaItem[]
  /** 门店环境 / 明档等横图展示 */
  venueGallery?: Array<{ src: string; caption: string; imagePosition?: string }>
  /** 三图横滑区块标题（默认仅适用于餐饮） */
  venueSectionTitle?: string
  venueSectionSubtitle?: string
  siteStyle?: 'beauty' | 'hair' | 'home' | 'video' | 'restaurant' | 'fashion'
  styleSections?: string[]
  /** 为 true 时不渲染默认双栏 Hero（用于上方已自定义旗舰店首屏） */
  skipDefaultHero?: boolean
  /**
   * 整段双栏 Hero 区域铺满视频背景；多段时按 dwellMs 交叉淡入轮播（类似背景轮播图）。
   * 与 `heroMedia` 中的视频二选一：若设置此项，则不在侧栏堆叠视频，仅保留 `heroMedia` 里的图片类条目。
   */
  heroBackdropVideos?: {
    sources: string[]
    /** 每条视频作为「当前背景」的停留时长（毫秒），默认 14000 */
    dwellMs?: number
    /** 淡入淡出时长（毫秒），默认 900；对应 CSS 变量 */
    crossfadeMs?: number
  }
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
  heroMedia,
  venueGallery,
  venueSectionTitle,
  venueSectionSubtitle,
  siteStyle,
  styleSections,
  skipDefaultHero,
  heroBackdropVideos
}: IndustryPageProps) => {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const safeHighlights = Array.isArray(highlights) ? highlights : []
  const safeWorkflow = Array.isArray(workflow) ? workflow : []
  const safeScenarios = Array.isArray(scenarios) ? scenarios : []
  const safeMarketStats = Array.isArray(marketStats) ? marketStats : []
  const safeSampleCases = Array.isArray(sampleCases) ? sampleCases : []
  const safeMockServices = Array.isArray(mockServices) ? mockServices : []
  const safeShowcaseItems = Array.isArray(showcaseItems) ? showcaseItems : []
  const safeCapabilityMatrix = Array.isArray(capabilityMatrix) ? capabilityMatrix : []
  const safeInsights = Array.isArray(insights) ? insights : []
  const safeFaqs = Array.isArray(faqs) ? faqs : []
  const safeQuickActions = Array.isArray(quickActions) ? quickActions : []
  const safeProductSystems = Array.isArray(productSystems) ? productSystems : []
  const safeSceneCases = Array.isArray(sceneCases) ? sceneCases : []
  const safeReferenceSites = Array.isArray(referenceSites) ? referenceSites : []
  const safeLayoutModules = Array.isArray(layoutModules) ? layoutModules : []
  const displayServices = services.length > 0 ? services : safeMockServices
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
        setServices(normalizeServiceRows(data))
      } catch (err) {
        setError('获取服务数据失败，请稍后重试。')
        console.error('获取服务数据失败:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [category])

  const heroMediaList: HeroMediaItem[] = heroMedia
    ? Array.isArray(heroMedia)
      ? heroMedia
      : [heroMedia]
    : []

  const backdropSources = Array.isArray(heroBackdropVideos?.sources)
    ? heroBackdropVideos.sources.filter(Boolean)
    : []
  const useBackdrop = backdropSources.length > 0
  const dwellMs = heroBackdropVideos?.dwellMs ?? 14000
  const crossfadeMs = heroBackdropVideos?.crossfadeMs ?? 900
  const [backdropIndex, setBackdropIndex] = useState(0)
  const backdropVideoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const syncBackdropPlayback = useCallback(() => {
    backdropSources.forEach((_, i) => {
      const el = backdropVideoRefs.current[i]
      if (!el) return
      if (i === backdropIndex) {
        el.muted = true
        el.playsInline = true
        el.loop = true
        void el.play().catch(() => {})
      } else {
        el.pause()
      }
    })
  }, [backdropIndex, backdropSources])

  useEffect(() => {
    if (!useBackdrop || backdropSources.length < 2) return
    const t = window.setInterval(() => {
      setBackdropIndex((i) => (i + 1) % backdropSources.length)
    }, dwellMs)
    return () => window.clearInterval(t)
  }, [useBackdrop, backdropSources.length, dwellMs])

  useEffect(() => {
    if (!useBackdrop) return
    syncBackdropPlayback()
  }, [useBackdrop, syncBackdropPlayback])

  const heroMediaForCard: HeroMediaItem[] = useBackdrop
    ? heroMediaList.filter((m) => !isHeroVideo(m))
    : heroMediaList

  const imageStyle = (imagePosition?: string): CSSProperties | undefined =>
    imagePosition ? { objectPosition: imagePosition } : undefined

  return (
    <div className={`page-wrap site-style-${siteStyle ?? 'beauty'}`}>
      {!skipDefaultHero && (
        <section
          className={`industry-hero${useBackdrop ? ' industry-hero--backdrop-video' : ''}`}
          style={
            useBackdrop
              ? ({ ['--hero-backdrop-fade' as string]: `${crossfadeMs}ms` } as CSSProperties)
              : undefined
          }
        >
          {useBackdrop && (
            <>
              <div className="industry-hero-backdrop" aria-hidden="true">
                {backdropSources.map((src, i) => (
                  <video
                    key={`${src}-${i}`}
                    ref={(el) => {
                      backdropVideoRefs.current[i] = el
                    }}
                    className={i === backdropIndex ? 'is-active' : ''}
                    src={publicAsset(src)}
                    muted
                    playsInline
                    loop
                    preload="auto"
                    tabIndex={-1}
                  />
                ))}
              </div>
              <div className="industry-hero-backdrop-scrim" aria-hidden="true" />
            </>
          )}
          <div className="industry-hero-body">
            <div>
              <span className="section-tag">{category}</span>
              <h2>{title}</h2>
              <p>{subtitle}</p>
              <div className="industry-hero-actions">
                <Link to="/info/booking-service" className="button button-primary">立即预约</Link>
                <Link to="/dashboard" className="button button-light">查看经营数据</Link>
              </div>
            </div>
            <div className={`hero-side-card${useBackdrop ? ' hero-side-card--on-video' : ''}`}>
              <h4>热门场景</h4>
              <ul>
                {safeScenarios.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {useBackdrop && backdropSources.length > 1 && (
                <div className="hero-backdrop-indicators" role="group" aria-label="背景样片轮播">
                  {backdropSources.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`hero-backdrop-dot${i === backdropIndex ? ' is-active' : ''}`}
                      aria-label={`背景样片 ${i + 1}`}
                      aria-current={i === backdropIndex ? 'true' : undefined}
                      onClick={() => setBackdropIndex(i)}
                    />
                  ))}
                </div>
              )}
              {useBackdrop && backdropSources.length === 1 && (
                <p className="hero-backdrop-caption">背景为单段样片视频，全区域循环播放。</p>
              )}
              {heroMediaForCard.length > 0 ? (
                <div
                  className={`hero-visual-stack${
                    heroMediaForCard.some(isHeroVideo) ? ' hero-visual-stack--video' : ''
                  }`}
                >
                  {heroMediaForCard.map((item, idx) => (
                    <div
                      key={`${item.src}-${idx}`}
                      className={`hero-visual-photo${isHeroVideo(item) ? ' hero-visual-photo--video' : ''}`}
                    >
                      {isHeroVideo(item) ? (
                        <video
                          src={publicAsset(item.src)}
                          controls
                          playsInline
                          muted
                          loop
                          autoPlay
                          preload="metadata"
                          aria-label={item.alt}
                        />
                      ) : (
                        <PublicImg src={item.src} alt={item.alt} loading="lazy" style={imageStyle(item.imagePosition)} />
                      )}
                    </div>
                  ))}
                </div>
              ) : !useBackdrop ? (
                <div className="hero-visual-placeholder">
                  <span>主视觉占位图</span>
                  <p>后续替换为业务实拍图 / 品牌KV / 项目效果图</p>
                </div>
              ) : (
                <p className="hero-backdrop-hint">样片在整区背景轮播；下方「样片与场景」可放静帧组图。</p>
              )}
            </div>
          </div>
        </section>
      )}

      {venueGallery && venueGallery.length > 0 && (
        <section className="section restaurant-venue-strip">
          <div className="section-title-row">
            <h3>{venueSectionTitle ?? '门店与就餐环境'}</h3>
            <span>{venueSectionSubtitle ?? '真实场景示意，增强信任感与代入感'}</span>
          </div>
          <div className="venue-gallery">
            {(Array.isArray(venueGallery) ? venueGallery : []).map((v, vi) => (
              <figure className="venue-gallery-item" key={`venue-${vi}-${v.caption}`}>
                <PublicImg src={v.src} alt={v.caption} loading="lazy" style={imageStyle(v.imagePosition)} />
                <figcaption>{v.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

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
          {(Array.isArray(styleSections) && styleSections.length > 0
            ? styleSections
            : ['主视觉', '分类导航', '核心推荐', '转化入口']).map((item) => (
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
          {safeHighlights.map((item) => (
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
          {safeMockServices.slice(0, 3).map((service) => (
            <article key={service.name} className={`showcase-card${service.image ? ' showcase-card-with-image' : ''}`}>
              {service.image && (
                <div className="showcase-card-thumb">
                  <PublicImg src={service.image} alt="" loading="lazy" style={imageStyle(service.imagePosition)} />
                </div>
              )}
              <span className="showcase-tag">推荐</span>
              <h4>{service.name}</h4>
              <p>{service.description}</p>
              <span className="case-data">参考价：¥{formatYuan(service.price)}</span>
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

      {safeQuickActions.length > 0 && (
        <section className="section">
            <div className="section-title-row">
              <h3>快捷服务</h3>
              <span>参考头部全屋定制站点服务入口</span>
            </div>
            <div className="quick-action-row">
              {safeQuickActions.map((action) => (
                <button key={action} className="button quick-action-button">{action}</button>
              ))}
            </div>
        </section>
      )}

      {safeProductSystems.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>产品体系</h3>
            <span>全屋成品 + 全屋定制 + 细分系统</span>
          </div>
          <div className="cards-grid cards-grid-3">
            {safeProductSystems.map((group) => (
              <article className="feature-card" key={group.title}>
                <h4>{group.title}</h4>
                <ul className="plain-list">
                  {(Array.isArray(group.items) ? group.items : []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}

      {safeSceneCases.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>场景案例</h3>
            <span>住宅 / 公寓 / 商业空间多场景落地</span>
          </div>
          <div className="cards-grid cards-grid-2">
            {safeSceneCases.map((item) => (
              <article className="showcase-card" key={item.scene}>
                <h4>{item.scene}</h4>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {safeReferenceSites.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>参考站点</h3>
            <span>按指定网站梳理页面结构</span>
          </div>
          <div className="reference-links">
            {safeReferenceSites.map((site) => (
              <a key={site.url} href={site.url} target="_blank" rel="noreferrer">
                {site.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {safeLayoutModules.length > 0 && (
        <section className="section">
          <div className="section-title-row">
            <h3>布局模块（虚拟示例）</h3>
            <span>后续可替换为真实图片与文案</span>
          </div>
          <div className="cards-grid cards-grid-3">
            {safeLayoutModules.map((item) => (
              <article className={`feature-card${item.image ? ' feature-card-with-image' : ''}`} key={item.title}>
                {item.image && (
                  <div className="feature-card-thumb">
                    <PublicImg src={item.image} alt="" loading="lazy" style={imageStyle(item.imagePosition)} />
                  </div>
                )}
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
          {safeMarketStats.map((stat) => (
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
          {safeHighlights.map((item) => (
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
          {safeWorkflow.map((item, index) => (
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
          {safeShowcaseItems.map((item) => (
            <article className={`showcase-card${item.image ? ' showcase-card-with-image' : ''}`} key={item.title}>
              {item.image && (
                <div className="showcase-card-thumb">
                  <PublicImg src={item.image} alt="" loading="lazy" style={imageStyle(item.imagePosition)} />
                </div>
              )}
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
          {safeSampleCases.map((item) => (
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
          {safeCapabilityMatrix.map((item) => (
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
            {displayServices.map((service, index) => (
                <article key={`${service.name}-${index}`} className="service-card">
                  <div className="service-card-head">
                    <h4>{service.name}</h4>
                    <strong>¥{formatYuan(service.price)}</strong>
                  </div>
                  <p>{service.description}</p>
                  <Link to="/info/online-consulting" className="button button-primary">咨询方案</Link>
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
          {safeInsights.map((item) => (
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
          {safeFaqs.map((item, index) => (
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

      <section className="section industry-sibling-nav-section">
        <div className="section-title-row">
          <h3>全站业务导航</h3>
          <span>顺序与顶部导航一致 · 当前：{category}</span>
        </div>
        <nav className="industry-sibling-nav" aria-label="全站业务模块">
          {BUSINESS_MODULES.map((m) =>
            m.category === category ? (
              <span key={m.path} className="industry-sibling-nav-current">
                {m.navLabel}
              </span>
            ) : (
              <Link key={m.path} to={m.path}>
                {m.navLabel}
              </Link>
            )
          )}
        </nav>
      </section>

    </div>
  )
}

export default IndustryPage
