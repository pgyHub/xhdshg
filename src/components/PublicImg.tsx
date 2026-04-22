import type { ImgHTMLAttributes } from 'react'
import { publicAsset } from '../utils/publicAsset'

const PLACEHOLDER = '/images/illustrations/placeholder.svg'

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string }

/**
 * 使用 Vite BASE_URL 解析 public 资源，并在失败时回退到本地占位图（避免裂图）。
 */
export function PublicImg({ src, onError, ...rest }: Props) {
  return (
    <img
      src={publicAsset(src)}
      {...rest}
      onError={(e) => {
        const el = e.currentTarget
        if (el.getAttribute('data-pub-fallback') === '1') return
        el.setAttribute('data-pub-fallback', '1')
        el.src = publicAsset(PLACEHOLDER)
        onError?.(e)
      }}
    />
  )
}
