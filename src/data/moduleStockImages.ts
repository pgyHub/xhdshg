/**
 * 行业专题配图：每槽位独立 Picsum seed，全站不与服饰旗舰店等其它模块重复。
 * 详见 `mediaUtils.ts`。
 *
 * 说明：Picsum 为抽象占位，不保证与「婚摄 / 家居 / 视频」文案逐字对应；
 * 上线建议替换为 `public/images/...` 行业实拍或与模块强相关的素材。
 */
import { stockPic as p } from './mediaUtils'

const G = { w: 1000, h: 620 }
const L = { w: 900, h: 560 }
const P = { w: 820, h: 520 }
const S = { w: 800, h: 500 }

/** 婚纱摄影：仅静态图槽位（视频在页面内单独引用；横滑位一可用本地 `/images/wedding/wed-city-romance-01.png`） */
export const weddingStock = {
  g2: p('xhdsg-wed-strip-02', G.w, G.h),
  g3: p('xhdsg-wed-strip-03', G.w, G.h),
  l1: p('xhdsg-wed-layout-01', L.w, L.h),
  l2: p('xhdsg-wed-layout-02', L.w, L.h),
  l3: p('xhdsg-wed-layout-03', L.w, L.h),
  l4: p('xhdsg-wed-layout-04', L.w, L.h),
  l5: p('xhdsg-wed-layout-05', L.w, L.h),
  l6: p('xhdsg-wed-layout-06', L.w, L.h),
  p1: p('xhdsg-wed-pack-01', P.w, P.h),
  p2: p('xhdsg-wed-pack-02', P.w, P.h),
  p3: p('xhdsg-wed-pack-03', P.w, P.h),
  s1: p('xhdsg-wed-show-01', S.w, S.h),
  s2: p('xhdsg-wed-show-02', S.w, S.h),
  s3: p('xhdsg-wed-show-03', S.w, S.h),
}

/** 全屋定制 */
export const homeStock = {
  hero: p('xhdsg-home-hero-01', 1400, 780),
  g1: p('xhdsg-home-strip-01', G.w, G.h),
  g2: p('xhdsg-home-strip-02', G.w, G.h),
  g3: p('xhdsg-home-strip-03', G.w, G.h),
  l1: p('xhdsg-home-layout-01', L.w, L.h),
  l2: p('xhdsg-home-layout-02', L.w, L.h),
  l3: p('xhdsg-home-layout-03', L.w, L.h),
  l4: p('xhdsg-home-layout-04', L.w, L.h),
  l5: p('xhdsg-home-layout-05', L.w, L.h),
  l6: p('xhdsg-home-layout-06', L.w, L.h),
  p1: p('xhdsg-home-pack-01', P.w, P.h),
  p2: p('xhdsg-home-pack-02', P.w, P.h),
  p3: p('xhdsg-home-pack-03', P.w, P.h),
  s1: p('xhdsg-home-show-01', S.w, S.h),
  s2: p('xhdsg-home-show-02', S.w, S.h),
  s3: p('xhdsg-home-show-03', S.w, S.h),
}

/** 短视频制作 */
export const videoStock = {
  hero: p('xhdsg-vid-hero-01', 1200, 720),
  g1: p('xhdsg-vid-strip-01', G.w, G.h),
  g2: p('xhdsg-vid-strip-02', G.w, G.h),
  g3: p('xhdsg-vid-strip-03', G.w, G.h),
  l1: p('xhdsg-vid-layout-01', L.w, L.h),
  l2: p('xhdsg-vid-layout-02', L.w, L.h),
  l3: p('xhdsg-vid-layout-03', L.w, L.h),
  l4: p('xhdsg-vid-layout-04', L.w, L.h),
  l5: p('xhdsg-vid-layout-05', L.w, L.h),
  l6: p('xhdsg-vid-layout-06', L.w, L.h),
  p1: p('xhdsg-vid-pack-01', P.w, P.h),
  p2: p('xhdsg-vid-pack-02', P.w, P.h),
  p3: p('xhdsg-vid-pack-03', P.w, P.h),
  s1: p('xhdsg-vid-show-01', S.w, S.h),
  s2: p('xhdsg-vid-show-02', S.w, S.h),
  s3: p('xhdsg-vid-show-03', S.w, S.h),
}
