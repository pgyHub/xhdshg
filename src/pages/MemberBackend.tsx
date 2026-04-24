import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminAPI, fileAPI, userAPI, getApiErrorMessage, type AdminUserRow, type CurrentUser, type BusinessRecordRow } from '../services/api'
import { formatSystemDateTime } from '../utils/formatDateTime'

function sexLabel(s: number | null | undefined): string {
  if (s === 1) return '男'
  if (s === 0) return '女'
  return '未填'
}

/** 无权限页展示：登录名为 admin 时文案显示「管理员」，避免与后台角色混淆 */
function displayNameForDenied(username: string): string {
  const t = username.trim()
  if (t.toLowerCase() === 'admin') return '管理员'
  return t
}

/** 与后端一致：仅登录名 admin（不区分大小写）为系统管理员 */
function isSuperAdminUsername(username: string): boolean {
  return username.trim().toLowerCase() === 'admin'
}

function parseSizeDetailsFromNotes(raw: string | null | undefined): {
  plainNote: string
  sizeItems: Array<{ label: string; value: string }>
} {
  const text = (raw || '').trim()
  if (!text) return { plainNote: '', sizeItems: [] }

  const marker = '尺寸:'
  const markerIdx = text.indexOf(marker)
  if (markerIdx < 0) return { plainNote: text, sizeItems: [] }

  const before = text.slice(0, markerIdx).replace(/[；\s]+$/, '').trim()
  const after = text.slice(markerIdx + marker.length).trim()
  const parts = after.split('，').map((s) => s.trim()).filter(Boolean)
  const sizeItems = parts.map((part) => {
    const idx = part.indexOf(':')
    if (idx < 0) return { label: part, value: '' }
    return { label: part.slice(0, idx).trim(), value: part.slice(idx + 1).trim() }
  })
  return { plainNote: before, sizeItems }
}

function classifySizeLabel(label: string): '上衣' | '裤子' | '其他' {
  const t = label.toLowerCase()
  if (
    t.includes('裤') ||
    t.includes('立裆') ||
    t.includes('总裆') ||
    t.includes('横裆') ||
    t.includes('前腰高') ||
    t.includes('膝围') ||
    t.includes('小腿围')
  ) {
    return '裤子'
  }
  if (
    t.includes('肩') ||
    t.includes('胸') ||
    t.includes('领') ||
    t.includes('衣') ||
    t.includes('袖') ||
    t.includes('背宽') ||
    t.includes('腰节长') ||
    t.includes('臂根')
  ) {
    return '上衣'
  }
  return '其他'
}

function groupSizeItems(items: Array<{ label: string; value: string }>): Record<'上衣' | '裤子' | '其他', Array<{ label: string; value: string }>> {
  const grouped: Record<'上衣' | '裤子' | '其他', Array<{ label: string; value: string }>> = {
    上衣: [],
    裤子: [],
    其他: []
  }
  items.forEach((item) => grouped[classifySizeLabel(item.label)].push(item))
  return grouped
}

type SizeRow = { part: string; net: string; garment: string; value: string }

function normalizePartLabel(label: string): string {
  return label.replace(/\((净|成衣)\)\(cm\)$/i, '(cm)').trim()
}

function buildSizeRows(items: Array<{ label: string; value: string }>): SizeRow[] {
  const map = new Map<string, SizeRow>()
  items.forEach((item) => {
    const key = normalizePartLabel(item.label)
    const row = map.get(key) ?? { part: key, net: '', garment: '', value: '' }
    if (item.label.includes('(净)')) row.net = item.value
    else if (item.label.includes('(成衣)')) row.garment = item.value
    else row.value = item.value
    map.set(key, row)
  })
  return Array.from(map.values())
}

