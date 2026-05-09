import { type ReactNode } from 'react'
import { View, Text, StyleSheet, type ViewProps } from 'react-native'

type Props = ViewProps & { title?: string; children?: ReactNode }

export function AppCard({ title, children, style, ...rest }: Props) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e8e8e8',
  },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
})
