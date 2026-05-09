import { Text, StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'

export function DashboardScreen() {
  return (
    <Screen style={styles.pad}>
      <Text style={styles.title}>数据驾驶舱</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  pad: { padding: 16 },
  title: { fontSize: 22, fontWeight: '600' },
})
