/**
 * 彩妆专题：已裁掉底部/角标品牌字的实拍示意（本地 public/images/makeup）。
 * 不足槽位用独立 Picsum seed 补齐。
 */
import { stockPic } from './mediaUtils'

const pad = (seed: string, w: number, h: number) => stockPic(seed, w, h)

export const makeupPageImages = {
  hero: '/images/makeup/mk-halter-redlip-05.png',
  g1: '/images/makeup/mk-lily-reflection-01.png',
  g2: '/images/makeup/mk-portrait-soft-02.png',
  g3: '/images/makeup/mk-eye-detail-03.png',
  l1: '/images/makeup/mk-liquid-portrait-04.png',
  l2: pad('xhdsg-mkp-only-layout-02', 900, 560),
  l3: pad('xhdsg-mkp-only-layout-03', 900, 560),
  l4: pad('xhdsg-mkp-only-layout-04', 900, 560),
  l5: pad('xhdsg-mkp-only-layout-05', 900, 560),
  l6: pad('xhdsg-mkp-only-layout-06', 900, 560),
  p1: pad('xhdsg-mkp-only-pack-01', 820, 520),
  p2: pad('xhdsg-mkp-only-pack-02', 820, 520),
  p3: pad('xhdsg-mkp-only-pack-03', 820, 520),
  s1: pad('xhdsg-mkp-only-show-01', 800, 500),
  s2: pad('xhdsg-mkp-only-show-02', 800, 500),
  s3: pad('xhdsg-mkp-only-show-03', 800, 500),
} as const
