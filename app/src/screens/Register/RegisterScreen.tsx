import { Text, StyleSheet } from 'react-native'
import { Screen } from '../../components/Screen'

export function RegisterScreen() {
  return (
    <Screen style={styles.pad}>
      <Text style={styles.title}>注册</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  pad: { padding: 16 },
  title: { fontSize: 22, fontWeight: '600' },
})
