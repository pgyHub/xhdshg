import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

// 粒子动画组件
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
        ctx.fill()
      })
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

// AI 神经网络可视化
const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const layers = [
      { nodes: 4, label: '输入层' },
      { nodes: 6, label: '隐藏层1' },
      { nodes: 5, label: '隐藏层2' },
      { nodes: 4, label: '隐藏层3' },
      { nodes: 3, label: '输出层' }
    ]

    const nodePositions: { x: number; y: number }[][] = []
    const layerSpacing = canvas.width / (layers.length + 1)

    layers.forEach((layer, i) => {
      const positions: { x: number; y: number }[] = []
      const nodeSpacing = canvas.height / (layer.nodes + 1)
      for (let j = 0; j < layer.nodes; j++) {
        positions.push({
          x: layerSpacing * (i + 1),
          y: nodeSpacing * (j + 1)
        })
      }
      nodePositions.push(positions)
    })

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制连接线
      for (let i = 0; i < nodePositions.length - 1; i++) {
        nodePositions[i].forEach((node) => {
          nodePositions[i + 1].forEach((nextNode) => {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(nextNode.x, nextNode.y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 + Math.sin(frame * 0.02 + i * 0.5) * 0.1})`
            ctx.lineWidth = 1
            ctx.stroke()
          })
        })
      }

      // 绘制节点
      nodePositions.forEach((layer, li) => {
        layer.forEach((node, ni) => {
          const pulse = Math.sin(frame * 0.03 + li * 0.3 + ni * 0.2) * 0.3 + 0.7
          const radius = li === 0 || li === nodePositions.length - 1 ? 8 : 6

          ctx.beginPath()
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 2)
          gradient.addColorStop(0, `rgba(0, 212, 255, ${pulse})`)
          gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
          ctx.fillStyle = gradient
          ctx.fill()

          ctx.beginPath()
          ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 255, 200, ${pulse})`
          ctx.fill()
        })
      })

      frame++
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return <canvas ref={canvasRef} className="neural-canvas" />
}

