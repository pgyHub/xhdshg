import React, { useState, useEffect } from 'react'
import { userAPI, fileAPI } from '../services/api'
import { useNavigate } from 'react-router-dom'

const 会员后台: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [files, setFiles] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await userAPI.getCurrentUser()
        setUserInfo(data)
      } catch (err) {
        setError('获取用户信息失败，请重新登录')
        localStorage.removeItem('token')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUserInfo()
  }, [navigate])

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const data = await fileAPI.listFiles()
        setFiles(data.files)
      } catch (err) {
        console.error('获取文件列表失败:', err)
      }
    }
    fetchFiles()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      setUploading(true)
      setUploadProgress(0)
      const formData = new FormData()
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i])
      }
      try {
        await fileAPI.uploadFiles(formData)
        // 重新获取文件列表
        const data = await fileAPI.listFiles()
        setFiles(data.files)
      } catch (err) {
        setError('文件上传失败')
        console.error('文件上传失败:', err)
      } finally {
        setUploading(false)
        setUploadProgress(100)
        // 重置进度条
        setTimeout(() => setUploadProgress(0), 1000)
      }
    }
  }

  const handleFileDownload = async (filename: string) => {
    try {
      await fileAPI.downloadFile(filename)
      // 创建下载链接
      const link = document.createElement('a')
      link.href = `/api/files/download/${filename}`
      link.download = filename
      link.click()
    } catch (err) {
      setError('文件下载失败')
      console.error('文件下载失败:', err)
    }
  }

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <h2>会员后台</h2>
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      {userInfo && (
        <div style={{ marginBottom: '20px' }}>
          <h3>欢迎，{userInfo.username}</h3>
          <p>邮箱：{userInfo.email}</p>
          <p>会员状态：{userInfo.is_member ? '是' : '否'}</p>
        </div>
      )}
      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>个人信息管理</h3>
          <p>查看和修改个人信息</p>
          <button style={{ marginTop: '10px' }}>修改信息</button>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>业务数据管理</h3>
          <p>管理您的业务数据</p>
          <input 
            type="file" 
            multiple 
            onChange={handleFileUpload}
            style={{ marginTop: '10px', display: 'block' }}
            disabled={uploading}
          />
          {uploading && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                <div 
                  style={{ 
                    width: `${uploadProgress}%`, 
                    height: '100%', 
                    backgroundColor: '#4CAF50', 
                    borderRadius: '5px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
              <p style={{ marginTop: '5px', fontSize: '12px' }}>上传中...</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <h3>文件管理</h3>
        {files.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>文件名</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>大小</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>{file.filename}</td>
                  <td style={{ padding: '8px' }}>{(file.size / 1024).toFixed(2)} KB</td>
                  <td style={{ padding: '8px' }}>
                    <button onClick={() => handleFileDownload(file.filename)}>下载</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: '10px' }}>暂无文件</p>
        )}
      </div>
      <button 
        style={{ marginTop: '30px', padding: '10px 20px' }}
        onClick={handleLogout}
      >
        退出登录
      </button>
    </div>
  )
}

export default 会员后台
