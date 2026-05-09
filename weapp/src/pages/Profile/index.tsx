import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useAppSelector } from '../../store/hooks'
import './index.scss'

export default function Profile() {
  const accessToken = useAppSelector((s) => s.auth.accessToken)
  const channel = useAppSelector((s) => s.auth.channel)

  return (
    <View className="page-profile">
      <Text className="page-profile__title">会员中心</Text>
      <Text className="page-profile__sub">资料、会员权益与客服入口（示意数据）</Text>

      <View className="page-profile__card">
        <Text className="page-profile__card-title">登录状态</Text>
        <Text className="page-profile__row">
          {accessToken ? `已登录 · ${channel === 'wechat' ? '微信' : '账号密码'}` : '未登录'}
        </Text>
        {!accessToken ? (
          <Text className="page-profile__link" onClick={() => void Taro.navigateTo({ url: '/pages/Login/index' })}>
            去登录
          </Text>
        ) : null}
      </View>

      <View className="page-profile__card">
        <Text className="page-profile__card-title">会员等级</Text>
        <Text className="page-profile__badge">黄金会员</Text>
        <Text className="page-profile__p">当前积分：1280（示例）。消费 1 元累计 1 分，积分可兑换合作商户权益。</Text>
      </View>

      <View className="page-profile__card">
        <Text className="page-profile__card-title">我的服务</Text>
        <Text className="page-profile__li">· 美发 / 彩妆预约记录将显示于此</Text>
        <Text className="page-profile__li">· 婚纱摄影合同与选片进度</Text>
        <Text className="page-profile__li">· 全屋定制量房与安装节点</Text>
      </View>

      <View className="page-profile__card">
        <Text className="page-profile__card-title">联系客服</Text>
        <Text className="page-profile__p">工作日 9:00–18:00 在线客服（此处为静态示意，接入 IM 后可跳转会话）。</Text>
        <Text className="page-profile__p">电话：400-000-0000（示例号码）</Text>
      </View>
    </View>
  )
}
