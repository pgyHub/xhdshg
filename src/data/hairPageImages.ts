/**
 * 美发专题：已裁掉底部品牌字样的实拍示意（本地 public/images/hair）。
 * 不足槽位用独立 Picsum seed 补齐（不保证为发型特写，上线建议换本店实拍）。
 */
import { stockPic } from './mediaUtils'

const pad = (seed: string, w: number, h: number) => stockPic(seed, w, h)

export const hairPageImages = {
  hero: '/images/hair/hair-editorial-bob-01.png',
  g1: '/images/hair/hair-salon-table-02.png',
  g2: '/images/hair/hair-salon-wavy-03.png',
  g3: '/images/hair/hair-salon-bob-04.png',
  l1: '/images/hair/hair-salon-wrap-05.png',
  l2: '/images/hair/hair-groom-formal-06.png',
  l3: '/images/hair/hair-groom-blazer-07.png',
  l4: '/images/hair/hair-woman-white-08.png',
  l5: '/images/hair/hair-woman-halter-09.png',
  l6: '/images/hair/hair-salon-longhair-11.png',
  p1: '/images/hair/hair-promo-studio-10.png',
  p2: pad('xhdsg-hair-only-svc-02', 820, 520),
  p3: pad('xhdsg-hair-only-svc-03', 820, 520),
  s1: pad('xhdsg-hair-only-case-01', 800, 500),
  s2: pad('xhdsg-hair-only-case-02', 800, 500),
  s3: pad('xhdsg-hair-only-case-03', 800, 500),
} as const
