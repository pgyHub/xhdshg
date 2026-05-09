import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen } from '../screens/Home/HomeScreen'
import { ServiceDetailScreen } from '../screens/ServiceDetail/ServiceDetailScreen'
import { LoginScreen } from '../screens/Login/LoginScreen'
import { RegisterScreen } from '../screens/Register/RegisterScreen'
import { ProfileScreen } from '../screens/Profile/ProfileScreen'
import { OrdersScreen } from '../screens/Orders/OrdersScreen'
import { DashboardScreen } from '../screens/Dashboard/DashboardScreen'
import { FilesScreen } from '../screens/Files/FilesScreen'

export type RootStackParamList = {
  Home: undefined
  ServiceDetail: undefined
  Login: undefined
  Register: undefined
  Profile: undefined
  Orders: undefined
  Dashboard: undefined
  Files: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: '服务详情' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: '登录' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: '注册' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: '会员中心' }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: '订单' }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: '数据驾驶舱' }} />
      <Stack.Screen name="Files" component={FilesScreen} options={{ title: '文件' }} />
    </Stack.Navigator>
  )
}
