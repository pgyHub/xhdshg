import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { SERVICE_CATEGORIES, serviceCategoryPath } from '../../data/serviceCategories'
import './index.scss'

export default function ServiceDetail() {
  return (
    <View className="page-sd">
      <Text className="page-sd__title">服务详情</Text>
      <Text className="page-sd__sub">通用入口。各业务线请从首页「本地生活服务」进入对应分类查看完整介绍。</Text>
      <View className="page-sd__list">
        {SERVICE_CATEGORIES.map((c) => (
          <View
            key={c.id}
            className="page-sd__item"
            onClick={() => void Taro.navigateTo({ url: serviceCategoryPath(c.id) })}
          >
            <Text className="page-sd__item-title">{c.title}</Text>
            <Text className="page-sd__item-desc">{c.shortDesc}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
