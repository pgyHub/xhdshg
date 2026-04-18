/**
 * Picsum 占位图：每个 seed 对应稳定且互不相同的图像（https://picsum.photos）。
 * 文案与「区块用途」对齐，不逐像素描述随机画面。
 */
export const stockPic = (seed: string, w: number, h: number) => {
  const W = Math.max(16, Math.round(w))
  const H = Math.max(16, Math.round(h))
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${W}/${H}`
}
