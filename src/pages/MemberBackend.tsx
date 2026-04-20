import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminAPI, fileAPI, userAPI, getApiErrorMessage, type AdminUserRow, type CurrentUser } from '../services/api'
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

const MemberBackend: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<CurrentUser | null>(null)
  const [accessDenied, setAccessDenied] = useState(false)
  const [error, setError] = useState('')
  const [files, setFiles] = useState<Array<{ filename: string; size: number }>>([])
  const [uploading, setUploading] = useState(false)
  const [tab, setTab] = useState<'workspace' | 'admin'>('workspace')

  const [adminLoading, setAdminLoading] = useState(false)
  const [adminTotal, setAdminTotal] = useState(0)
  const [adminPage, setAdminPage] = useState(1)
  const [adminRows, setAdminRows] = useState<AdminUserRow[]>([])
  const [kw, setKw] = useState('')
  const [sexFilter, setSexFilter] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const pageSize = 10

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
          limit: pageSize,
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
    [userInfo?.username, kw, sexFilter, start, end]
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
    const formData = new FormData()
    for (let i = 0; i < selected.length; i++) {
      formData.append('files', selected[i])
    }
    try {
      await fileAPI.uploadFiles(formData)
      const list = await fileAPI.listFiles()
      setFiles(list.files ?? [])
    } catch {
      setError('文件上传失败')
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

  const totalPages = Math.max(1, Math.ceil(adminTotal / pageSize))

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

      <div className="member-console-tabs">
        <button type="button" className={tab === 'workspace' ? 'is-active' : ''} onClick={() => setTab('workspace')}>
          工作台
        </button>
        {isSuperAdminUsername(userInfo.username) && (
          <button type="button" className={tab === 'admin' ? 'is-active' : ''} onClick={() => setTab('admin')}>
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
              <input type="file" multiple onChange={handleFileUpload} disabled={uploading} />
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}

      {tab === 'admin' && isSuperAdminUsername(userInfo.username) && (
        <div className="member-console-admin">
          <p className="member-console-devhint">
            系统管理员固定为登录名 <code>admin</code>（不区分大小写），不可通过此处授予或取消；生产环境请配合强密码与 HTTPS。
          </p>

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
          </form>

          {adminLoading ? (
            <p>加载列表…</p>
          ) : (
            <>
              <p className="member-console-count">
                共 <strong>{adminTotal}</strong> 位用户（第 {adminPage} / {totalPages} 页）
              </p>
              <table className="member-console-table member-console-table--admin">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>性别</th>
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
                          {u.is_admin ? '是（登录名 admin）' : '—'}
                        </span>
                      </td>
                      <td>{formatSystemDateTime(u.created_at)}</td>
                      <td>
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

              <div className="member-console-pagination">
                <button
                  type="button"
                  className="button button-light"
                  disabled={adminPage <= 1}
                  onClick={() => setAdminPage((p) => Math.max(1, p - 1))}
                >
                  上一页
                </button>
                <span>
                  {adminPage} / {totalPages}
                </span>
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
    </div>
  )
}

export default MemberBackend
