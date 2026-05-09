import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { logout } from '../../store/slices/authSlice'
import { SERVICE_CATEGORIES, serviceCategoryPath } from '../../data/serviceCategories'
import './index.scss'

type ToolEntry = { title: string; desc: string; path: string }

const TOOL_ENTRIES: ToolEntry[] = [
  { title: '会员中心', desc: '资料与会员相关', path: '/pages/Profile/index' },
  { title: '我的订单', desc: '订单列表', path: '/pages/Orders/index' },
  { title: '文件中心', desc: '上传与下载', path: '/pages/Files/index' },
  { title: '数据看板', desc: '统计概览', path: '/pages/Dashboard/index' },
]

export default function Home() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((s) => s.auth.accessToken)

  const go = (path: string) => {
    void Taro.navigateTo({ url: path })
  }

  const onLogout = () => {
    dispatch(logout())
    void Taro.navigateTo({ url: '/pages/Login/index' })
  }

  const goLogin = () => {
    void Taro.navigateTo({ url: '/pages/Login/index' })
  }

  return (
    <View className="page-home">
      <Text className="page-home__title">小红点生活馆</Text>
      <Text className="page-home__hint">本地生活与会员服务（与 Web 共用后端）</Text>

      {!accessToken ? (
        <View className="page-home__banner page-home__banner--guest">
          <Text className="page-home__banner-text">登录后可使用会员与文件等功能</Text>
          <View className="page-home__tile page-home__tile--accent" onClick={goLogin}>
            <Text className="page-home__tile-title">去登录</Text>
          </View>
        </View>
      ) : (
        <View className="page-home__banner">
          <Text className="page-home__banner-text">已登录</Text>
          <Text className="page-home__banner-link" onClick={onLogout}>
            退出登录
          </Text>
        </View>
      )}

      <Text className="page-home__section">本地生活服务</Text>
      <Text className="page-home__section-sub">以下为各业务线介绍、流程与价格说明；详情内示意图需联网加载（正式环境请配置图片域名）</Text>

      <View className="page-home__grid">
        {SERVICE_CATEGORIES.map((item) => (
          <View
            key={item.id}
            className="page-home__tile page-home__tile--service"
            style={{ borderLeftColor: item.accentColor }}
            onClick={() => go(serviceCategoryPath(item.id))}
          >
            <Text className="page-home__tile-title">{item.title}</Text>
            <Text className="page-home__tile-desc">{item.shortDesc}</Text>
          </View>
        ))}
      </View>

      <Text className="page-home__section">会员与工具</Text>
      <View className="page-home__grid">
        {TOOL_ENTRIES.map((item) => (
          <View key={item.path} className="page-home__tile" onClick={() => go(item.path)}>
            <Text className="page-home__tile-title">{item.title}</Text>
            <Text className="page-home__tile-desc">{item.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
