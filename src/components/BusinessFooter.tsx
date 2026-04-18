import { Link } from 'react-router-dom'

const linkPathMap: Record<string, string> = {
  婚纱摄影: '/wedding-photography',
  彩妆服务: '/makeup',
  彩妆跟妆: '/makeup',
  美发造型: '/hairdressing',
  全屋定制: '/home-customization',
  短视频制作: '/short-video-production',
  短视频代运营: '/short-video-production',
  中餐馆运营: '/chinese-restaurant',
  中餐馆私宴: '/chinese-restaurant',
  服装定制: '/clothing-customization',
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
  '婚摄+彩妆套餐': '/makeup',
  短视频引流方案: '/short-video-production',
  会员增长计划: '/info/member-growth-plan',
  门店活动策划: '/info/store-event-planning',
  品牌IP打造: '/info/brand-ip-building',
  私域转化方案: '/info/private-domain-solution',
  预约到店: '/info/booking-service',
  在线咨询: '/info/online-consulting',
  商家入驻: '/info/merchant-settlement',
  供应链合作: '/info/supply-chain',
  培训课程: '/info/training-course',
  运营工具: '/info/operation-tools'
}

const footerColumns = [
  {
    title: '核心业务',
    links: ['婚纱摄影', '彩妆服务', '美发造型', '全屋定制', '短视频制作', '中餐馆运营', '服装定制']
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
  }
]

const hotRows = [
  { label: '热门业务', items: ['婚纱摄影', '彩妆跟妆', '全屋定制', '短视频代运营', '中餐馆私宴', '服装定制'] },
  { label: '热门推荐', items: ['婚摄+彩妆套餐', '短视频引流方案', '会员增长计划', '门店活动策划', '品牌IP打造', '私域转化方案'] },
  { label: '更多服务', items: ['预约到店', '在线咨询', '商家入驻', '供应链合作', '培训课程', '运营工具'] }
]

const BusinessFooter = () => {
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
        <section className="business-footer-contact">
          <h4>关注小红点生活馆</h4>
          <p>获取业务活动、运营资讯与服务升级通知</p>
          <div className="business-footer-qrs">
            <div>公众号</div>
            <div>服务号</div>
          </div>
          <span>咨询热线：400-801-3260</span>
        </section>
      </div>

      <div className="business-footer-hot">
        {hotRows.map((row) => (
          <div key={row.label} className="business-footer-hot-row">
            <strong>{row.label}</strong>
            <div>
              {row.items.map((item) => (
                <Link key={item} to={linkPathMap[item] ?? '/'}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="business-footer-bottom">
        <p>Copyright © 2026 小红点生活馆 All Rights Reserved.</p>
        <p>浙ICP备2026000001号 · 增值电信业务经营许可证：浙B2-20260001</p>
      </div>
    </footer>
  )
}

export default BusinessFooter
