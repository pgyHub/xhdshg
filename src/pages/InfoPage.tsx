import { Link, useParams } from 'react-router-dom'

type InfoBlock = {
  title: string
  intro: string
  sections: Array<{ heading: string; content: string }>
}

const infoMap: Record<string, InfoBlock> = {
  'brand-intro': {
    title: '品牌介绍',
    intro: '小红点生活馆围绕“生活服务 + 数智经营”打造多业态协同平台，串联美发、彩妆、婚摄等形象服务，延伸至服装与全屋定制，并覆盖餐饮与短视频等场景。',
    sections: [
      { heading: '品牌定位', content: '以本地生活服务为基础，结合AI数据分析能力，帮助门店实现流量获取、会员运营与服务升级。' },
      { heading: '服务优势', content: '统一中台、统一数据、统一策略，支持跨业务协同营销与经营复盘。' },
      { heading: '适用对象', content: '适用于连锁门店、单店经营者、品牌运营团队和区域代理伙伴。' }
    ]
  },
  'cooperation-process': {
    title: '合作流程',
    intro: '从需求沟通到上线运营，提供标准化合作步骤，确保项目推进高效透明。',
    sections: [
      { heading: '第一步：需求诊断', content: '顾问团队评估经营目标、业务结构与现有系统情况。' },
      { heading: '第二步：方案共创', content: '输出模块组合建议、视觉方案和阶段目标，确认实施计划。' },
      { heading: '第三步：上线运营', content: '完成页面部署、数据联调与人员培训，进入持续运营优化阶段。' }
    ]
  },
  'city-partner': {
    title: '城市合伙人',
    intro: '诚邀本地服务机构与运营团队成为城市合伙人，共建区域生活服务生态。',
    sections: [
      { heading: '合作权益', content: '提供产品授权、培训体系、市场物料和项目协同支持。' },
      { heading: '合作要求', content: '具备本地客户服务能力、基础运营团队和长期发展规划。' },
      { heading: '申请方式', content: '通过页面联系方式提交申请，顾问将在1-3个工作日内回访。' }
    ]
  },
  'join-us': {
    title: '加入我们',
    intro: '我们持续招聘产品、运营、设计与数据方向人才，欢迎有创造力的你加入。',
    sections: [
      { heading: '热招岗位', content: '产品经理、运营顾问、前端开发、数据分析师、视觉设计师。' },
      { heading: '工作方式', content: '支持跨团队协作与业务轮岗，鼓励创新实践和快速迭代。' },
      { heading: '投递说明', content: '请附简历与代表项目，发送至 hr@xiaohongdian.example。' }
    ]
  },
  'contact-us': {
    title: '联系我们',
    intro: '欢迎咨询产品方案、业务合作与平台接入，我们将为你提供专属顾问支持。',
    sections: [
      { heading: '服务热线', content: '400-801-3260（工作日 09:00-18:00）' },
      { heading: '商务合作', content: 'bd@xiaohongdian.example' },
      { heading: '公司地址', content: '杭州市滨江区数智产业园A座 8F' }
    ]
  },
  agreement: {
    title: '用户协议',
    intro: '请在使用平台服务前阅读本协议。继续使用即视为你已理解并同意协议条款。',
    sections: [
      { heading: '服务说明', content: '平台提供业务展示、经营分析与运营支持能力，具体功能以实际上线模块为准。' },
      { heading: '账号规范', content: '用户应妥善保管账号信息，不得以任何方式损害平台或第三方合法权益。' },
      { heading: '隐私与安全', content: '平台将依照相关法律法规保护用户数据安全，并持续提升系统安全能力。' }
    ]
  },
  'booking-service': {
    title: '预约到店',
    intro: '在线提交预约信息后，门店顾问会在最短时间内与你确认到店安排。',
    sections: [
      { heading: '预约范围', content: '支持美发、彩妆、婚纱摄影、服装定制、全屋定制、中餐馆与短视频制作。' },
      { heading: '预约流程', content: '提交意向 -> 顾问回访 -> 确认时间 -> 到店体验。' },
      { heading: '温馨提示', content: '节假日高峰建议至少提前1-3天预约，以便安排专属服务档期。' }
    ]
  },
  'online-consulting': {
    title: '在线咨询',
    intro: '通过在线咨询可快速获取套餐说明、活动信息与行业方案建议。',
    sections: [
      { heading: '咨询内容', content: '服务报价、活动政策、合作模式、系统功能与接入流程。' },
      { heading: '响应时效', content: '工作时段平均5分钟响应，复杂问题24小时内给出处理方案。' },
      { heading: '咨询入口', content: '可通过热线、公众号服务号及站内咨询通道提交问题。' }
    ]
  },
  'merchant-settlement': {
    title: '商家入驻',
    intro: '入驻后可获得品牌展示、流量分发、经营分析与运营工具支持。',
    sections: [
      { heading: '入驻条件', content: '具备合法经营资质、稳定服务能力与清晰品类定位。' },
      { heading: '审核流程', content: '资料提交 -> 资质审核 -> 运营对接 -> 页面开通。' },
      { heading: '运营支持', content: '平台提供数据看板、活动模板与专项增长顾问服务。' }
    ]
  },
  'supply-chain': {
    title: '供应链合作',
    intro: '与优质供应链伙伴共建稳定、高效、可追踪的服务交付体系。',
    sections: [
      { heading: '合作方向', content: '美发个护、彩妆婚摄物料、服装与家居定制、餐饮食材与短视频设备等。' },
      { heading: '合作机制', content: '采用标准采购流程与质量评估体系，支持区域化协同履约。' },
      { heading: '对接方式', content: '请将企业资料发送至 supply@xiaohongdian.example。' }
    ]
  },
  'training-course': {
    title: '培训课程',
    intro: '提供业务运营、服务标准、数据分析与营销方法等多类培训课程。',
    sections: [
      { heading: '课程体系', content: '新店启动、增长运营、会员复购、内容种草与管理能力提升。' },
      { heading: '授课形式', content: '支持线上直播、录播学习与线下实训营组合交付。' },
      { heading: '适用人群', content: '门店店长、运营人员、顾问团队及城市合作伙伴。' }
    ]
  },
  'store-growth': {
    title: '门店获客增长',
    intro: '围绕“线上引流 + 到店转化 + 二次触达”搭建门店增长闭环。',
    sections: [
      { heading: '流量入口', content: '短视频内容、同城投放、社媒矩阵和活动专题页联动引流。' },
      { heading: '转化机制', content: '到店预约、顾问跟进、套餐推荐和权益激励提升转化率。' },
      { heading: '结果评估', content: '按周复盘线索量、到店率、成交率和客单结构。' }
    ]
  },
  'member-retention': {
    title: '会员复购运营',
    intro: '建立分层会员体系，提升复购频次与生命周期价值。',
    sections: [
      { heading: '会员分层', content: '按消费频次、客单区间和偏好标签划分运营策略。' },
      { heading: '触达策略', content: '短信、企微、公众号与站内消息协同触达。' },
      { heading: '复购活动', content: '积分商城、专属券包、节日关怀和连带推荐。' }
    ]
  },
  'cross-business-package': {
    title: '跨业务联动套餐',
    intro: '打通多业务模块，形成“高频带低频”的组合增长方案。',
    sections: [
      { heading: '套餐设计', content: '美发+彩妆+婚摄、服装+家居、餐饮+短视频等联动方案。' },
      { heading: '价格策略', content: '以组合折扣和权益升级提升连带购买意愿。' },
      { heading: '执行方式', content: '统一活动页、统一客服话术和统一数据追踪。' }
    ]
  },
  'holiday-campaign': {
    title: '节日营销活动',
    intro: '围绕关键节日制定主题活动，集中放大品牌声量与订单量。',
    sections: [
      { heading: '节点规划', content: '提前排期预热、爆发、返场三阶段执行。' },
      { heading: '活动玩法', content: '限时秒杀、拼团、礼包券和预约抽奖组合。' },
      { heading: '效果看板', content: '实时监控曝光、点击、咨询、下单和复购。' }
    ]
  },
  'private-domain-conversion': {
    title: '私域转化路径',
    intro: '从公域获客到私域沉淀，构建长期可复用的客户资产。',
    sections: [
      { heading: '沉淀链路', content: '内容触达 -> 入群/加微 -> 标签沉淀 -> 个性化跟进。' },
      { heading: '转化脚本', content: '标准化SOP提高顾问转化效率和服务一致性。' },
      { heading: '运营节奏', content: '日常种草、周活动、月复盘，形成稳定增长节奏。' }
    ]
  },
  'brand-content-matrix': {
    title: '品牌内容矩阵',
    intro: '建立多平台内容矩阵，持续输出品牌认知与业务价值。',
    sections: [
      { heading: '内容方向', content: '案例展示、专业知识、用户故事和活动资讯。' },
      { heading: '分发渠道', content: '短视频平台、公众号、小程序与官网专题页联动。' },
      { heading: '内容复用', content: '素材模板化，提高生产效率并保持品牌统一。' }
    ]
  },
  'data-report-service': {
    title: '数据报表服务',
    intro: '提供统一经营报表，帮助门店与总部快速掌握关键经营状态。',
    sections: [
      { heading: '报表维度', content: '流量、成交、客单、复购、渠道贡献和人效分析。' },
      { heading: '查看方式', content: '支持日报、周报、月报与自定义看板。' },
      { heading: '应用场景', content: '经营会议、活动复盘、门店诊断和目标管理。' }
    ]
  },
  'ai-recommendation': {
    title: 'AI智能推荐',
    intro: '基于用户行为与经营数据，智能推荐商品、服务与营销动作。',
    sections: [
      { heading: '推荐内容', content: '套餐推荐、加购建议、用户触达时机与活动方案。' },
      { heading: '算法能力', content: '支持规则+模型双引擎，兼顾可控性与精准度。' },
      { heading: '业务价值', content: '提升转化率、客单价与会员活跃度。' }
    ]
  },
  'scheduling-system': {
    title: '预约排班系统',
    intro: '统一管理顾问与服务档期，减少冲突并提升资源利用率。',
    sections: [
      { heading: '排班规则', content: '按人员技能、门店时段和服务类型自动排班。' },
      { heading: '预约协同', content: '支持线上预约、到店改约与实时提醒。' },
      { heading: '管理收益', content: '降低空档率，提高服务承接效率。' }
    ]
  },
  'customer-service': {
    title: '客服与售后',
    intro: '建立标准客服与售后流程，持续提升客户满意度与口碑。',
    sections: [
      { heading: '服务通道', content: '电话、在线咨询、社媒私信统一工单管理。' },
      { heading: '处理流程', content: '受理 -> 分派 -> 跟进 -> 回访 -> 结案闭环。' },
      { heading: '质量监控', content: '按响应时效、解决率和满意度进行考核。' }
    ]
  },
  'ad-performance': {
    title: '投放效果分析',
    intro: '对广告投放全链路数据进行归因分析，优化预算分配。',
    sections: [
      { heading: '核心指标', content: '曝光、点击、线索成本、到店率和成交ROI。' },
      { heading: '归因分析', content: '按渠道、素材、人群、时段拆解投放效果。' },
      { heading: '优化建议', content: '自动给出预算迁移和素材迭代方向。' }
    ]
  },
  'strategy-review': {
    title: '经营策略复盘',
    intro: '通过阶段复盘形成“目标-动作-结果-优化”的经营改进机制。',
    sections: [
      { heading: '复盘方法', content: '对照目标，拆解关键动作与实际结果差异。' },
      { heading: '问题定位', content: '识别渠道、内容、转化和交付环节短板。' },
      { heading: '改进计划', content: '制定下一周期优先级、资源投入与执行节奏。' }
    ]
  },
  'member-growth-plan': {
    title: '会员增长计划',
    intro: '通过拉新、激活、留存、复购四阶段策略驱动会员规模与价值增长。',
    sections: [
      { heading: '拉新机制', content: '裂变活动、老带新奖励和渠道联合获客。' },
      { heading: '激活策略', content: '新人权益包、首单礼包和首访引导。' },
      { heading: '成长体系', content: '等级权益和积分机制提升长期黏性。' }
    ]
  },
  'store-event-planning': {
    title: '门店活动策划',
    intro: '提供从主题创意到执行落地的门店活动全流程支持。',
    sections: [
      { heading: '活动设计', content: '结合门店客群与节点诉求制定活动主题。' },
      { heading: '执行清单', content: '物料、人员、脚本、推广与数据监控一体化。' },
      { heading: '复盘优化', content: '按活动结果迭代下一轮方案。' }
    ]
  },
  'brand-ip-building': {
    title: '品牌IP打造',
    intro: '通过内容人格化和视觉识别体系，打造可持续传播的品牌IP。',
    sections: [
      { heading: 'IP定位', content: '明确人设标签、价值主张与核心受众。' },
      { heading: '内容策略', content: '形成稳定栏目与主题，持续积累用户认知。' },
      { heading: '传播协同', content: '线上线下联动扩大IP影响力。' }
    ]
  },
  'private-domain-solution': {
    title: '私域转化方案',
    intro: '为不同业态提供可落地的私域运营模板和转化流程。',
    sections: [
      { heading: '建联策略', content: '通过服务触点引导沉淀用户到私域。' },
      { heading: '运营模板', content: '标准化欢迎语、内容日历和活动脚本。' },
      { heading: '转化提升', content: '结合用户标签进行差异化推荐与跟进。' }
    ]
  },
  'operation-tools': {
    title: '运营工具',
    intro: '汇集活动、报表、会员、内容与投放管理工具，提升运营效率。',
    sections: [
      { heading: '工具能力', content: '活动搭建、数据分析、客户管理和任务协同。' },
      { heading: '使用方式', content: '按角色开通权限，支持总部与门店协同使用。' },
      { heading: '落地价值', content: '减少重复工作，提升执行效率与结果可控性。' }
    ]
  }
}

const fallbackInfo: InfoBlock = {
  title: '页面建设中',
  intro: '该页面内容正在完善中，你可以先浏览业务模块或数据驾驶舱。',
  sections: [
    { heading: '推荐入口', content: '先查看首页业务入口，或进入数据驾驶舱了解整体经营数据。' }
  ]
}

const InfoPage = () => {
  const { slug } = useParams()
  const info = (slug && infoMap[slug]) || fallbackInfo

  return (
    <div className="page-wrap section info-page">
      <div className="section-tag">信息中心</div>
      <div className="section-title-row">
        <h3>{info.title}</h3>
        <span>小红点生活馆官方信息</span>
      </div>
      <p>{info.intro}</p>
      <div className="cards-grid cards-grid-3">
        {info.sections.map((item) => (
          <article key={item.heading} className="card">
            <h4>{item.heading}</h4>
            <p>{item.content}</p>
          </article>
        ))}
      </div>
      <div className="quick-action-row">
        <Link to="/" className="button button-primary">返回首页</Link>
        <Link to="/dashboard" className="button button-secondary">查看数据驾驶舱</Link>
      </div>
    </div>
  )
}

export default InfoPage
