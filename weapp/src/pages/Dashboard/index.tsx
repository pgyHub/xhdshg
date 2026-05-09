import { View, Text } from '@tarojs/components'
import './index.scss'

const KPI = [
  { label: '本月成交额', value: '¥ 128,600', trend: '+12%' },
  { label: '新增会员', value: '86', trend: '+5' },
  { label: '待处理预约', value: '14', trend: '需跟进' },
  { label: '订单完成率', value: '94%', trend: '环比 +2%' },
]

export default function Dashboard() {
  return (
    <View className="page-dash">
      <Text className="page-dash__title">数据看板</Text>
      <Text className="page-dash__sub">运营概览（示例指标，接入报表 API 后可替换）</Text>

      <View className="page-dash__grid">
        {KPI.map((k) => (
          <View key={k.label} className="page-dash__card">
            <Text className="page-dash__label">{k.label}</Text>
            <Text className="page-dash__value">{k.value}</Text>
            <Text className="page-dash__trend">{k.trend}</Text>
          </View>
        ))}
      </View>

      <View className="page-dash__section">
        <Text className="page-dash__section-title">品类收入占比（示意）</Text>
        <Text className="page-dash__bar-label">美发 / 彩妆</Text>
        <View className="page-dash__bar-track">
          <View className="page-dash__bar-fill" style={{ width: '28%' }} />
        </View>
        <Text className="page-dash__bar-label">婚纱摄影</Text>
        <View className="page-dash__bar-track">
          <View className="page-dash__bar-fill page-dash__bar-fill--2" style={{ width: '35%' }} />
        </View>
        <Text className="page-dash__bar-label">全屋 / 定制 / 餐饮</Text>
        <View className="page-dash__bar-track">
          <View className="page-dash__bar-fill page-dash__bar-fill--3" style={{ width: '22%' }} />
        </View>
        <Text className="page-dash__bar-label">短视频及其他</Text>
        <View className="page-dash__bar-track">
          <View className="page-dash__bar-fill page-dash__bar-fill--4" style={{ width: '15%' }} />
        </View>
      </View>
    </View>
  )
}
