import { View, Text } from '@tarojs/components'
import './index.scss'

type MockOrder = {
  id: string
  title: string
  status: string
  time: string
  amount: string
}

const MOCK_ORDERS: MockOrder[] = [
  { id: '1', title: '婚纱摄影 · 定金', status: '待付尾款', time: '2026-05-01 14:20', amount: '¥2,000.00' },
  { id: '2', title: '美发 · 烫染套餐', status: '已完成', time: '2026-04-28 10:00', amount: '¥568.00' },
  { id: '3', title: '短视频制作 · 单条探店', status: '制作中', time: '2026-04-25 09:30', amount: '¥800.00' },
]

export default function Orders() {
  return (
    <View className="page-orders">
      <Text className="page-orders__title">我的订单</Text>
      <Text className="page-orders__sub">以下为示例订单，接入后端订单接口后将替换为真实数据。</Text>

      {MOCK_ORDERS.map((o) => (
        <View key={o.id} className="page-orders__card">
          <View className="page-orders__head">
            <Text className="page-orders__name">{o.title}</Text>
            <Text className="page-orders__status">{o.status}</Text>
          </View>
          <Text className="page-orders__meta">{o.time}</Text>
          <Text className="page-orders__amount">{o.amount}</Text>
          <View className="page-orders__actions">
            <Text className="page-orders__btn">查看详情</Text>
            <Text className="page-orders__btn page-orders__btn--ghost">联系客服</Text>
          </View>
        </View>
      ))}

      <Text className="page-orders__foot">没有更多订单了</Text>
    </View>
  )
}
