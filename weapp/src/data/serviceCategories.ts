/** 首页「本地生活服务」分类：详情页路由 `/pages/ServiceCategory/index?id=xxx` */

export type ServiceCategoryId =
  | 'hair'
  | 'makeup'
  | 'wedding'
  | 'clothing'
  | 'wholehome'
  | 'restaurant'
  | 'video'

export type ServiceCategory = {
  id: ServiceCategoryId
  /** 首页列表左侧色条 */
  accentColor: string
  title: string
  shortDesc: string
  subtitle: string
  heroGradient: string
  heroLetter: string
  /** 示意图（外网图；正式上架请在微信公众平台配置 request 合法域名或改为本域静态资源） */
  coverUrl: string
  galleryUrls: [string, string, string]
  intro: string[]
  highlights: string[]
  process: string[]
  priceNote: string
  contactNote: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'hair',
    accentColor: '#8b6914',
    title: '美发',
    shortDesc: '剪烫染护 · 形象设计',
    subtitle: '专业发型师一对一沟通，根据脸型与气质定制方案',
    heroGradient: 'linear-gradient(135deg, #5c4033 0%, #8b6914 45%, #c9a227 100%)',
    heroLetter: '美',
    coverUrl: 'https://picsum.photos/seed/xhd-hair-cover/720/400',
    galleryUrls: [
      'https://picsum.photos/seed/xhd-hair-a/400/240',
      'https://picsum.photos/seed/xhd-hair-b/400/240',
      'https://picsum.photos/seed/xhd-hair-c/400/240',
    ],
    intro: [
      '小红点合作美发沙龙提供剪发、烫发、染发、护理及头皮养护等全流程服务。到店前可通过小程序预约时段，减少排队。',
      '我们推荐使用无氨染发与低温烫护产品，降低对发质的损伤；烫染后附赠居家护理小贴士。',
    ],
    highlights: ['资深发型师驻店', '烫染分区独立操作台', '一次性毛巾与消毒工具', '会员储值享折扣'],
    process: ['线上预约或电话留位', '到店沟通脸型与风格', '洗发护理后开始造型', '完成后拍照存档便于复购'],
    priceNote: '剪发参考 ¥68 起；烫染套餐 ¥398–¥1280 视长度与药水品牌而定（到店详询）。',
    contactNote: '预约请致电门店或联系您的专属顾问；节假日建议提前 2–3 天预约。',
  },
  {
    id: 'makeup',
    accentColor: '#c71585',
    title: '彩妆',
    shortDesc: '日常妆 · 新娘妆 · 舞台妆',
    subtitle: '婚礼、年会、证件照与日常通勤妆造一站式',
    heroGradient: 'linear-gradient(135deg, #8b2252 0%, #c71585 50%, #ffb6c1 100%)',
    heroLetter: '彩',
    coverUrl: 'https://picsum.photos/seed/xhd-makeup-cover/720/400',
    galleryUrls: [
      'https://picsum.photos/seed/xhd-makeup-a/400/240',
      'https://picsum.photos/seed/xhd-makeup-b/400/240',
      'https://picsum.photos/seed/xhd-makeup-c/400/240',
    ],
    intro: [
      '彩妆团队持有品牌认证培训经历，使用一线专柜与专业线产品，支持敏感肌试敏。',
      '新娘妆含早妆与跟妆两种套餐；可上门或到店，需提前试妆一次以确认色系与持久度。',
    ],
    highlights: ['一线品牌彩妆', '独立化妆间与补妆包', '跟妆师全程陪同', '免费修眉与眉形设计'],
    process: ['提交场合与服装色卡', '预约试妆（建议婚期前 1 个月）', '正日按约定时间到场', '结束后卸妆护理建议'],
    priceNote: '日常妆 ¥188 起；新娘早妆 ¥688 起；全天跟妆 ¥1888 起（含补妆与假睫毛）。',
    contactNote: '旺季周末档期紧张，下单后顾问会在 24 小时内与您确认时间表。',
  },
  {
    id: 'wedding',
    accentColor: '#8b4513',
    title: '婚纱摄影',
    shortDesc: '内景 · 外景 · 旅拍',
    subtitle: '双机位拍摄、精修入册与微电影可加购',
    heroGradient: 'linear-gradient(135deg, #4a3728 0%, #8b4513 40%, #daa520 100%)',
    heroLetter: '婚',
    coverUrl: 'https://picsum.photos/seed/xhd-wedding-cover/720/400',
    galleryUrls: [
      'https://picsum.photos/seed/xhd-wedding-a/400/240',
      'https://picsum.photos/seed/xhd-wedding-b/400/240',
      'https://picsum.photos/seed/xhd-wedding-c/400/240',
    ],
    intro: [
      '提供韩式简约、复古胶片、城市街拍与旅拍等多种风格样片参考；拍摄前沟通脚本与道具清单。',
      '底片全送可选套餐；精修张数与相册材质（皮质/布艺）可在合同内锁定，避免二次消费争议。',
    ],
    highlights: ['摄影师分级可选', '外景车与午餐可包', '选片现场大屏预览', '相册终身防潮封装建议'],
    process: ['看样片与套餐签约', '试纱与拍摄日排期', '选片与精修确认', '取件与售后补拍政策说明'],
    priceNote: '基础套系 ¥3999 起（内景 2 造 + 30 张精修）；旅拍按目的地与天数单独报价。',
    contactNote: '黄金档期（五一、十一）建议提前 6 个月锁定团队。',
  },
  {
    id: 'clothing',
    accentColor: '#34495e',
    title: '服装定制',
    shortDesc: '西装 · 礼服 · 团体工装',
    subtitle: '量体、选料、半成品试身到成衣交付全流程可追溯',
    heroGradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #95a5a6 100%)',
    heroLetter: '裁',
    coverUrl: 'https://picsum.photos/seed/xhd-cloth-cover/720/400',
    galleryUrls: [
      'https://picsum.photos/seed/xhd-cloth-a/400/240',
      'https://picsum.photos/seed/xhd-cloth-b/400/240',
      'https://picsum.photos/seed/xhd-cloth-c/400/240',
    ],
    intro: [
      '支持进口羊毛、亚麻、真丝等面料册选样；西装提供半麻衬/全麻衬工艺说明。',
      '团体工装可加绣 logo 与姓名条，批量订单提供上门量体与分批交付。',
    ],
    highlights: ['一人一版', '半成品试身一次起', '终身免费修改尺寸（体重波动 ±5kg 内）', '加急 15 天交付可选'],
    process: ['预约量体与风格沟通', '选料付定金开版', '半成品试身调整', '成衣交付与保养说明'],
    priceNote: '两件套西装定制 ¥2980 起；礼服按面料与工艺 ¥1580 起。',
    contactNote: '企业客户可提供样衣对标色与面料克重要求。',
  },
  {
    id: 'wholehome',
    accentColor: '#5d7a62',
    title: '全屋定制',
    shortDesc: '橱柜 · 衣柜 · 木门墙板',
    subtitle: '环保等级 E0 / ENF 可选，三维效果图与清单报价',
    heroGradient: 'linear-gradient(135deg, #3d5a45 0%, #5d7a62 50%, #a8c090 100%)',
    heroLetter: '居',
    coverUrl: 'https://picsum.photos/seed/xhd-home-cover/720/400',
    galleryUrls: [
      'https://picsum.photos/seed/xhd-home-a/400/240',
      'https://picsum.photos/seed/xhd-home-b/400/240',
      'https://picsum.photos/seed/xhd-home-c/400/240',
    ],
    intro: [
      '从量房、出图、拆单到安装验收全流程项目群同步进度；板材品牌与五金件写入合同附件。',
      '支持旧房局部改造与精装房微改，柜体与墙面收口节点有标准施工图。',
    ],
    highlights: ['免费量房与首版效果图', '安装工持证上岗', '隐蔽工程拍照存档', '质保期书面约定'],
    process: ['预约上门量房', '方案确认与签约生产', '工厂加工与物流预约', '安装自检与用户验收'],
    priceNote: '投影面积计价为主流，参考 ¥899–¥1599 /㎡（含基础五金），见方案清单。',
    contactNote: '交房前可先做平面设计，硬装结束复尺后下单生产，缩短入住等待。',
  },
  {
    id: 'restaurant',
    accentColor: '#c41e3a',
    title: '中餐馆',
    shortDesc: '堂食 · 包间 · 宴席',
    subtitle: '本帮与川粤融合，支持生日宴与商务宴请定制菜单',
    heroGradient: 'linear-gradient(135deg, #8b0000 0%, #c41e3a 50%, #ff6b6b 100%)',
    heroLetter: '膳',
    coverUrl: 'https://picsum.photos/seed/xhd-food-cover/720/400',
    galleryUrls: [
      'https://picsum.photos/seed/xhd-food-a/400/240',
      'https://picsum.photos/seed/xhd-food-b/400/240',
      'https://picsum.photos/seed/xhd-food-c/400/240',
    ],
    intro: [
      '食材当日配送可追溯；招牌菜含低温慢煮与明火快炒两类，兼顾口感与出餐效率。',
      '包间最低消费与宴会菜单可按人均预算定制，提前 48 小时确认忌口与儿童餐。',
    ],
    highlights: ['明厨亮灶', '无接触扫码点餐', '免费停车券合作商场', '会员积分兑换菜品'],
    process: ['电话或小程序订位', '到店点菜或套膳', '结账开票与积分', '评价反馈改进菜单'],
    priceNote: '人均参考 ¥88–¥268；十人宴席 ¥2888 起（含冷盘热菜汤品点心）。',
    contactNote: '年夜饭菜单每年 11 月发布，支持定金锁桌。',
  },
  {
    id: 'video',
    accentColor: '#0f3460',
    title: '短视频制作',
    shortDesc: '探店 · 口播 · 活动花絮',
    subtitle: '脚本、拍摄、剪辑、字幕与封面一条龙，可按条或包月合作',
    heroGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    heroLetter: '映',
    coverUrl: 'https://picsum.photos/seed/xhd-video-cover/720/400',
    galleryUrls: [
      'https://picsum.photos/seed/xhd-video-a/400/240',
      'https://picsum.photos/seed/xhd-video-b/400/240',
      'https://picsum.photos/seed/xhd-video-c/400/240',
    ],
    intro: [
      '提供 15s / 30s / 60s 多版本适配抖音与视频号；含版权音乐库授权说明，避免侵权下架。',
      '口播类含提词器现场助理；活动类含双机位与稳定器，RAW 素材可按合同保留期限交付。',
    ],
    highlights: ['脚本两稿内修改', '48h 出粗剪', '封面三张备选', '投放数据复盘会议（包月含）'],
    process: ['需求Brief与对标账号', '排期拍摄与场控', '粗剪确认后精剪调色', '交付成片与封面源文件'],
    priceNote: '单条探店短视频 ¥800 起；包月 10 条起签，含策划与复盘。',
    contactNote: '涉及品牌出镜需额外确认肖像权与商标使用范围。',
  },
]

export function getServiceCategory(id: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((c) => c.id === id)
}

export function serviceCategoryPath(id: ServiceCategoryId): string {
  return `/pages/ServiceCategory/index?id=${id}`
}