function chunkRows(rows: SizeRow[], size = 6): SizeRow[][] {
  const out: SizeRow[][] = []
  for (let i = 0; i < rows.length; i += size) out.push(rows.slice(i, i + size))
  return out
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** 业务 CSV 模板：文件名用简短拼音，下载后从文件名即可辨认板块（与全站业态顺序一致） */
const MEMBER_CSV_TEMPLATES = [
  { label: '美发', file: 'meifa.csv' },
  { label: '彩妆', file: 'caizhuang.csv' },
  { label: '婚纱摄影', file: 'hunsha.csv' },
  { label: '服装定制', file: 'fuzhuang-dingzhi.csv' },
  { label: '全屋定制', file: 'quanwu-dingzhi.csv' },
  { label: '中餐馆', file: 'zhongcanting.csv' },
  { label: '短视频制作', file: 'duanshipin-zhizuo.csv' }
] as const

const MemberBackend: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<CurrentUser | null>(null)
  const [accessDenied, setAccessDenied] = useState(false)
  const [error, setError] = useState('')
  const [uploadResult, setUploadResult] = useState('')
  const [uploadReport, setUploadReport] = useState<{
    importedUsers: number
    importedBusinessRecords: number
    createdUsernames: string[]
    fileReports: Array<{ filename: string; imported_users: number; imported_business_records: number }>
  } | null>(null)
  const [files, setFiles] = useState<Array<{ filename: string; size: number }>>([])
  const [uploading, setUploading] = useState(false)
  const [tab, setTab] = useState<'workspace' | 'admin'>('workspace')
  const [detailUser, setDetailUser] = useState<AdminUserRow | null>(null)
  const [detailRecords, setDetailRecords] = useState<BusinessRecordRow[]>([])
  const [detailLoading, setDetailLoading] = useState(false)
  const [memberFileDetailName, setMemberFileDetailName] = useState<string | null>(null)
  const [memberFileDetailLoading, setMemberFileDetailLoading] = useState(false)
  const [memberFileDetailRecords, setMemberFileDetailRecords] = useState<BusinessRecordRow[]>([])
  const [sourceDetailRecord, setSourceDetailRecord] = useState<BusinessRecordRow | null>(null)
  const sourceDetailParsed = parseSizeDetailsFromNotes(sourceDetailRecord?.notes)
  const sourceDetailGrouped = groupSizeItems(sourceDetailParsed.sizeItems)
  const topRows = buildSizeRows(sourceDetailGrouped['上衣'])
  const pantsRows = buildSizeRows(sourceDetailGrouped['裤子'])
  const otherRows = buildSizeRows(sourceDetailGrouped['其他'])
  const orderedSizeRows = [...topRows, ...pantsRows, ...otherRows]
  const orderedSizeChunks = chunkRows(orderedSizeRows)

  const handlePrintSourceDetail = () => {
    if (!sourceDetailRecord) return
    const buildHorizontal = (rows: SizeRow[]) =>
      rows.length
        ? `${chunkRows(rows)
            .map((chunk) => {
              const hasNet = chunk.some((x) => x.net)
              const hasGarment = chunk.some((x) => x.garment)
              const hasValue = chunk.some((x) => x.value)
              return `<table class="size-horizontal"><thead><tr>${chunk
                .map((item) => `<th>${escapeHtml(item.part)}</th>`)
                .join('')}</tr></thead><tbody>${
                hasNet
                  ? `<tr>${chunk.map((item) => `<td>${escapeHtml(item.net || '—')}</td>`).join('')}</tr>`
                  : ''
              }${
                hasGarment
                  ? `<tr>${chunk.map((item) => `<td>${escapeHtml(item.garment || '—')}</td>`).join('')}</tr>`
                  : ''
              }${
                hasValue
                  ? `<tr>${chunk.map((item) => `<td>${escapeHtml(item.value || '—')}</td>`).join('')}</tr>`
                  : ''
              }</tbody></table>`
            })
            .join('')}`
        : ''
    const sizeTable = sourceDetailParsed.sizeItems.length
      ? `<h3>尺寸明细</h3>${buildHorizontal(orderedSizeRows)}`
      : ''
    const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>来源文件详情</title>
  <style>
    body { font-family: "Microsoft YaHei", "PingFang SC", sans-serif; padding: 24px; color: #1f2937; }
    h2 { margin: 0 0 12px; font-size: 24px; }
    p { margin: 6px 0; font-size: 16px; line-height: 1.6; }
    h3 { margin: 16px 0 8px; font-size: 18px; }
    table { width: 100%; border-collapse: collapse; margin-top: 6px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-size: 15px; }
    th { background: #f8fafc; }
  </style>
</head>
<body>
  <h2>来源文件详情</h2>
  <p><strong>来源文件：</strong>${escapeHtml(sourceDetailRecord.source_file || '—')}</p>
  <p><strong>业务模块：</strong>${escapeHtml(sourceDetailRecord.module || '—')}</p>
  <p><strong>订单项目：</strong>${escapeHtml(sourceDetailRecord.project || '—')}</p>
  <p><strong>客户姓名：</strong>${escapeHtml(sourceDetailRecord.customer_name || '—')}</p>
  <p><strong>联系方式：</strong>${escapeHtml(sourceDetailRecord.contact || '—')}</p>
  <p><strong>预约时间：</strong>${escapeHtml(sourceDetailRecord.appointment_time || '—')}</p>
  <p><strong>单价/数量/小计：</strong>${escapeHtml(`${sourceDetailRecord.unit_price ?? '—'} / ${sourceDetailRecord.quantity ?? '—'} / ${sourceDetailRecord.subtotal ?? '—'}`)}</p>
  <p><strong>备注：</strong>${escapeHtml(sourceDetailParsed.plainNote || '—')}</p>
  ${sizeTable}
</body>
</html>`
    const frame = document.createElement('iframe')
    frame.style.position = 'fixed'
    frame.style.right = '0'
    frame.style.bottom = '0'
    frame.style.width = '0'
    frame.style.height = '0'
    frame.style.border = '0'
    frame.setAttribute('aria-hidden', 'true')
    frame.srcdoc = html
    frame.onload = () => {
      const w = frame.contentWindow
      if (!w) return
      w.focus()
      w.print()
      window.setTimeout(() => {
        frame.remove()
      }, 800)
    }
    document.body.appendChild(frame)
  }

  const [adminLoading, setAdminLoading] = useState(false)
  const [adminTotal, setAdminTotal] = useState(0)
  const [adminPage, setAdminPage] = useState(1)
  const [adminPageSize, setAdminPageSize] = useState(10)
  const [adminRows, setAdminRows] = useState<AdminUserRow[]>([])
  const [kw, setKw] = useState('')
  const [sexFilter, setSexFilter] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const loadUser = useCallback(async () => {
    const data = await userAPI.getCurrentUser()
    setUserInfo(data)
    if (!data.is_member && !isSuperAdminUsername(data.username)) {
      setAccessDenied(true)
      return
    }
    setAccessDenied(false)
    try {
      const list = await fileAPI.listFiles()
      setFiles(list.files ?? [])
    } catch {
      setError('加载文件列表失败')
    }
  }, [])

  useEffect(() => {
    const run = async () => {
      setError('')
      try {
        await loadUser()
      } catch {
        localStorage.removeItem('token')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [loadUser, navigate])

  const fetchAdminList = useCallback(
    async (
      pageNum: number,
      overrides?: { keyword?: string; sex?: string; start?: string; end?: string }
    ) => {
      if (!userInfo || !isSuperAdminUsername(userInfo.username)) return
      setAdminLoading(true)
      setError('')
      const keyword = overrides === undefined ? kw : overrides.keyword !== undefined ? overrides.keyword : kw
      const sx = overrides === undefined ? sexFilter : overrides.sex !== undefined ? overrides.sex : sexFilter
      const st = overrides === undefined ? start : overrides.start !== undefined ? overrides.start : start
      const en = overrides === undefined ? end : overrides.end !== undefined ? overrides.end : end
      try {
        const res = await adminAPI.listUsers({
          page: pageNum,
          limit: adminPageSize,
          keyword: keyword || undefined,
          sex: sx || undefined,
          start: st || undefined,
          end: en || undefined
        })
        setAdminTotal(res.total)
        setAdminRows(res.items)
      } catch (err) {
        setError(getApiErrorMessage(err))
      } finally {
        setAdminLoading(false)
      }
    },
    [userInfo?.username, kw, sexFilter, start, end, adminPageSize]
  )

  useEffect(() => {
    if (tab === 'admin' && userInfo && isSuperAdminUsername(userInfo.username)) {
      fetchAdminList(adminPage)
    }
  }, [tab, userInfo?.username, adminPage, fetchAdminList])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected?.length) return
    setUploading(true)
    setError('')
    setUploadResult('')
    setUploadReport(null)
    const formData = new FormData()
    for (let i = 0; i < selected.length; i++) {
      formData.append('files', selected[i])
    }
    try {
      const res = await fileAPI.uploadFiles(formData)
      const list = await fileAPI.listFiles()
      setFiles(list.files ?? [])
      setUploadResult(res.message || '上传完成')
      setUploadReport({
        importedUsers: res.imported_users || 0,
        importedBusinessRecords: res.imported_business_records || 0,
        createdUsernames: res.created_usernames || [],
        fileReports: (res.file_import_reports || []).map((x) => ({
          filename: x.filename,
          imported_users: x.imported_users,
          imported_business_records: x.imported_business_records || 0
        }))
      })
      if (userInfo && isSuperAdminUsername(userInfo.username)) {
        setKw('')
        setSexFilter('')
        setStart('')
        setEnd('')
        setAdminPage(1)
        await fetchAdminList(1, { keyword: '', sex: '', start: '', end: '' })
      }
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setUploading(false)
    }
  }

  const patchFlags = async (id: number, body: Partial<{ is_member: boolean }>) => {
    setError('')
    try {
      const u = await adminAPI.patchUser(id, body)
      setAdminRows((rows) => rows.map((r) => (r.id === u.id ? u : r)))
      if (userInfo?.id === u.id) {
        setUserInfo(u)
      }
    } catch (err) {
      setError(getApiErrorMessage(err))
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('确定删除该用户？')) return
    setError('')
    try {
      await adminAPI.deleteUser(id)
      await fetchAdminList(adminPage)
    } catch (err) {
      setError(getApiErrorMessage(err))
    }
  }

  const handleViewDetails = async (u: AdminUserRow) => {
    if (detailUser?.id === u.id) {
      setDetailUser(null)
      setDetailRecords([])
      return
    }
    setDetailLoading(true)
    setError('')
    try {
      const res = await adminAPI.getUserDetails(u.id)
      setDetailUser(res.user)
      setDetailRecords(res.records || [])
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setDetailLoading(false)
    }
  }

  const handleDeleteFile = async (filename: string) => {
    if (!window.confirm(`确定删除文件「${filename}」？`)) return
    setError('')
    try {
      const res = await fileAPI.deleteFile(filename)
      const list = await fileAPI.listFiles()
      setFiles(list.files ?? [])
      const removedUsers = res.deleted_users || 0
      const removedRecords = res.deleted_business_records || 0
      const usersText = removedUsers > 0 ? `，同步删除账号 ${removedUsers} 个` : ''
      const recordsText = removedRecords > 0 ? `，同步删除业务明细 ${removedRecords} 条` : ''
      setUploadResult(`文件已删除：${filename}${usersText}${recordsText}`)
      if (userInfo && isSuperAdminUsername(userInfo.username)) {
        setAdminPage(1)
        await fetchAdminList(1)
      }
    } catch (err) {
      setError(getApiErrorMessage(err))
    }
  }

  const handleViewMyFileDetails = async (filename: string) => {
    if (memberFileDetailName === filename) {
      setMemberFileDetailName(null)
      setMemberFileDetailRecords([])
      return
    }
    setMemberFileDetailLoading(true)
    setError('')
    try {
      const res = await userAPI.getMyDetails(filename)
      setMemberFileDetailName(filename)
      setMemberFileDetailRecords(res.records || [])
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setMemberFileDetailLoading(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(adminTotal / adminPageSize))
  const pageNumbers = (() => {
    const maxVisible = 5
    if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const startPage = Math.max(1, Math.min(adminPage - 2, totalPages - maxVisible + 1))
    return Array.from({ length: maxVisible }, (_, i) => startPage + i)
  })()

  if (loading) {
    return (
      <div className="member-console member-console--loading">
        <p>加载中…</p>
      </div>
    )
  }

  if (accessDenied && userInfo) {
    return (
      <div className="member-console member-console--denied">
        <div className="member-console-card">
          <h2>暂无权限进入会员后台</h2>
          <p>
            仅<strong>会员</strong>或<strong>管理员</strong>可使用会员中心与资料上传等功能。当前账号「{displayNameForDenied(userInfo.username)}」为普通账号。
          </p>
          <p className="member-console-hint">如需开通，请联系平台管理员在后台为您勾选「会员」权限。</p>
          <div className="member-console-actions">
            <Link to="/" className="button button-primary">
              返回首页
            </Link>
            <button type="button" className="button button-light" onClick={handleLogout}>
              切换账号
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!userInfo) {
    return null
  }

  return (
    <div className="member-console">
      <header className="member-console-header">
        <div>
          <span className="section-tag">会员中心</span>
          <h2>小红点生活馆 · 后台</h2>
          <p className="member-console-sub">
            {isSuperAdminUsername(userInfo.username) ? '管理员' : '会员'} · {userInfo.username}
            {isSuperAdminUsername(userInfo.username) && userInfo.is_member ? ' · 同时享有会员权益' : ''}
          </p>
        </div>
        <div className="member-console-header-actions">
          <Link to="/" className="button button-light">
            返回首页
          </Link>
          <button type="button" className="button button-primary" onClick={handleLogout}>
            退出登录
          </button>
        </div>
      </header>

      {error && <div className="status-error member-console-error">{error}</div>}
      {uploadResult && <div className="status-info member-console-error">{uploadResult}</div>}
      {uploadReport && (
        <section className="member-console-card member-console-upload-report">
          <h3>导入结果明细</h3>
          <p className="member-console-muted">本次新增业务明细：{uploadReport.importedBusinessRecords} 条</p>
          {uploadReport.fileReports.length > 0 && (
            <table className="member-console-table">
              <thead>
                <tr>
                  <th>文件名</th>
                  <th>新增业务明细</th>
                </tr>
              </thead>
              <tbody>
                {uploadReport.fileReports.map((x) => (
                  <tr key={x.filename}>
                    <td>{x.filename}</td>
                    <td>{x.imported_business_records}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {uploadReport.createdUsernames.length > 0 && (
            <p className="member-console-muted">
              新增登录账号：{uploadReport.createdUsernames.join('、')}
            </p>
          )}
        </section>
      )}

      <div className="member-console-tabs">
        <button type="button" className={tab === 'workspace' ? 'is-active' : ''} onClick={() => setTab('workspace')}>
          工作台
        </button>
        {isSuperAdminUsername(userInfo.username) && (
          <button
            type="button"
            className={tab === 'admin' ? 'is-active' : ''}
            onClick={() => {
              setTab('admin')
              setKw('')
              setSexFilter('')
              setStart('')
              setEnd('')
              setAdminPage(1)
              void fetchAdminList(1, { keyword: '', sex: '', start: '', end: '' })
            }}
          >
            会员管理
          </button>
        )}
      </div>

      {tab === 'workspace' && (
        <>
          <div className="member-console-grid">
            <section className="member-console-card">
              <h3>账号信息</h3>
              <ul className="member-console-meta">
                <li>
                  <span>用户名</span>
                  <strong>{userInfo.username}</strong>
                </li>
                <li>
                  <span>邮箱</span>
                  <strong>{userInfo.email}</strong>
                </li>
                <li>
                  <span>角色</span>
                  <strong>
                    {[
                      isSuperAdminUsername(userInfo.username) ? '管理员' : '',
                      userInfo.is_member ? '会员' : '',
                      !isSuperAdminUsername(userInfo.username) && !userInfo.is_member ? '普通用户' : ''
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </strong>
                </li>
                <li>
                  <span>注册时间</span>
                  <strong>{formatSystemDateTime(userInfo.created_at)}</strong>
                </li>
              </ul>
            </section>

            <section className="member-console-card">
              <h3>业务资料上传</h3>
              <p className="member-console-muted">文件存储在服务端上传目录，便于顾问与您同步资料（需会员或管理员）。</p>
              <p className="member-console-muted">
                上传 CSV 用于登记业务订单：明细默认归属当前登录会员，无需填写用户名；多行可表示同一客户在不同预约时段的订单。
              </p>
              <div className="member-console-upload-toolbar">
                <p className="member-console-muted member-console-upload-template-list">
                  分业态详细模板（下载文件名即业务标识）：
                  {MEMBER_CSV_TEMPLATES.map((t, i) => (
                    <React.Fragment key={t.file}>
                      {i > 0 ? ' · ' : ' '}
                      <a className="member-console-link" href={`/templates/${t.file}`} download={t.file}>
                        {t.label}
                      </a>
                    </React.Fragment>
                  ))}
                </p>
                <label className="member-console-upload-input">
                  <span>文件上传：</span>
                  <input type="file" multiple onChange={handleFileUpload} disabled={uploading} />
                </label>
              </div>
              {uploading && <p className="member-console-muted">上传中…</p>}
            </section>
          </div>

          <section className="member-console-card member-console-wide">
            <h3>已上传文件</h3>
            {files.length === 0 ? (
              <p className="member-console-muted">暂无文件</p>
            ) : (
              <table className="member-console-table">
                <thead>
                  <tr>
                    <th>文件名</th>
                    <th>大小</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((f) => (
                    <tr key={f.filename}>
                      <td>{f.filename}</td>
                      <td>{(f.size / 1024).toFixed(1)} KB</td>
                      <td>
                        <a
                          className="member-console-link"
                          href={`/api/files/download/${encodeURIComponent(f.filename)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          下载
                        </a>
                        {' · '}
                        <button
                          type="button"
                          className="button button-light member-console-mini"
                          onClick={() => handleViewMyFileDetails(f.filename)}
                        >
                          {memberFileDetailName === f.filename ? '收起详情' : '详情'}
                        </button>
                        {' · '}
                        <button
                          type="button"
                          className="button button-light member-console-mini danger"
                          onClick={() => handleDeleteFile(f.filename)}
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {(memberFileDetailLoading || memberFileDetailName) && (
            <section className="member-console-card member-console-detail-card">
              <h3>账号业务详情{memberFileDetailName ? ` · ${memberFileDetailName}` : ''}</h3>
              {memberFileDetailLoading ? (
                <p className="member-console-muted">加载详情中…</p>
              ) : memberFileDetailRecords.length === 0 ? (
                <p className="member-console-muted">暂无业务明细</p>
              ) : (
                <table className="member-console-table">
                  <thead>
                    <tr>
                      <th>业务模块</th>
                      <th>订单项目</th>
                      <th>单价</th>
                      <th>数量</th>
                      <th>小计</th>
                      <th>客户</th>
                      <th>联系方式</th>
                      <th>预约时间</th>
                      <th>来源文件</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberFileDetailRecords.map((r) => (
                      <tr key={`member-${r.id}`}>
                        <td>{r.module}</td>
                        <td>{r.project}</td>
                        <td>{r.unit_price ?? '—'}</td>
                        <td>{r.quantity ?? '—'}</td>
                        <td>{r.subtotal ?? '—'}</td>
                        <td>{r.customer_name || '—'}</td>
                        <td>{r.contact || '—'}</td>
                        <td>{r.appointment_time || '—'}</td>
                        <td>
                          {r.source_file ? (
                            <button
                              type="button"
                              className="member-console-link member-console-source-trigger"
                              onClick={() => setSourceDetailRecord(r)}
                            >
                              {r.source_file}
                            </button>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}
        </>
      )}

      {tab === 'admin' && isSuperAdminUsername(userInfo.username) && (
        <div className="member-console-admin">
          <p className="member-console-devhint">
            系统管理员固定为登录名 <code>admin</code>（不区分大小写），不可通过此处授予或取消；生产环境请配合强密码与 HTTPS。
          </p>

          <section className="member-console-card">
            <h3>会员资料导入</h3>
            <p className="member-console-muted">
              上传 CSV 登记业务订单：默认归属当前登录账号。若文件中仍含「用户名」列，则按该列关联已有会员账号。
            </p>
            <div className="member-console-upload-toolbar">
              <p className="member-console-muted member-console-upload-template-list">
                分业态详细模板（下载文件名即业务标识）：
                {MEMBER_CSV_TEMPLATES.map((t, i) => (
                  <React.Fragment key={t.file}>
                    {i > 0 ? ' · ' : ' '}
                    <a className="member-console-link" href={`/templates/${t.file}`} download={t.file}>
                      {t.label}
                    </a>
                  </React.Fragment>
                ))}
              </p>
              <label className="member-console-upload-input">
                <span>文件上传：</span>
                <input type="file" multiple onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>
            {uploading && <p className="member-console-muted">上传中…</p>}
          </section>

          <section className="member-console-card">
            <h3>已上传资料</h3>
            {files.length === 0 ? (
              <p className="member-console-muted">暂无文件</p>
            ) : (
              <table className="member-console-table">
                <thead>
                  <tr>
                    <th>文件名</th>
                    <th>大小</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((f) => (
                    <tr key={f.filename}>
                      <td>{f.filename}</td>
                      <td>{(f.size / 1024).toFixed(1)} KB</td>
                      <td>
                        <a
                          className="member-console-link"
                          href={`/api/files/download/${encodeURIComponent(f.filename)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          下载
                        </a>
                        {' · '}
                        <button
                          type="button"
                          className="button button-light member-console-mini danger"
                          onClick={() => handleDeleteFile(f.filename)}
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <form
            className="member-console-filters"
            onSubmit={(e) => {
              e.preventDefault()
              setAdminPage(1)
              fetchAdminList(1)
            }}
          >
            <label>
              用户名 / 邮箱
              <input value={kw} onChange={(e) => setKw(e.target.value)} placeholder="模糊搜索" />
            </label>
            <label>
              性别
              <select value={sexFilter} onChange={(e) => setSexFilter(e.target.value)}>
                <option value="">全部</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </label>
            <label>
              注册起
              <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
            </label>
            <label>
              注册止
              <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
            </label>
            <button type="submit" className="button button-primary">
              筛选
            </button>
            <button
              type="button"
              className="button button-light"
              onClick={() => {
                setKw('')
                setSexFilter('')
                setStart('')
                setEnd('')
                setAdminPage(1)
                fetchAdminList(1, { keyword: '', sex: '', start: '', end: '' })
              }}
            >
              清除
            </button>
            <button
              type="button"
              className="button button-light"
              onClick={() => {
                fetchAdminList(adminPage)
              }}
            >
              刷新列表
            </button>
            <label>
              每页
              <select
                value={adminPageSize}
                onChange={(e) => {
                  const size = Number(e.target.value)
                  setAdminPageSize(size)
                  setAdminPage(1)
                }}
              >
                <option value={10}>10 条</option>
                <option value={20}>20 条</option>
                <option value={50}>50 条</option>
              </select>
            </label>
          </form>

          {adminLoading ? (
            <p>加载列表…</p>
          ) : (
            <>
              <p className="member-console-count">
                共 <strong>{adminTotal}</strong> 位用户（每页 {adminPageSize} 条，第 {adminPage} / {totalPages} 页）
              </p>
              <table className="member-console-table member-console-table--admin">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>性别</th>
                    <th>爱好/需求</th>
                    <th>会员</th>
                    <th>系统管理员</th>
                    <th>注册时间</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {adminRows.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{sexLabel(u.sex)}</td>
                      <td>{u.hobby || '—'}</td>
                      <td>
                        <button
                          type="button"
                          className="button button-light member-console-mini"
                          onClick={() => patchFlags(u.id, { is_member: !u.is_member })}
                        >
                          {u.is_member ? '取消会员' : '设为会员'}
                        </button>
                      </td>
                      <td>
                        <span className="member-console-muted">
                          {u.is_admin ? '是' : '否'}
                        </span>
                      </td>
                      <td>{formatSystemDateTime(u.created_at)}</td>
                      <td>
                        <button
                          type="button"
                          className="button button-light member-console-mini"
                          onClick={() => handleViewDetails(u)}
                        >
                          {detailUser?.id === u.id ? '收起详情' : '详情'}
                        </button>
                        {' '}
                        <button
                          type="button"
                          className="button button-light member-console-mini danger"
                          disabled={u.id === userInfo.id || isSuperAdminUsername(u.username)}
                          onClick={() => handleDelete(u.id)}
                        >
                          删除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {(detailLoading || detailUser) && (
                <section className="member-console-card member-console-detail-card">
                  <h3>账号业务详情{detailUser ? ` · ${detailUser.username}` : ''}</h3>
                  {detailLoading ? (
                    <p className="member-console-muted">加载详情中…</p>
                  ) : detailRecords.length === 0 ? (
                    <p className="member-console-muted">暂无业务明细</p>
                  ) : (
                    <table className="member-console-table">
                      <thead>
                        <tr>
                          <th>业务模块</th>
                          <th>订单项目</th>
                          <th>单价</th>
                          <th>数量</th>
                          <th>小计</th>
                          <th>客户</th>
                          <th>联系方式</th>
                          <th>预约时间</th>
                          <th>来源文件</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailRecords.map((r) => (
                          <tr key={r.id}>
                            <td>{r.module}</td>
                            <td>{r.project}</td>
                            <td>{r.unit_price ?? '—'}</td>
                            <td>{r.quantity ?? '—'}</td>
                            <td>{r.subtotal ?? '—'}</td>
                            <td>{r.customer_name || '—'}</td>
                            <td>{r.contact || '—'}</td>
                            <td>{r.appointment_time || '—'}</td>
                            <td>
                              {r.source_file ? (
                                <button
                                  type="button"
                                  className="member-console-link member-console-source-trigger"
                                  onClick={() => setSourceDetailRecord(r)}
                                >
                                  {r.source_file}
                                </button>
                              ) : (
                                '—'
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </section>
              )}

              {sourceDetailRecord && (
                <div className="member-console-modal-mask" onClick={() => setSourceDetailRecord(null)}>
                  <section
                    className="member-console-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="来源文件详情"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <header className="member-console-modal-head">
                      <h4>来源文件详情</h4>
                      <div className="member-console-modal-actions">
                        <button type="button" className="button button-light member-console-mini" onClick={handlePrintSourceDetail}>
                          打印
                        </button>
                        <button type="button" className="member-console-modal-close" onClick={() => setSourceDetailRecord(null)}>
                          ×
                        </button>
                      </div>
                    </header>
                    <div className="member-console-modal-body">
                      <p><strong>来源文件：</strong>{sourceDetailRecord.source_file || '—'}</p>
                      <p><strong>业务模块：</strong>{sourceDetailRecord.module || '—'}</p>
                      <p><strong>订单项目：</strong>{sourceDetailRecord.project || '—'}</p>
                      <p><strong>客户姓名：</strong>{sourceDetailRecord.customer_name || '—'}</p>
                      <p><strong>联系方式：</strong>{sourceDetailRecord.contact || '—'}</p>
                      <p><strong>预约时间：</strong>{sourceDetailRecord.appointment_time || '—'}</p>
                      <p><strong>单价/数量/小计：</strong>
                        {`${sourceDetailRecord.unit_price ?? '—'} / ${sourceDetailRecord.quantity ?? '—'} / ${sourceDetailRecord.subtotal ?? '—'}`}
                      </p>
                      <p><strong>备注：</strong>{sourceDetailParsed.plainNote || '—'}</p>
                      {sourceDetailParsed.sizeItems.length > 0 && (
                        <div>
                          <p><strong>尺寸明细：</strong></p>
                          <section>
                            {orderedSizeChunks.map((chunk, idx) => {
                              const hasNet = chunk.some((x) => x.net)
                              const hasGarment = chunk.some((x) => x.garment)
                              const hasValue = chunk.some((x) => x.value)
                              return (
                                <table key={`size-chunk-${idx}`} className="member-console-table member-console-size-table member-console-size-horizontal">
                                  <thead>
                                    <tr>{chunk.map((item) => <th key={`size-head-${idx}-${item.part}`}>{item.part}</th>)}</tr>
                                  </thead>
                                  <tbody>
                                    {hasNet && <tr>{chunk.map((item) => <td key={`size-net-${idx}-${item.part}`}>{item.net || '—'}</td>)}</tr>}
                                    {hasGarment && <tr>{chunk.map((item) => <td key={`size-gar-${idx}-${item.part}`}>{item.garment || '—'}</td>)}</tr>}
                                    {hasValue && <tr>{chunk.map((item) => <td key={`size-val-${idx}-${item.part}`}>{item.value || '—'}</td>)}</tr>}
                                  </tbody>
                                </table>
                              )
                            })}
                          </section>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              )}

              <div className="member-console-pagination">
                <button
                  type="button"
                  className="button button-light"
                  disabled={adminPage <= 1}
                  onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                >
                  上一页
                </button>
                <div className="member-console-page-numbers">
                  {pageNumbers.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`button button-light member-console-mini ${p === adminPage ? 'is-active' : ''}`}
                      onClick={() => setAdminPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="button button-light"
                  disabled={adminPage >= totalPages}
                  onClick={() => setAdminPage((p) => p + 1)}
                >
                  下一页
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {sourceDetailRecord && tab !== 'admin' && (
        <div className="member-console-modal-mask" onClick={() => setSourceDetailRecord(null)}>
          <section
            className="member-console-modal"
            role="dialog"
            aria-modal="true"
            aria-label="来源文件详情"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="member-console-modal-head">
              <h4>来源文件详情</h4>
              <div className="member-console-modal-actions">
                <button type="button" className="button button-light member-console-mini" onClick={handlePrintSourceDetail}>
                  打印
                </button>
                <button type="button" className="member-console-modal-close" onClick={() => setSourceDetailRecord(null)}>
                  ×
                </button>
              </div>
            </header>
            <div className="member-console-modal-body">
              <p><strong>来源文件：</strong>{sourceDetailRecord.source_file || '—'}</p>
              <p><strong>业务模块：</strong>{sourceDetailRecord.module || '—'}</p>
              <p><strong>订单项目：</strong>{sourceDetailRecord.project || '—'}</p>
              <p><strong>客户姓名：</strong>{sourceDetailRecord.customer_name || '—'}</p>
              <p><strong>联系方式：</strong>{sourceDetailRecord.contact || '—'}</p>
              <p><strong>预约时间：</strong>{sourceDetailRecord.appointment_time || '—'}</p>
              <p><strong>单价/数量/小计：</strong>
                {`${sourceDetailRecord.unit_price ?? '—'} / ${sourceDetailRecord.quantity ?? '—'} / ${sourceDetailRecord.subtotal ?? '—'}`}
              </p>
              <p><strong>备注：</strong>{sourceDetailParsed.plainNote || '—'}</p>
              {sourceDetailParsed.sizeItems.length > 0 && (
                <div>
                  <p><strong>尺寸明细：</strong></p>
                  <section>
                    {orderedSizeChunks.map((chunk, idx) => {
                      const hasNet = chunk.some((x) => x.net)
                      const hasGarment = chunk.some((x) => x.garment)
                      const hasValue = chunk.some((x) => x.value)
                      return (
                        <table key={`size-chunk-workspace-${idx}`} className="member-console-table member-console-size-table member-console-size-horizontal">
                          <thead>
                            <tr>{chunk.map((item) => <th key={`size-head-workspace-${idx}-${item.part}`}>{item.part}</th>)}</tr>
                          </thead>
                          <tbody>
                            {hasNet && <tr>{chunk.map((item) => <td key={`size-net-workspace-${idx}-${item.part}`}>{item.net || '—'}</td>)}</tr>}
                            {hasGarment && <tr>{chunk.map((item) => <td key={`size-gar-workspace-${idx}-${item.part}`}>{item.garment || '—'}</td>)}</tr>}
                            {hasValue && <tr>{chunk.map((item) => <td key={`size-val-workspace-${idx}-${item.part}`}>{item.value || '—'}</td>)}</tr>}
                          </tbody>
                        </table>
                      )
                    })}
                  </section>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default MemberBackend
