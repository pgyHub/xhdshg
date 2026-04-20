/**
 * 全站业务模块统一顺序：人（美发→彩妆→婚摄）→ 衣（服装）→ 家（全屋）→ 餐饮 → 短视频。
 * 顶栏、首页入口、页脚、行业页底部导航均应由此派生，避免多处手写不一致。
 */
export type BusinessModule = {
  /** 与 IndustryPage `category`、后端服务分类一致 */
  category: string
  path: string
  /** 顶栏、行业页底部导航 */
  navLabel: string
  /** 首页卡片主标题 */
  homeName: string
  imageTitle: string
  imageHint: string
  /** 页脚「核心业务」列文案 */
  footerCoreLabel: string
}

export const BUSINESS_MODULES: BusinessModule[] = [
  {
    category: '美发',
    path: '/hairdressing',
    navLabel: '美发',
    homeName: '美发',
    imageTitle: '发型设计展示',
    imageHint: '烫染造型 / 发质护理 / 头皮管理',
    footerCoreLabel: '美发造型'
  },
  {
    category: '彩妆',
    path: '/makeup',
    navLabel: '彩妆',
    homeName: '彩妆',
    imageTitle: '妆容风格展示',
    imageHint: '新娘妆 / 日常妆 / 主题妆',
    footerCoreLabel: '彩妆服务'
  },
  {
    category: '婚纱摄影',
    path: '/wedding-photography',
    navLabel: '婚纱摄影',
    homeName: '婚纱摄影',
    imageTitle: '婚纱拍摄案例',
    imageHint: '主纱照 / 仪式跟拍 / 修图成片',
    footerCoreLabel: '婚纱摄影'
  },
  {
    category: '服装定制',
    path: '/clothing-customization',
    navLabel: '服装定制',
    homeName: '服装定制',
    imageTitle: '版型成衣展示',
    imageHint: '量体定制 / 面料挑选 / 套系搭配',
    footerCoreLabel: '服装定制'
  },
  {
    category: '全屋定制',
    path: '/home-customization',
    navLabel: '全屋定制',
    homeName: '全屋定制',
    imageTitle: '空间效果展示',
    imageHint: '客餐厅 / 卧室 / 全屋收纳',
    footerCoreLabel: '全屋定制'
  },
  {
    category: '中餐馆',
    path: '/chinese-restaurant',
    navLabel: '中餐馆',
    homeName: '中餐馆',
    imageTitle: '菜品门店展示',
    imageHint: '招牌菜 / 包厢场景 / 到店活动',
    footerCoreLabel: '中餐馆运营'
  },
  {
    category: '短视频制作',
    path: '/short-video-production',
    navLabel: '短视频制作',
    homeName: '短视频制作',
    imageTitle: '视频成片展示',
    imageHint: '脚本策划 / 拍摄剪辑 / 代运营',
    footerCoreLabel: '短视频制作'
  }
]

/** 供图表、看板等仅需名称序列的场景 */
export const BUSINESS_MODULE_LABELS = BUSINESS_MODULES.map((m) => m.navLabel)
