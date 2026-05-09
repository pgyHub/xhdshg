import { Text, StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'

export function OrdersScreen() {
  return (
    <Screen style={styles.pad}>
      <Text style={styles.title}>订单管理</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  pad: { padding: 16 },
  title: { fontSize: 22, fontWeight: '600' },
})
