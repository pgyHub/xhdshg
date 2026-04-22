/**
 * `public/` 目录下的静态资源路径。
 * 部署在子路径（Vite `base` 非 `/`）时，必须以 `import.meta.env.BASE_URL` 为前缀，
 * 否则以 `/` 开头的绝对路径会指向站点根目录，导致图片/视频 404。
 */
export function publicAsset(path: string): string {
  if (/^(https?:|data:|blob:)/i.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  const p = path.startsWith('/') ? path.slice(1) : path
  if (base === '/') return `/${p}`
  return base.endsWith('/') ? `${base}${p}` : `${base}/${p}`
}