const Dashboard = () => {
  const radarRef = useRef<HTMLDivElement>(null)
  const predictRef = useRef<HTMLDivElement>(null)
  const clusterRef = useRef<HTMLDivElement>(null)
  const anomalyRef = useRef<HTMLDivElement>(null)
  const realTimeRef = useRef<HTMLDivElement>(null)
  const correlationRef = useRef<HTMLDivElement>(null)

  const [aiStats] = useState({
    modelAccuracy: 96.8,
    dataProcessed: 1289562,
    predictions: 2847,
    anomalies: 12
  })

  useEffect(() => {
    // AI能力雷达图
    if (radarRef.current) {
      const chart = echarts.init(radarRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        radar: {
          indicator: [
            { name: '智能推荐', max: 100 },
            { name: '销售预测', max: 100 },
            { name: '客户分群', max: 100 },
            { name: '异常检测', max: 100 },
            { name: '趋势分析', max: 100 },
            { name: '智能定价', max: 100 }
          ],
          axisName: { color: '#7ea3ff', fontSize: 11 },
          splitArea: { areaStyle: { color: ['rgba(0, 212, 255, 0.05)', 'rgba(0, 212, 255, 0.1)'] } },
          splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
          axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.3)' } }
        },
        series: [
          {
            type: 'radar',
            data: [{ value: [92, 88, 95, 78, 90, 85], name: 'AI能力指数' }],
            lineStyle: { color: '#00d4ff', width: 2 },
            areaStyle: { color: 'rgba(0, 212, 255, 0.3)' },
            itemStyle: { color: '#00d4ff' }
          }
        ]
      })
    }

    // 智能预测曲线
    if (predictRef.current) {
      const chart = echarts.init(predictRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 40, right: 15, top: 20, bottom: 25 },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: { color: '#7ea3ff', fontSize: 10 },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月(预测)', '8月(预测)']
        },
        yAxis: { type: 'value', axisLabel: { color: '#7ea3ff', fontSize: 10 }, splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } } },
        series: [
          {
            name: '实际值',
            type: 'line',
            smooth: true,
            data: [32, 45, 41, 56, 49, 63, null, null],
            lineStyle: { color: '#00d4ff', width: 2 },
            itemStyle: { color: '#00d4ff' }
          },
          {
            name: 'AI预测值',
            type: 'line',
            smooth: true,
            data: [32, 45, 41, 56, 49, 63, 71, 82],
            lineStyle: { color: '#ff6b9d', width: 2, type: 'dashed' },
            itemStyle: { color: '#ff6b9d' },
            areaStyle: { color: 'rgba(255, 107, 157, 0.1)' }
          },
          {
            name: '置信区间',
            type: 'line',
            smooth: true,
            stack: 'confidence',
            data: [38, 53, 48, 64, 57, 72, 80, 92],
            lineStyle: { opacity: 0 },
            areaStyle: { color: 'rgba(0, 212, 255, 0.1)' }
          }
        ]
      })
    }

    // 客户聚类分析
    if (clusterRef.current) {
      const chart = echarts.init(clusterRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'scatter',
            symbolSize: 12,
            data: [
              [10, 20], [15, 35], [25, 15], [30, 40], [45, 25],
              [55, 55], [60, 30], [70, 60], [75, 45], [85, 70],
              [20, 50], [35, 60], [50, 35], [65, 50], [80, 25],
              [12, 45], [40, 70], [55, 65], [70, 35], [90, 80]
            ],
            itemStyle: { color: '#00d4ff' }
          },
          {
            type: 'scatter',
            symbolSize: 18,
            data: [[50, 50]],
            itemStyle: { color: '#ff6b9d', shadowBlur: 20, shadowColor: '#ff6b9d' }
          }
        ],
        xAxis: { type: 'value', axisLabel: { show: false }, splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } } },
        yAxis: { type: 'value', axisLabel: { show: false }, splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } } }
      })
    }

    // 异常检测
    if (anomalyRef.current) {
      const chart = echarts.init(anomalyRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 15, bottom: 20 },
        xAxis: { type: 'category', axisLabel: { color: '#7ea3ff', fontSize: 9 }, data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'] },
        yAxis: { type: 'value', axisLabel: { color: '#7ea3ff', fontSize: 9 }, splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } } },
        series: [
          {
            type: 'line',
            smooth: true,
            data: [20, 15, 25, 80, 65, 45, 30],
            lineStyle: { color: '#00d4ff', width: 2 },
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
              { offset: 1, color: 'rgba(0, 212, 255, 0)' }
            ]) },
            markPoint: {
              data: [{ coord: [2, 85], value: '异常', itemStyle: { color: '#ff4757' } }]
            }
          }
        ]
      })
    }

    // 实时数据流
    if (realTimeRef.current) {
      const chart = echarts.init(realTimeRef.current)
      const data: number[] = []
      for (let i = 0; i < 20; i++) {
        data.push(Math.random() * 100)
      }
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 30, right: 10, top: 10, bottom: 20 },
        xAxis: { type: 'category', axisLabel: { show: false }, data: data.map((_, i) => i.toString()) },
        yAxis: { type: 'value', axisLabel: { show: false }, splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.1)' } } },
        series: [
          {
            type: 'line',
            data,
            smooth: true,
            lineStyle: { color: '#00ff88', width: 2 },
            areaStyle: { color: 'rgba(0, 255, 136, 0.2)' },
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: { color: '#00ff88' }
          }
        ]
      })

      const interval = setInterval(() => {
        data.shift()
        data.push(Math.random() * 100)
        chart.setOption({ series: [{ data }] })
      }, 1000)
      return () => clearInterval(interval)
    }

    // 关联分析
    if (correlationRef.current) {
      const chart = echarts.init(correlationRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: { repulsion: 80 },
            nodes: [
              { id: '0', name: '婚纱摄影', symbolSize: 30, itemStyle: { color: '#ff6b9d' } },
              { id: '1', name: '彩妆', symbolSize: 25, itemStyle: { color: '#ffd93d' } },
              { id: '2', name: '美发', symbolSize: 22, itemStyle: { color: '#6bcb77' } },
              { id: '3', name: '全屋定制', symbolSize: 35, itemStyle: { color: '#4d96ff' } },
              { id: '4', name: '短视频', symbolSize: 28, itemStyle: { color: '#9d4edd' } },
              { id: '5', name: '中餐馆', symbolSize: 20, itemStyle: { color: '#ff8c42' } }
            ],
            links: [
              { source: '0', target: '1', lineStyle: { color: '#ff6b9d', width: 2 } },
              { source: '0', target: '4', lineStyle: { color: '#ffd93d', width: 3 } },
              { source: '1', target: '2', lineStyle: { color: '#6bcb77', width: 2 } },
              { source: '3', target: '4', lineStyle: { color: '#4d96ff', width: 4 } },
              { source: '3', target: '5', lineStyle: { color: '#9d4edd', width: 2 } },
              { source: '4', target: '5', lineStyle: { color: '#ff8c42', width: 3 } }
            ],
            label: { color: '#fff', fontSize: 10 }
          }
        ]
      })
    }

    const handleResize = () => {
      ;[radarRef, predictRef, clusterRef, anomalyRef, realTimeRef, correlationRef].forEach((ref) => {
        if (ref.current) echarts.getInstanceByDom(ref.current)?.resize()
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="ai-dashboard">
      {/* 粒子背景 */}
      <ParticleCanvas />

      {/* 顶部标题栏 */}
      <header className="ai-header">
        <div className="ai-header-left">
          <span className="ai-badge">
            <span className="ai-badge-dot"></span>
            AI 实时监控
          </span>
        </div>
        <h1 className="ai-title">小红点生活馆 · 智能数据分析平台</h1>
        <div className="ai-header-right">
          <span className="ai-time">{new Date().toLocaleString()}</span>
        </div>
      </header>

      {/* 顶部统计数据 */}
      <div className="ai-stats-bar">
        <div className="ai-stat-card">
          <div className="ai-stat-icon ai-icon-brain"></div>
          <div className="ai-stat-info">
            <span className="ai-stat-label">模型准确率</span>
            <span className="ai-stat-value">{aiStats.modelAccuracy}%</span>
          </div>
          <div className="ai-stat-trend up">
            <span>↑ 2.3%</span>
          </div>
        </div>
        <div className="ai-stat-card">
          <div className="ai-stat-icon ai-icon-data"></div>
          <div className="ai-stat-info">
            <span className="ai-stat-label">数据处理量</span>
            <span className="ai-stat-value">{(aiStats.dataProcessed / 1000000).toFixed(2)}M</span>
          </div>
          <div className="ai-stat-trend up">
            <span>↑ 15.8%</span>
          </div>
        </div>
        <div className="ai-stat-card">
          <div className="ai-stat-icon ai-icon-predict"></div>
          <div className="ai-stat-info">
            <span className="ai-stat-label">AI预测次数</span>
            <span className="ai-stat-value">{aiStats.predictions.toLocaleString()}</span>
          </div>
          <div className="ai-stat-trend up">
            <span>↑ 8.5%</span>
          </div>
        </div>
        <div className="ai-stat-card">
          <div className="ai-stat-icon ai-icon-alert"></div>
          <div className="ai-stat-info">
            <span className="ai-stat-label">异常检测</span>
            <span className="ai-stat-value">{aiStats.anomalies}</span>
          </div>
          <div className="ai-stat-trend down">
            <span>↓ 3个</span>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="ai-main-content">
        {/* 左侧面板 */}
        <aside className="ai-left-panel">
          {/* 神经网络可视化 */}
          <div className="ai-card neural-card">
            <div className="ai-card-header">
              <h3>神经网络模型</h3>
              <span className="ai-card-badge">可视化</span>
            </div>
            <NeuralNetwork />
            <div className="neural-stats">
              <span>输入层: 4节点</span>
              <span>隐藏层: 15节点</span>
              <span>输出层: 3节点</span>
            </div>
          </div>

          {/* 客户聚类 */}
          <div className="ai-card">
            <div className="ai-card-header">
              <h3>智能客户分群</h3>
              <span className="ai-card-badge ai-badge-green">K-Means</span>
            </div>
            <div ref={clusterRef} style={{ width: '100%', height: '180px' }}></div>
            <div className="cluster-legend">
              <span><i className="dot dot-cyan"></i> 高价值客户 35%</span>
              <span><i className="dot dot-pink"></i> 潜力客户 42%</span>
              <span><i className="dot dot-yellow"></i> 普通客户 23%</span>
            </div>
          </div>

          {/* 实时数据流 */}
          <div className="ai-card">
            <div className="ai-card-header">
              <h3>实时数据流监控</h3>
              <span className="live-indicator">
                <span className="live-dot"></span>
                LIVE
              </span>
            </div>
            <div ref={realTimeRef} style={{ width: '100%', height: '100px' }}></div>
          </div>
        </aside>

        {/* 中间面板 */}
        <main className="ai-center-panel">
          {/* AI能力雷达 */}
          <div className="ai-card ai-radar-card">
            <div className="ai-card-header">
              <h3>AI能力矩阵</h3>
              <span className="ai-card-badge ai-badge-purple">综合评估</span>
            </div>
            <div className="radar-content">
              <div ref={radarRef} style={{ width: '100%', height: '250px' }}></div>
              <div className="radar-features">
                <div className="feature-item">
                  <span className="feature-name">智能推荐</span>
                  <div className="feature-bar">
                    <div className="feature-progress" style={{ width: '92%' }}></div>
                  </div>
                  <span className="feature-value">92</span>
                </div>
                <div className="feature-item">
                  <span className="feature-name">销售预测</span>
                  <div className="feature-bar">
                    <div className="feature-progress" style={{ width: '88%' }}></div>
                  </div>
                  <span className="feature-value">88</span>
                </div>
                <div className="feature-item">
                  <span className="feature-name">客户分群</span>
                  <div className="feature-bar">
                    <div className="feature-progress" style={{ width: '95%' }}></div>
                  </div>
                  <span className="feature-value">95</span>
                </div>
                <div className="feature-item">
                  <span className="feature-name">异常检测</span>
                  <div className="feature-bar">
                    <div className="feature-progress" style={{ width: '78%' }}></div>
                  </div>
                  <span className="feature-value">78</span>
                </div>
                <div className="feature-item">
                  <span className="feature-name">趋势分析</span>
                  <div className="feature-bar">
                    <div className="feature-progress" style={{ width: '90%' }}></div>
                  </div>
                  <span className="feature-value">90</span>
                </div>
                <div className="feature-item">
                  <span className="feature-name">智能定价</span>
                  <div className="feature-bar">
                    <div className="feature-progress" style={{ width: '85%' }}></div>
                  </div>
                  <span className="feature-value">85</span>
                </div>
              </div>
            </div>
          </div>

          {/* 智能预测 */}
          <div className="ai-card">
            <div className="ai-card-header">
              <h3>AI销售预测</h3>
              <div className="predict-legend">
                <span><i className="line solid"></i> 实际值</span>
                <span><i className="line dashed"></i> AI预测</span>
              </div>
            </div>
            <div ref={predictRef} style={{ width: '100%', height: '220px' }}></div>
          </div>
        </main>

        {/* 右侧面板 */}
        <aside className="ai-right-panel">
          {/* 异常检测 */}
          <div className="ai-card">
            <div className="ai-card-header">
              <h3>实时异常检测</h3>
              <span className="ai-card-badge ai-badge-red">告警</span>
            </div>
            <div ref={anomalyRef} style={{ width: '100%', height: '140px' }}></div>
            <div className="anomaly-list">
              <div className="anomaly-item">
                <span className="anomaly-time">14:32:05</span>
                <span className="anomaly-desc">客单价突增 +180%</span>
                <span className="anomaly-tag">已处理</span>
              </div>
              <div className="anomaly-item">
                <span className="anomaly-time">10:15:22</span>
                <span className="anomaly-desc">转化率异常下降</span>
                <span className="anomaly-tag">分析中</span>
              </div>
            </div>
          </div>

          {/* 业务关联 */}
          <div className="ai-card">
            <div className="ai-card-header">
              <h3>业务关联分析</h3>
              <span className="ai-card-badge ai-badge-blue">图计算</span>
            </div>
            <div ref={correlationRef} style={{ width: '100%', height: '200px' }}></div>
          </div>

          {/* AI 推荐 */}
          <div className="ai-card ai-recommend-card">
            <div className="ai-card-header">
              <h3>AI智能建议</h3>
              <span className="ai-icon-sparkle">✨</span>
            </div>
            <div className="recommend-list">
              <div className="recommend-item">
                <div className="recommend-icon">📈</div>
                <div className="recommend-content">
                  <span className="recommend-title">建议调整定价策略</span>
                  <span className="recommend-desc">婚纱摄影淡季即将来临，建议下调8%价格以提升竞争力</span>
                </div>
              </div>
              <div className="recommend-item">
                <div className="recommend-icon">🎯</div>
                <div className="recommend-content">
                  <span className="recommend-title">重点关注客户群体</span>
                  <span className="recommend-desc">25-35岁女性用户转化率最高，建议加大投放力度</span>
                </div>
              </div>
              <div className="recommend-item">
                <div className="recommend-icon">⚡</div>
                <div className="recommend-content">
                  <span className="recommend-title">优化短视频内容</span>
                  <span className="recommend-desc">教育类内容完播率高于其他类型43%，建议增加产出</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 底部状态栏 */}
      <footer className="ai-footer">
        <div className="ai-footer-item">
          <span className="ai-footer-icon">🤖</span>
          <span>AI引擎: 运行中</span>
        </div>
        <div className="ai-footer-item">
          <span className="ai-footer-icon">📊</span>
          <span>数据同步: 正常</span>
        </div>
        <div className="ai-footer-item">
          <span className="ai-footer-icon">🔗</span>
          <span>API响应: 23ms</span>
        </div>
        <div className="ai-footer-item">
          <span className="ai-footer-icon">🧠</span>
          <span>模型版本: v3.2.1</span>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard
