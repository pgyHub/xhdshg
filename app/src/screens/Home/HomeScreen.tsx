import { Text, View, StyleSheet } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../navigation/RootNavigator'
import { AppButton } from '../../components/AppButton'
import { AppCard } from '../../components/AppCard'
import { Screen } from '../../components/Screen'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export function HomeScreen({ navigation }: Props) {
  return (
    <Screen style={styles.pad}>
      <AppCard title="首页">
        <Text style={styles.sub}>服务分类与推荐（待对接后端与 Web 端）</Text>
      </AppCard>
      <View style={styles.row}>
        <AppButton title="服务详情" onPress={() => navigation.navigate('ServiceDetail')} />
      </View>
      <View style={styles.row}>
        <AppButton title="登录" onPress={() => navigation.navigate('Login')} />
        <AppButton title="注册" onPress={() => navigation.navigate('Register')} style={styles.ml} />
      </View>
      <View style={styles.row}>
        <AppButton title="会员中心" onPress={() => navigation.navigate('Profile')} />
        <AppButton title="订单" onPress={() => navigation.navigate('Orders')} style={styles.ml} />
      </View>
      <View style={styles.row}>
        <AppButton title="数据驾驶舱" onPress={() => navigation.navigate('Dashboard')} />
        <AppButton title="文件" onPress={() => navigation.navigate('Files')} style={styles.ml} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  pad: { padding: 16 },
  sub: { fontSize: 14, color: '#666' },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  ml: { marginLeft: 12 },
})
