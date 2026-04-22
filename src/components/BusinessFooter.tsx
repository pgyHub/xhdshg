import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BUSINESS_MODULES } from '../data/businessNav'
import { PublicImg } from './PublicImg'

const businessPaths: Record<string, string> = {}
BUSINESS_MODULES.forEach((m) => {
  businessPaths[m.footerCoreLabel] = m.path
})

const linkPathMap: Record<string, string> = {
  ...businessPaths,
  门店获客增长: '/info/store-growth',
  会员复购运营: '/info/member-retention',
  跨业务联动套餐: '/info/cross-business-package',
  节日营销活动: '/info/holiday-campaign',
  私域转化路径: '/info/private-domain-conversion',
  品牌内容矩阵: '/info/brand-content-matrix',
  数据报表服务: '/info/data-report-service',
  AI智能推荐: '/info/ai-recommendation',
  预约排班系统: '/info/scheduling-system',
  客服与售后: '/info/customer-service',
  投放效果分析: '/info/ad-performance',
  经营策略复盘: '/info/strategy-review',
  品牌介绍: '/info/brand-intro',
  合作流程: '/info/cooperation-process',
  城市合伙人: '/info/city-partner',
  加入我们: '/info/join-us',
  联系我们: '/info/contact-us',
  用户协议: '/info/agreement',
  预约到店: '/info/booking-service',
  在线咨询: '/info/online-consulting',
  商家入驻: '/info/merchant-settlement',
  供应链合作: '/info/supply-chain',
  培训课程: '/info/training-course',
  运营工具: '/info/operation-tools'
}

/** 五列等宽：业务 → 方案 → 支持 → 关于 → 更多服务 */
const footerColumns = [
  {
    title: '核心业务',
    links: BUSINESS_MODULES.map((m) => m.footerCoreLabel)
  },
  {
    title: '解决方案',
    links: ['门店获客增长', '会员复购运营', '跨业务联动套餐', '节日营销活动', '私域转化路径', '品牌内容矩阵']
  },
  {
    title: '运营支持',
    links: ['数据报表服务', 'AI智能推荐', '预约排班系统', '客服与售后', '投放效果分析', '经营策略复盘']
  },
  {
    title: '关于小红点',
    links: ['品牌介绍', '合作流程', '城市合伙人', '加入我们', '联系我们', '用户协议']
  },
  {
    title: '更多服务',
    links: ['预约到店', '在线咨询', '商家入驻', '供应链合作', '培训课程', '运营工具']
  }
]

const BusinessFooter = () => {
  const [qrOpen, setQrOpen] = useState(false)
  const qrWrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!qrWrapRef.current) return
      if (!qrWrapRef.current.contains(e.target as Node)) {
        setQrOpen(false)
      }
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQrOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  return (
    <footer className="business-footer">
      <div className="business-footer-top">
        <div className="business-footer-columns">
          {footerColumns.map((group) => (
            <section key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.links.map((item) => (
                  <li key={item}>
                    <Link to={linkPathMap[item] ?? '/'}>{item}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <div className="business-footer-follow">
        <h4>关注小红点生活馆</h4>
        <p>获取业务活动、运营资讯与服务升级通知</p>
        <div className="business-footer-follow-inner">
          <div className="business-footer-socials">
            <div ref={qrWrapRef} className={`business-footer-social-wrap${qrOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="business-footer-social"
                aria-label="公众号"
                onClick={() => setQrOpen((v) => !v)}
              >
                <PublicImg src="/images/contact/icon-wechat.png" alt="公众号图标" loading="lazy" />
              </button>
              <div className="business-footer-qr-pop">
                <PublicImg src="/images/contact/wechat-official-qr.png" alt="小红点生活馆公众号二维码" loading="lazy" />
                <span>公众号</span>
              </div>
            </div>
            <button type="button" className="business-footer-social" aria-label="QQ">
              <PublicImg src="/images/contact/icon-qq.png" alt="QQ图标" loading="lazy" />
            </button>
            <button type="button" className="business-footer-social" aria-label="抖音">
              <PublicImg src="/images/contact/icon-douyin.png" alt="抖音图标" loading="lazy" />
            </button>
          </div>
          <span>咨询热线：400-801-3260</span>
        </div>
      </div>

      <div className="business-footer-bottom">
        <p>Copyright © 2026 小红点生活馆 All Rights Reserved.</p>
        <p>浙ICP备2026000001号 · 增值电信业务经营许可证：浙B2-20260001</p>
      </div>
    </footer>
  )
}

export default BusinessFooter
