import IndustryPage from '../components/IndustryPage'

const 彩妆 = () => (
  <IndustryPage
    category="彩妆"
    title="高端彩妆与形象定制"
    subtitle="覆盖婚礼、晚宴、商务和拍摄等多场景，提供妆面设计与造型搭配一体化服务。"
    highlights={['场景化妆面设计', '皮肤状态评估', '妆发整体搭配']}
    workflow={['风格沟通', '妆发方案确认', '上妆执行', '造型定妆', '现场补妆支持']}
    siteStyle="beauty"
    styleSections={['品牌KV主视觉', '明星单品陈列', '妆容灵感栏目', '会员权益入口']}
    scenarios={['新娘妆容', '商务形象妆', '活动晚宴妆', '短视频上镜妆']}
    referenceSites={[
      { name: 'YSL Beauty 中国官网', url: 'https://www.yslbeautycn.com/' },
      { name: '毛戈平美妆官网', url: 'https://www.maogepingbeauty.com/' }
    ]}
    layoutModules={[
      { title: '明星单品主视觉', desc: '顶部使用大图Banner + 主打产品卖点，模拟品牌主推系列。' },
      { title: '底妆/彩妆分类导航', desc: '按“底妆、眼妆、唇妆、工具”拆分模块，支持后续接入真实SKU。' },
      { title: '妆容灵感专区', desc: '以“通勤妆、约会妆、晚宴妆”卡片展示，当前为示例文案。' },
      { title: '口碑评价模块', desc: '展示虚拟评分、体验反馈与用户标签，后续可接评论数据。' },
      { title: '化妆服务套餐区', desc: '结合上门妆造/试妆/跟妆服务形成套餐卡片，支持后续改价。' },
      { title: '品牌故事与会员权益', desc: '预留品牌理念、会员积分、生日礼等信息展示位。' }
    ]}
    marketStats={[
      { label: '日均预约单', value: '96' },
      { label: '上镜妆占比', value: '41%' },
      { label: '妆面满意度', value: '97%' },
      { label: '复购会员数', value: '3,208' }
    ]}
    sampleCases={[
      { title: '活动档期爆单', data: '3天完成 200+ 妆造', desc: '通过分时段排班与妆面库管理，保障高峰期交付稳定。' },
      { title: '品牌直播妆造', data: '场观提升 38%', desc: '针对镜头光线定制底妆与色彩方案，提升直播表现力。' },
      { title: '新娘全天妆发服务', data: '好评率 99%', desc: '婚礼跟妆 + 造型切换服务，覆盖仪式全流程。' }
    ]}
    mockServices={[
      { name: '商务轻妆快修', price: 299, description: '30分钟快速妆面打造，适合会议/面试/商务活动。' },
      { name: '新娘跟妆全天', price: 1980, description: '含主妆+敬酒+送客多造型切换与补妆支持。' },
      { name: '直播上镜妆造套系', price: 699, description: '根据直播间光线定制妆面，支持品牌风格化输出。' }
    ]}
    showcaseItems={[
      { title: '轻氧裸感妆', tag: '日常', summary: '强调肤质通透感，适配通勤与生活方式类场景。' },
      { title: '高级晚宴妆', tag: '活动', summary: '根据礼服色系与灯光环境进行立体修容和妆色平衡。' },
      { title: '镜头感妆造', tag: '拍摄', summary: '针对镜头和光线优化底妆与高光，提升出片质感。' }
    ]}
    capabilityMatrix={[
      { name: '皮肤管理评估', detail: '上妆前进行肤质评估，选择更适配的底妆体系。' },
      { name: '妆发一体化', detail: '妆容与发型同步设计，避免风格割裂。' },
      { name: '场景库配置', detail: '按婚礼、商务、直播、活动等场景建立妆面模板。' },
      { name: '教学与复盘', detail: '支持客户妆面复盘与基础化妆教学服务。' }
    ]}
    insights={[
      '彩妆行业头部品牌都在强化“肤色适配”和“场景适配”能力。',
      '直播与短视频场景推动“镜头妆”成为增长较快的细分品类。',
      '以会员制打包妆造服务是提升长期复购的有效方式。'
    ]}
    faqs={[
      { q: '可以只预约试妆吗？', a: '支持单次试妆，可在正式服务前确认风格方案。' },
      { q: '是否提供上门服务？', a: '支持同城上门，具体根据档期和区域安排。' },
      { q: '妆容能保持多久？', a: '常规 8-12 小时，活动场景可加配补妆服务。' }
    ]}
  />
)

export default 彩妆
