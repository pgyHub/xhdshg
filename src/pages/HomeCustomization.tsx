import IndustryPage from '../components/IndustryPage'
import { homeStock } from '../data/moduleStockImages'

const 全屋定制 = () => (
  <IndustryPage
    category="全屋定制"
    title="全屋定制与空间美学"
    subtitle="从户型测量到施工落地，提供设计、选材、生产、安装一体化的家居升级方案。"
    heroMedia={{ src: homeStock.hero, alt: '全屋定制空间示意', kind: 'image' }}
    venueSectionTitle="样板间与实景"
    venueSectionSubtitle="三图为横滑展示位；每图独立占位，上线后请换案例实拍。与其他行业模块所用图互不重复。"
    venueGallery={[
      { src: homeStock.g1, caption: '横滑位一：公区/客厅套系示意（对应整柜与动线说明入口）' },
      { src: homeStock.g2, caption: '横滑位二：卧室收纳套系示意（对应柜体模块与配件入口）' },
      { src: homeStock.g3, caption: '横滑位三：厨房/功能分区示意（对应橱柜与五金说明入口）' }
    ]}
    highlights={['全案设计能力', '环保选材体系', '项目进度可视化']}
    workflow={['上门量房', '功能规划', '3D方案确认', '生产安装', '验收与售后']}
    siteStyle="home"
    styleSections={['风格样板间首屏', '空间分区导航', '全屋套餐对比', '门店服务网络']}
    scenarios={['新房整屋定制', '旧房局改焕新', '收纳系统升级', '商住空间改造']}
    referenceSites={[
      { name: '好莱客家居', url: 'http://www.homekoo.com/' },
      { name: '顶维e家定制参考', url: 'http://www.dwejia.com/jiaju/0/0/1.html' }
    ]}
    layoutModules={[
      { title: '风格主视觉区', desc: '按现代、轻奢、原木等风格展示示例方案，后续替换实景图。', image: homeStock.l1 },
      { title: '空间分区导航', desc: '客厅/卧室/厨房/书房分区入口，方便用户按空间浏览。', image: homeStock.l2 },
      { title: '整屋套餐展示', desc: '以套餐卡呈现预算区间、交付周期、包含项目（示例数据）。', image: homeStock.l3 },
      { title: '案例VR与效果图区', desc: '预留“平面图-效果图-实景图”三层内容结构。', image: homeStock.l4 },
      { title: '材料与工艺说明', desc: '用图文模块说明板材、五金、环保等级，当前为虚拟参数。', image: homeStock.l5 },
      { title: '门店服务网络', desc: '预留全国门店、免费量房、售后支持等服务入口。', image: homeStock.l6 }
    ]}
    quickActions={['免费量尺', '免费设计', '免费出图', '预约免费设计', '在线报修', '附近门店']}
    productSystems={[
      {
        title: '全屋成品',
        items: ['客厅', '餐厅', '卧室', '青少年房', '书房茶室', '休闲阳台']
      },
      {
        title: '全屋定制',
        items: ['威特森系列', '西格', '柯林π', '贝利尼', '青影', '东方木作']
      },
      {
        title: '整体橱柜',
        items: ['东方风', '欧式简奢', '北欧风', '现代轻奢', '意式极简', '中古风']
      }
    ]}
    sceneCases={[
      { scene: '住宅公寓', desc: '围绕家庭动线与收纳需求，配置全屋柜体、背景墙与软装系统。' },
      { scene: '酒店案例', desc: '结合酒店定位规划客房收纳、卫浴和公共区域家具模块。' },
      { scene: '老年康养', desc: '重点考虑无障碍、安全扶手、低高度收纳与防滑细节设计。' },
      { scene: '办公案例', desc: '以效率和品牌展示为核心，打造前台、会议室、工位一体空间。' }
    ]}
    marketStats={[
      { label: '月度签约数', value: '128' },
      { label: '方案采纳率', value: '63%' },
      { label: '按期交付率', value: '96%' },
      { label: '平均客单价', value: '¥86,000' }
    ]}
    sampleCases={[
      { title: '90平旧房改造', data: '工期缩短 14 天', desc: '以模块化定制减少现场返工，提升安装效率。' },
      { title: '收纳体系升级', data: '储物空间 +37%', desc: '围绕家庭成员动线重构柜体与功能分区。' },
      { title: '精装房软硬一体', data: '预算控制误差 < 5%', desc: '设计、选材与生产同步推进，控制成本波动。' }
    ]}
    mockServices={[
      {
        name: '全屋设计咨询包',
        price: 1999,
        description: '含量房、平面规划、3D效果图与预算建议。配图为套餐卡片版式占位。',
        image: homeStock.p1
      },
      {
        name: '整屋柜体定制',
        price: 68800,
        description: '衣柜/橱柜/餐边柜/书柜一体化定制方案。配图为套餐卡片版式占位。',
        image: homeStock.p2
      },
      {
        name: '厨房焕新改造',
        price: 26800,
        description: '动线优化、柜体升级与功能五金组合落地。配图为套餐卡片版式占位。',
        image: homeStock.p3
      }
    ]}
    showcaseItems={[
      {
        title: '收纳升级案例位',
        tag: '实用型',
        summary: '用于呈现小户型垂直收纳与多功能柜体策略；配图为版式占位，请换本店实景前后对比。',
        image: homeStock.s1
      },
      {
        title: '轻奢整屋案例位',
        tag: '品质型',
        summary: '用于呈现风格统一与材质升级卖点；配图为版式占位，请换本店整屋实景。',
        image: homeStock.s2
      },
      {
        title: '局改焕新案例位',
        tag: '改造型',
        summary: '用于呈现局改范围、工期与预算控制；配图为版式占位，请换本店局改工地/完工图。',
        image: homeStock.s3
      }
    ]}
    capabilityMatrix={[
      { name: '空间规划', detail: '围绕户型痛点进行动线、采光和功能区系统优化。' },
      { name: '材料体系', detail: '建立环保与耐用双维度选材标准，保障长期使用。' },
      { name: '施工协同', detail: '设计、工厂生产、现场安装节奏协同，减少返工。' },
      { name: '交付保障', detail: '验收标准化 + 售后巡检机制，保障落地品质。' }
    ]}
    insights={[
      '头部定制品牌都在强化“标准化交付能力”和“数字化设计体验”。',
      '局改和收纳升级成为增速较快的细分需求场景。',
      '案例可视化和价格透明化是提升签约率的重要因素。'
    ]}
    faqs={[
      { q: '多久可以看到设计方案？', a: '量房后通常 3-7 天可提供初版方案。' },
      { q: '预算如何控制？', a: '前期会拆分主材、五金、安装等费用，避免后期超支。' },
      { q: '工期大概多久？', a: '常规项目 30-60 天，局改项目可更快交付。' }
    ]}
  />
)

export default 全屋定制
