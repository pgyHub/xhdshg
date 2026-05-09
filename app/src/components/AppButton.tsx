import { Pressable, Text, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native'

type Props = Omit<PressableProps, 'style' | 'children'> & {
  title: string
  style?: StyleProp<ViewStyle>
}

export function AppButton({ title, style, ...rest }: Props) {
  return (
    <Pressable accessibilityRole="button" style={[styles.btn, style]} {...rest}>
      <Text style={styles.label}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#c41e3a',
    alignItems: 'center',
  },
  label: { color: '#fff', fontSize: 16, fontWeight: '600' },
})
