import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Home() {
  return (
    <View className="page-home">
      <Text className="page-home__title">首页</Text>
      <Text className="page-home__hint">服务分类与推荐（待对接 Web 端信息架构）</Text>
    </View>
  )
}
