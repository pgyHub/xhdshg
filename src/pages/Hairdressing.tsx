import IndustryPage from '../components/IndustryPage'
import { hairPageImages as H } from '../data/hairPageImages'

const 美发 = () => (
  <IndustryPage
    category="美发"
    title="潮流美发与头皮护理"
    subtitle="结合脸型与职业场景进行发型设计，支持剪、染、烫、护理全链路服务。"
    heroMedia={{ src: H.hero, alt: '潮流发型主视觉（已裁切底部字标）', kind: 'image', imagePosition: 'center 24%' }}
    venueSectionTitle="环境与作品区"
    venueSectionSubtitle="下列为已裁切底部字标的造型示意；横滑三图与首图各不相同，可与彩妆、婚摄等模块并存。"
    venueGallery={[
      { src: H.g1, caption: '横滑位一：门店造型咨询与工位氛围', imagePosition: 'center 40%' },
      { src: H.g2, caption: '横滑位二：中长卷发与质感呈现', imagePosition: 'center 26%' },
      { src: H.g3, caption: '横滑位三：短发造型与轮廓线条', imagePosition: 'center 24%' }
    ]}
    highlights={['发型顾问制服务', '进口护理产品', '造型趋势实时更新']}
    workflow={['风格测试', '发质诊断', '发型设计', '剪烫染执行', '日常打理指导']}
    siteStyle="hair"
    styleSections={['潮流发型头图', '发型师专栏', '项目报价区', '预约到店入口']}
    scenarios={['通勤精致造型', '约会氛围造型', '商务稳重造型', '舞台时尚造型']}
    referenceSites={[
      { name: '美发站行业参考', url: 'https://www.meifazhan.com/' }
    ]}
    layoutModules={[
      { title: '发型趋势头图区', desc: '首屏展示季度流行发型，当前为虚拟主题与示例标题。', image: H.l1, imagePosition: 'center 28%' },
      { title: '发型师推荐列表', desc: '展示“资深总监/高级造型师”卡片，后续可换真人信息。', image: H.l2, imagePosition: 'center 32%' },
      { title: '项目价格一览', desc: '按剪发、染发、烫发、护理拆分价格模块，便于快速决策。', image: H.l3, imagePosition: 'center 30%' },
      { title: '发质检测流程', desc: '通过步骤卡说明“检测-建议-执行-护理”服务闭环。', image: H.l4, imagePosition: 'center 25%' },
      { title: '顾客案例前后对比', desc: '占位展示改造前后效果，后续替换真实图片。', image: H.l5, imagePosition: 'center 26%' },
      { title: '预约与到店指引', desc: '预留门店位置、营业时间、预约入口等实用信息。', image: H.l6, imagePosition: 'center 28%' }
    ]}
    marketStats={[
      { label: '月服务人次', value: '2,460' },
      { label: '护理项目占比', value: '57%' },
      { label: '高客单转化', value: '29%' },
      { label: '会员留存率', value: '88%' }
    ]}
    sampleCases={[
      { title: '头皮护理专项月', data: '客单提升 18%', desc: '以头皮诊断+疗程卡为核心，带动高价值护理服务。' },
      { title: '门店造型升级周', data: '预约增长 42%', desc: '联动社媒发型趋势内容，提升年轻客群到店意愿。' },
      { title: '会员复购激活', data: '复购提升 25%', desc: '通过档案化管理提醒顾客定期维护发型与发质。' }
    ]}
    mockServices={[
      {
        name: '形象设计剪裁',
        price: 268,
        description: '结合脸型/职业场景设计发型，含造型建议。配图为套餐卡片版式占位。',
        image: H.p1,
        imagePosition: 'center 28%'
      },
      {
        name: '轻奢染烫套系',
        price: 1180,
        description: '含烫染+修护，支持潮流发色与质感卷度打造。配图为套餐卡片版式占位。',
        image: H.p2,
        imagePosition: 'center 24%'
      },
      {
        name: '深层头皮护理',
        price: 399,
        description: '头皮清洁、舒缓导入与居家护理建议。配图为套餐卡片版式占位。',
        image: H.p3,
        imagePosition: 'center 22%'
      }
    ]}
    showcaseItems={[
      {
        title: '潮流剪裁案例位',
        tag: '潮流款',
        summary: '用于呈现层次剪裁与职场场景话术；配图为版式占位，请换本店发型前后对比。',
        image: H.s1,
        imagePosition: 'center 24%'
      },
      {
        title: '染发护色案例位',
        tag: '发色',
        summary: '用于呈现冷棕/护色等服务卖点；配图为版式占位，请换本店发色实拍。',
        image: H.s2,
        imagePosition: 'center 30%'
      },
      {
        title: '头皮护理案例位',
        tag: '护理',
        summary: '用于呈现分型护理与疗程组合；配图为版式占位，请换本店护理过程图。',
        image: H.s3,
        imagePosition: 'center 23%'
      }
    ]}
    capabilityMatrix={[
      { name: '发型数据库', detail: '结合脸型、发量、职业属性快速匹配推荐发型。' },
      { name: '头皮管理体系', detail: '支持检测、疗程、居家护理建议三段式方案。' },
      { name: '门店运营支持', detail: '通过项目组合和会员储值方案提升门店经营效率。' },
      { name: '造型内容输出', detail: '联动短视频模块进行发型内容营销与获客。' }
    ]}
    insights={[
      '头部连锁普遍将剪发从单次服务升级为周期化会员维护。',
      '“发质改善”成为高客单项目核心，护理占比持续增长。',
      '发型师个人IP化可显著提升预约率与品牌曝光。'
    ]}
    faqs={[
      { q: '首次到店如何选择发型？', a: '可先进行顾问咨询，我们会结合脸型和场景给出建议。' },
      { q: '染烫后如何护理？', a: '提供个性化护理计划和周期提醒，帮助延长效果。' },
      { q: '是否有会员套餐？', a: '有，支持剪烫染与护理组合包及次卡模式。' }
    ]}
  />
)

export default 美发
