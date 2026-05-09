import { type ReactNode } from 'react'
import { SafeAreaView, StyleSheet, type ViewProps } from 'react-native'

type Props = ViewProps & { children?: ReactNode }

/** 通用页面容器：安全区 + 内边距 */
export function Screen({ children, style, ...rest }: Props) {
  return (
    <SafeAreaView style={[styles.root, style]} {...rest}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f7f7f7' },
})
