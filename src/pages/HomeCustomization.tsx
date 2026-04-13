import React, { useState, useEffect } from 'react'
import { serviceAPI } from '../services/api'

const 全屋定制: React.FC = () => {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceAPI.getServices('全屋定制')
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
      <h2>全屋定制</h2>
      <p>我们提供个性化的全屋定制服务，包括衣柜、橱柜、书柜等家具定制。</p>
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
      <div style={{ marginTop: '30px' }}>
        <h3>服务流程</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h4>1. 需求沟通</h4>
            <p>了解客户需求，制定定制方案</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h4>2. 设计方案</h4>
            <p>专业设计师设计定制方案</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h4>3. 生产安装</h4>
            <p>工厂生产，专业安装</p>
          </div>
        </div>
      </div>
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

export default 全屋定制
