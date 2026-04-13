import React, { useState, useEffect } from 'react'
import { serviceAPI } from '../services/api'

const 短视频制作: React.FC = () => {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceAPI.getServices('短视频制作')
        setServices(data)
      } catch (err) {
        setError('获取服务数据失败')
        console.error('获取服务数据失败:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  return (
    <div>
      <h2>短视频制作</h2>
      <p>我们提供专业的短视频制作服务，包括企业宣传、产品推广、个人Vlog等。</p>
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      <div style={{ marginTop: '30px' }}>
        <h3>服务项目</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h4>{service.name}</h4>
                <p>价格：¥{service.price}</p>
                <p>包含：{service.description}</p>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <p>暂无服务数据</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default 短视频制作
