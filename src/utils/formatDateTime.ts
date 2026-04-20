/**
 * 使用浏览器所在环境的系统区域与本地时区格式化时间（与操作系统时间/时区一致）。
 */
export function formatSystemDateTime(iso: string | undefined | null): string {
  if (iso == null || iso === '') return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return String(iso)
  return d.toLocaleString()
}
