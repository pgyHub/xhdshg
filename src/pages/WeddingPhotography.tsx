import IndustryPage from '../components/IndustryPage'
import { weddingStock } from '../data/moduleStockImages'

const 婚纱摄影 = () => (
  <IndustryPage
    category="婚纱摄影"
    title="婚纱摄影一站式服务"
    subtitle="从选景、造型到后期精修与成册交付，提供标准化流程与高品质影像服务。"
    siteStyle="beauty"
    heroBackdropVideos={{
      sources: ['/videos/wedding/1.mp4', '/videos/wedding/2.mp4'],
      dwellMs: 15000,
      crossfadeMs: 1000
    }}
    venueSectionTitle="样片与场景"
    venueSectionSubtitle="首屏为样片视频背景轮播；下方三图分别呈现夜景情绪、礼服肖像与纪实仪式风格。"
    venueGallery={[
      {
        src: '/images/wedding/wed-city-romance-01.png',
        caption: '横滑位一：夜景婚纱情绪片'
      },
      { src: weddingStock.g2, caption: '横滑位二：棚拍礼服肖像风格' },
      { src: weddingStock.g3, caption: '横滑位三：仪式纪实与互动抓拍' }
    ]}
    referenceSites={[
      { name: '聚婚网', url: 'http://www.jujiaonet.com/' },
      { name: '美婚网', url: 'http://www.mcmarry.com/#/' }
    ]}
    layoutModules={[
      { title: '样片主视觉区', desc: '顶部大图 + 当季主题套系，引导咨询与档期预约。', image: weddingStock.l1 },
      { title: '风格分类导航', desc: '旅拍、棚拍、中式、轻奢等入口，便于快速浏览。', image: weddingStock.l2 },
      { title: '套餐与价目', desc: '透明套系与加购项，降低决策成本。', image: weddingStock.l3 },
      { title: '团队与机位', desc: '双机位、化妆师、助理等配置说明。', image: weddingStock.l4 },
      { title: '客片与口碑', desc: '真实客片与评价模块，增强信任。', image: weddingStock.l5 },
      { title: '档期与到店', desc: '在线问档、到店看片与签约入口。', image: weddingStock.l6 }
    ]}
    mockServices={[
      {
        name: '城市轻旅拍套餐',
        price: 4299,
        description: '含摄影/化妆/服装2套/精修35张/电子相册。',
        image: weddingStock.p1
      },
      {
        name: '高定婚礼全天跟拍',
        price: 8999,
        description: '双机位拍摄，含婚礼快剪、精修与短视频花絮。',
        image: weddingStock.p2
      },
      {
        name: '韩式棚拍经典套餐',
        price: 3599,
        description: '棚拍场景4组，造型3套，支持亲友同框合拍。',
        image: weddingStock.p3
      }
    ]}
    showcaseItems={[
      {
        title: '旅拍方向案例位',
        tag: '旅拍',
        summary: '用于呈现黄金时段、自然光与动感抓拍等服务卖点。',
        image: weddingStock.s1
      },
      {
        title: '都市夜景案例位',
        tag: '城市风',
        summary: '用于呈现夜景布光、电影感调色等服务说明。',
        image: weddingStock.s2
      },
      {
        title: '国风礼服案例位',
        tag: '国风',
        summary: '用于呈现中式礼服、场景道具与文化符号等服务组合。',
        image: weddingStock.s3
      }
    ]}
    highlights={['双摄影师跟拍', '独立造型团队', '后期精修交付']}
    workflow={['需求沟通', '档期与拍摄计划', '拍摄执行', '后期精修', '相册与成片交付']}
    scenarios={['城市旅拍', '森系草坪婚礼', '室内韩式棚拍', '轻奢定制主题']}
    marketStats={[
      { label: '月咨询量', value: '1,286' },
      { label: '套餐转化率', value: '32.4%' },
      { label: '客户推荐率', value: '94%' },
      { label: '平均客单价', value: '¥5,980' }
    ]}
    sampleCases={[
      { title: '森系旅拍项目', data: '28天签约 73 对新人', desc: '围绕春季档期推出轻旅拍主题，提升到店转化与社媒传播。' },
      { title: '高定婚礼跟拍', data: 'NPS 9.6 / 10', desc: '通过双机位与现场流程标准化，显著提升交付满意度。' },
      { title: '节庆活动套餐', data: '复购率提升 21%', desc: '联合彩妆模块形成联名套系，拉动跨模块消费。' }
    ]}
    capabilityMatrix={[
      { name: '拍摄统筹', detail: '提供档期、场景、服装、妆造、摄影团队统一排期与现场统筹。' },
      { name: '影像交付', detail: '支持精修、短视频快剪、相册设计和云端素材归档。' },
      { name: '品牌联动', detail: '与美发、彩妆模块联动，打造跨模块套餐提升客单价。' },
      { name: '客户运营', detail: '通过社媒二次传播和纪念日服务，持续增强客户复购与转介绍。' }
    ]}
    insights={[
      '头部婚摄品牌普遍采用“样片内容化 + 套系透明化”提升咨询效率。',
      '旅拍类订单更依赖社媒种草，短视频预览已成为关键转化触点。',
      '与妆发、宴会服务捆绑销售，可显著提升整体客单和毛利结构。'
    ]}
    faqs={[
      { q: '拍摄前需要准备多久？', a: '建议提前 2-4 周完成档期确认、风格沟通和服装试穿。' },
      { q: '是否支持异地拍摄？', a: '支持，提供差旅、拍摄许可、行程统筹等一站式服务。' },
      { q: '精修交付周期多久？', a: '常规 10-15 个工作日，紧急档可加急处理。' }
    ]}
  />
)

export default 婚纱摄影
