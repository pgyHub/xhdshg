import IndustryPage from '../components/IndustryPage'
import { restaurantImage } from '../data/restaurantImages'

/**
 * 图片位置按「识图后的真实内容」分配：
 * - 首屏主视觉：砂锅鸡汤动态（最具食欲与冲击力）
 * - 环境区：大厅、扫码客席、明档+蔬菜墙
 * - 模块/套餐/展示：与文案语义一致的菜品或门店场景
 */
const 中餐馆 = () => (
  <IndustryPage
    category="中餐馆"
    title="中餐馆品牌化运营"
    subtitle="从招牌菜品打造、门店服务流程到线上传播，助力餐饮业务稳定增长。"
    heroMedia={{
      src: restaurantImage('shaGuoJiTangHero'),
      alt: '砂锅鸡汤 — 金黄汤底现舀，热气腾腾（主视觉）',
    }}
    venueGallery={[
      {
        src: restaurantImage('diningHall'),
        caption: '明亮整洁的就餐大厅 · 适合家庭与简餐',
      },
      {
        src: restaurantImage('diningQr'),
        caption: '桌边扫码点餐 · 现代快餐动线',
      },
      {
        src: restaurantImage('mingDangWide'),
        caption: '明档菜品丰富陈列 · 引导自选与加购',
      },
    ]}
    highlights={['菜品标准化出品', '门店服务SOP', '线上线下联动营销']}
    workflow={['菜单策略', '供应链准备', '门店运营', '活动推广', '复购管理']}
    siteStyle="restaurant"
    styleSections={['招牌菜主视觉', '菜单分类导航', '门店环境展示', '订座与外卖入口']}
    scenarios={['家庭聚餐', '商务宴请', '节庆套餐', '团建订餐']}
    referenceSites={[{ name: '连锁中餐品牌参考', url: 'https://lxjchina.com.cn/' }]}
    layoutModules={[
      {
        title: '门店主打菜品区',
        desc: '用「汤锅+硬菜」组合体现客单价与记忆点。',
        image: restaurantImage('shaGuoSoupClose'),
      },
      {
        title: '菜单分类导航',
        desc: '明档自选、小碟计价，贴近中式快餐/食堂模型。',
        image: restaurantImage('mingDangLine'),
      },
      {
        title: '套餐与宴会方案',
        desc: '商务与节庆适合大菜压桌，提升仪式感。',
        image: restaurantImage('meiCaiKouRou'),
      },
      {
        title: '新鲜食材展示',
        desc: '强调时蔬与供应链可视化，建立信任。',
        image: restaurantImage('storeFreshAndKitchen'),
      },
      {
        title: '评价与口碑模块',
        desc: '经典冷荤与粤式白切，适合作为口碑推荐位。',
        image: restaurantImage('baiQieJi'),
      },
      {
        title: '到店与外卖入口',
        desc: '档口丰富度展示，引导堂食与外带转化。',
        image: restaurantImage('mingDangWide'),
      },
    ]}
    marketStats={[
      { label: '日均翻台率', value: '4.6 次' },
      { label: '团购转化率', value: '27%' },
      { label: '会员复购率', value: '63%' },
      { label: '客单价', value: '¥132' },
    ]}
    sampleCases={[
      { title: '午市套餐升级', data: '午市营收 +34%', desc: '优化套餐结构与出餐节奏，提升工作日时段效率。' },
      { title: '家庭聚餐主题季', data: '预约量增长 48%', desc: '结合节假日场景上新套餐，提升预订与到店率。' },
      { title: '会员积分体系上线', data: '90天复购 +22%', desc: '围绕消费积分和生日权益提升顾客粘性。' },
    ]}
    mockServices={[
      {
        name: '双人精选套餐',
        price: 168,
        description: '酸菜鱼+时蔬+米饭饮品组合，适合两人小聚。',
        image: restaurantImage('suanCaiYu'),
      },
      {
        name: '商务宴请包间',
        price: 1988,
        description: '梅菜扣肉等硬菜压桌，适合宴请与团餐场景。',
        image: restaurantImage('meiCaiKouRou'),
      },
      {
        name: '家庭欢聚套餐',
        price: 568,
        description: '家常菜组合，老少皆宜，提升家庭桌均。',
        image: restaurantImage('xiHongShiChaoJiDan'),
      },
    ]}
    showcaseItems={[
      {
        title: '招牌菜视觉升级',
        tag: '菜品策略',
        summary: '三杯鸡等招牌菜统一实拍风格，强化识别与转化。',
        image: restaurantImage('sanbeiji'),
      },
      {
        title: '周末家庭套餐',
        tag: '场景营销',
        summary: '西红柿炒蛋等家常菜带动周末家庭客流。',
        image: restaurantImage('xiHongShiChaoJiDan'),
      },
      {
        title: '门店口碑运营',
        tag: '会员复购',
        summary: '白切鸡等经典味型承载口碑与复购。',
        image: restaurantImage('baiQieJi'),
      },
    ]}
    capabilityMatrix={[
      { name: '菜单工程', detail: '按利润率与销量结构优化菜单，提升整体经营效率。' },
      { name: '门店运营', detail: '优化排队、点餐、上菜和结算流程，提升服务体验。' },
      { name: '活动营销', detail: '围绕节日和主题场景策划活动，提升客流峰值。' },
      { name: '会员系统', detail: '通过积分、储值、权益体系提升复购和口碑传播。' },
    ]}
    insights={[
      '头部餐饮品牌普遍通过“场景套餐 + 数字化会员”提升复购。',
      '菜单工程优化是提升利润率和翻台效率的关键抓手。',
      '短视频与本地生活平台联动已成为重要获客渠道。',
    ]}
    faqs={[
      { q: '支持包间和团体预订吗？', a: '支持，可按人数与预算定制菜单和服务。' },
      { q: '是否提供企业餐饮服务？', a: '支持会议餐、活动餐和长期企业合作方案。' },
      { q: '会员权益有哪些？', a: '含积分、生日礼、专属套餐和优先预订权益。' },
    ]}
  />
)

export default 中餐馆
