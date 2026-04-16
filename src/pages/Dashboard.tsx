import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Dashboard = () => {
  const orderGaugeRef = useRef<HTMLDivElement>(null)
  const cityPieRef = useRef<HTMLDivElement>(null)
  const rankBarRef = useRef<HTMLDivElement>(null)
  const trendBarRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (orderGaugeRef.current) {
      const chart = echarts.init(orderGaugeRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            radius: '88%',
            progress: { show: true, width: 8 },
            axisLine: { lineStyle: { width: 8, color: [[1, '#283f8f']] } },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            pointer: { show: false },
            detail: { valueAnimation: true, color: '#9dd9ff', fontSize: 18, formatter: '{value}%' },
            data: [
              { value: 73 }
            ]
          }
        ]
      })
    }

    if (cityPieRef.current) {
      const chart = echarts.init(cityPieRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'pie',
            radius: ['45%', '70%'],
            label: { color: '#9db5ff', fontSize: 10 },
            data: [
              { value: 39, name: '华东' },
              { value: 31, name: '华南' },
              { value: 17, name: '华北' },
              { value: 13, name: '西南' }
            ]
          }
        ]
      })
    }

    if (rankBarRef.current) {
      const chart = echarts.init(rankBarRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 42, right: 12, top: 20, bottom: 16 },
        xAxis: { type: 'value', axisLabel: { color: '#7ea3ff' }, splitLine: { lineStyle: { color: '#1f2f66' } } },
        yAxis: {
          type: 'category',
          axisLabel: { color: '#9db5ff' },
          data: ['婚纱摄影', '全屋定制', '短视频', '中餐馆', '彩妆']
        },
        series: [
          {
            type: 'bar',
            barWidth: 9,
            data: [96, 88, 73, 64, 58],
            itemStyle: { color: '#2ec7ff', borderRadius: [0, 6, 6, 0] }
          }
        ]
      })
    }

    if (trendBarRef.current) {
      const chart = echarts.init(trendBarRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 30, right: 12, top: 24, bottom: 18 },
        xAxis: { type: 'category', axisLabel: { color: '#86a6ff' }, data: ['周一', '周二', '周三', '周四', '周五', '周六'] },
        yAxis: { type: 'value', axisLabel: { color: '#86a6ff' }, splitLine: { lineStyle: { color: '#1f2f66' } } },
        series: [
          {
            type: 'bar',
            data: [120, 168, 142, 190, 166, 210],
            itemStyle: { color: '#5b7cfa', borderRadius: [6, 6, 0, 0] }
          }
        ]
      })
    }

    if (waveRef.current) {
      const chart = echarts.init(waveRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 30, right: 12, top: 20, bottom: 20 },
        xAxis: { type: 'category', axisLabel: { color: '#7ea3ff' }, data: ['客单价', '转化率', '完播率', '复购率', '交付率'] },
        yAxis: { type: 'value', axisLabel: { color: '#7ea3ff' }, splitLine: { lineStyle: { color: '#1f2f66' } } },
        series: [
          {
            type: 'line',
            smooth: true,
            areaStyle: { color: 'rgba(46,199,255,0.22)' },
            lineStyle: { color: '#2ec7ff', width: 2 },
            data: [52, 66, 48, 73, 84]
          }
        ]
      })
    }

    if (lineRef.current) {
      const chart = echarts.init(lineRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 30, right: 12, top: 20, bottom: 20 },
        xAxis: { type: 'category', boundaryGap: false, axisLabel: { color: '#86a6ff' }, data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
        yAxis: { type: 'value', axisLabel: { color: '#86a6ff' }, splitLine: { lineStyle: { color: '#1f2f66' } } },
        series: [
          { type: 'line', smooth: true, data: [32, 45, 41, 56, 49, 63], lineStyle: { color: '#2ec7ff' } },
          { type: 'line', smooth: true, data: [24, 28, 35, 33, 42, 48], lineStyle: { color: '#a34bff' } }
        ]
      })
    }

    const handleResize = () => {
      ;[orderGaugeRef, cityPieRef, rankBarRef, trendBarRef, waveRef, lineRef].forEach((ref) => {
        if (ref.current) echarts.getInstanceByDom(ref.current)?.resize()
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="dashboard-screen">
      <div className="dashboard-title-bar">
        <h2>企业实时销售数据驾驶舱</h2>
        <span>2026-04-15 18:10:59</span>
      </div>
      <div className="dashboard-layout">
        <section className="dashboard-map-panel">
          <div className="dashboard-total">
            <span>销售总额</span>
            <strong>10,009,748 元</strong>
            <em>同比增长 +39%</em>
          </div>
          <div className="china-map-mock">
            <div className="map-glow"></div>
            <div className="map-label">全国销售分布热力图</div>
          </div>
        </section>
        <section className="dashboard-card-grid">
          <article className="dashboard-mini-card">
            <h4>季度销售进度</h4>
            <div ref={orderGaugeRef} style={{ width: '100%', height: '130px' }}></div>
          </article>
          <article className="dashboard-mini-card">
            <h4>品类销售占比</h4>
            <div ref={cityPieRef} style={{ width: '100%', height: '130px' }}></div>
          </article>
          <article className="dashboard-mini-card">
            <h4>销售品牌排名</h4>
            <div ref={rankBarRef} style={{ width: '100%', height: '160px' }}></div>
          </article>
          <article className="dashboard-mini-card">
            <h4>城市销量趋势</h4>
            <div ref={trendBarRef} style={{ width: '100%', height: '160px' }}></div>
          </article>
          <article className="dashboard-mini-card">
            <h4>客户分布分析</h4>
            <div ref={waveRef} style={{ width: '100%', height: '150px' }}></div>
          </article>
          <article className="dashboard-mini-card">
            <h4>近6月销售增长曲线</h4>
            <div ref={lineRef} style={{ width: '100%', height: '150px' }}></div>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
