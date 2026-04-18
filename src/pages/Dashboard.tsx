import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState('')
  const kpiLeadRef = useRef<HTMLDivElement>(null)
  const kpiConversionRef = useRef<HTMLDivElement>(null)
  const kpiMemberRef = useRef<HTMLDivElement>(null)
  const kpiCrossRef = useRef<HTMLDivElement>(null)
  const orderGaugeRef = useRef<HTMLDivElement>(null)
  const cityPieRef = useRef<HTMLDivElement>(null)
  const rankBarRef = useRef<HTMLDivElement>(null)
  const trendBarRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const funnelRef = useRef<HTMLDivElement>(null)
  const strategyRef = useRef<HTMLDivElement>(null)
  const memberRef = useRef<HTMLDivElement>(null)
  const channelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const formatNow = () => {
      const now = new Date()
      const pad = (v: number) => String(v).padStart(2, '0')
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    }

    setCurrentTime(formatNow())
    const timer = setInterval(() => setCurrentTime(formatNow()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (kpiLeadRef.current) {
      const chart = echarts.init(kpiLeadRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 8, right: 8, top: 24, bottom: 8 },
        xAxis: { type: 'category', show: false, data: ['一', '二', '三', '四', '五', '六', '日'] },
        yAxis: { type: 'value', show: false },
        series: [
          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: { color: '#2ec7ff', width: 2 },
            areaStyle: { color: 'rgba(46,199,255,0.2)' },
            data: [120, 150, 168, 190, 172, 206, 228]
          }
        ]
      })
    }

    if (kpiConversionRef.current) {
      const chart = echarts.init(kpiConversionRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'gauge',
            startAngle: 220,
            endAngle: -40,
            radius: '88%',
            progress: { show: true, width: 10 },
            axisLine: { lineStyle: { width: 10, color: [[1, '#1f2f66']] } },
            pointer: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: { color: '#9dd9ff', fontSize: 16, formatter: '{value}%' },
            data: [{ value: 82 }]
          }
        ]
      })
    }

    if (kpiMemberRef.current) {
      const chart = echarts.init(kpiMemberRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'pie',
            radius: ['50%', '72%'],
            label: { show: false },
            data: [
              { value: 42, name: '活跃' },
              { value: 28, name: '沉睡唤醒' },
              { value: 18, name: '新客' },
              { value: 12, name: '潜客' }
            ]
          }
        ]
      })
    }

    if (kpiCrossRef.current) {
      const chart = echarts.init(kpiCrossRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 10, right: 10, top: 20, bottom: 10 },
        xAxis: { type: 'value', show: false, max: 100 },
        yAxis: { type: 'category', show: false, data: ['A', 'B', 'C'] },
        series: [
          {
            type: 'bar',
            barWidth: 10,
            data: [76, 63, 58],
            itemStyle: { color: '#5b7cfa', borderRadius: 6 }
          }
        ]
      })
    }

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
              { value: 86 }
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
              { value: 21, name: '婚纱摄影' },
              { value: 13, name: '彩妆' },
              { value: 11, name: '美发' },
              { value: 17, name: '全屋定制' },
              { value: 15, name: '短视频制作' },
              { value: 12, name: '中餐馆' },
              { value: 11, name: '服装定制' }
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
          data: ['婚纱摄影', '全屋定制', '短视频制作', '中餐馆', '彩妆']
        },
        series: [
          {
            type: 'bar',
            barWidth: 9,
            data: [96, 90, 84, 78, 72],
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
        xAxis: { type: 'category', axisLabel: { color: '#86a6ff' }, data: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'] },
        yAxis: { type: 'value', axisLabel: { color: '#86a6ff' }, splitLine: { lineStyle: { color: '#1f2f66' } } },
        series: [
          {
            type: 'bar',
            data: [86, 104, 128, 142, 136, 151],
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
        xAxis: { type: 'category', axisLabel: { color: '#7ea3ff' }, data: ['需求匹配', '套餐推荐', '到店转化', '复购预测', '用户满意'] },
        yAxis: { type: 'value', axisLabel: { color: '#7ea3ff' }, splitLine: { lineStyle: { color: '#1f2f66' } } },
        series: [
          {
            type: 'line',
            smooth: true,
            areaStyle: { color: 'rgba(46,199,255,0.22)' },
            lineStyle: { color: '#2ec7ff', width: 2 },
            data: [88, 84, 76, 69, 91]
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
          { type: 'line', smooth: true, data: [36, 44, 57, 68, 79, 92], lineStyle: { color: '#2ec7ff' } },
          { type: 'line', smooth: true, data: [22, 31, 39, 48, 55, 64], lineStyle: { color: '#a34bff' } }
        ]
      })
    }

    if (funnelRef.current) {
      const chart = echarts.init(funnelRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'funnel',
            left: '10%',
            width: '80%',
            top: 8,
            bottom: 8,
            itemStyle: { borderWidth: 0 },
            label: { color: '#d4e3ff', fontSize: 10 },
            data: [
              { value: 100, name: '短视频引流' },
              { value: 78, name: '彩妆试妆' },
              { value: 61, name: '婚纱摄影转化' }
            ]
          }
        ]
      })
    }

    if (strategyRef.current) {
      const chart = echarts.init(strategyRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        grid: { left: 30, right: 12, top: 20, bottom: 20 },
        xAxis: { type: 'category', axisLabel: { color: '#86a6ff' }, data: ['婚摄券', '私宴内容', '定制跟进'] },
        yAxis: { type: 'value', axisLabel: { color: '#86a6ff' }, splitLine: { lineStyle: { color: '#1f2f66' } } },
        series: [{ type: 'bar', data: [82, 76, 69], itemStyle: { color: '#a34bff', borderRadius: [6, 6, 0, 0] } }]
      })
    }

    if (memberRef.current) {
      const chart = echarts.init(memberRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        radar: {
          indicator: [
            { name: '复购', max: 100 },
            { name: '召回', max: 100 },
            { name: '活跃', max: 100 },
            { name: '跨购', max: 100 },
            { name: '客单', max: 100 }
          ],
          axisName: { color: '#9db5ff', fontSize: 10 },
          splitLine: { lineStyle: { color: '#233978' } },
          splitArea: { areaStyle: { color: ['rgba(8,23,69,0.2)'] } }
        },
        series: [
          {
            type: 'radar',
            data: [{ value: [82, 65, 76, 61, 73] }],
            areaStyle: { color: 'rgba(46,199,255,0.25)' },
            lineStyle: { color: '#2ec7ff' },
            itemStyle: { color: '#2ec7ff' }
          }
        ]
      })
    }

    if (channelRef.current) {
      const chart = echarts.init(channelRef.current)
      chart.setOption({
        backgroundColor: 'transparent',
        series: [
          {
            type: 'pie',
            radius: ['46%', '70%'],
            label: { color: '#9db5ff', fontSize: 10 },
            data: [
              { value: 38, name: '自然流量' },
              { value: 25, name: '投放' },
              { value: 19, name: '转介绍' },
              { value: 18, name: '私域' }
            ]
          }
        ]
      })
    }

    const handleResize = () => {
      ;[
        kpiLeadRef,
        kpiConversionRef,
        kpiMemberRef,
        kpiCrossRef,
        orderGaugeRef,
        cityPieRef,
        rankBarRef,
        trendBarRef,
        waveRef,
        lineRef,
        funnelRef,
        strategyRef,
        memberRef,
        channelRef
      ].forEach((ref) => {
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
        <h2>数据驾驶舱 · 小红点生活馆AI经营中台</h2>
        <strong className="dashboard-live-time">{currentTime}</strong>
        <span>实时更新</span>
      </div>
      <section className="ai-kpi-strip">
        <article>
          <span>AI线索趋势</span>
          <div ref={kpiLeadRef} style={{ width: '100%', height: '68px' }}></div>
        </article>
        <article>
          <span>预约转化率</span>
          <div ref={kpiConversionRef} style={{ width: '100%', height: '68px' }}></div>
        </article>
        <article>
          <span>会员结构占比</span>
          <div ref={kpiMemberRef} style={{ width: '100%', height: '68px' }}></div>
        </article>
        <article>
          <span>跨模块联动单</span>
          <div ref={kpiCrossRef} style={{ width: '100%', height: '68px' }}></div>
        </article>
      </section>

      <div className="dashboard-layout">
        <section className="dashboard-side-column">
          <article className="dashboard-mini-card">
            <h4>模型可用率</h4>
            <div ref={orderGaugeRef} style={{ width: '100%', height: '150px' }}></div>
          </article>
          <article className="dashboard-mini-card">
            <h4>七大业务订单占比</h4>
            <div ref={cityPieRef} style={{ width: '100%', height: '150px' }}></div>
          </article>
        </section>

        <section className="dashboard-map-panel">
          <div className="dashboard-total">
            <span>小红点生活馆业务热力分布</span>
            <strong>LIFE SERVICE DATA BRAIN</strong>
            <em>七大业务统一分析 / AI推荐成交 / 会员生命周期运营</em>
          </div>
          <div className="china-map-mock">
            <div className="map-grid"></div>
            <div className="map-glow"></div>
            <div className="map-core">业务数据中枢</div>
            <span className="map-node node-east">华东集群</span>
            <span className="map-node node-south">华南集群</span>
            <span className="map-node node-north">华北集群</span>
            <span className="map-node node-west">西南集群</span>
          </div>
          <div className="map-label">核心城市业务热度分布</div>
        </section>

        <section className="dashboard-side-column">
          <article className="dashboard-mini-card">
            <h4>业务模块热度排名</h4>
            <div ref={rankBarRef} style={{ width: '100%', height: '150px' }}></div>
          </article>
          <article className="dashboard-mini-card">
            <h4>今日预约趋势</h4>
            <div ref={trendBarRef} style={{ width: '100%', height: '150px' }}></div>
          </article>
        </section>
      </div>

      <section className="dashboard-bottom-grid">
        <article className="dashboard-mini-card">
          <h4>AI运营质量分析</h4>
          <div ref={waveRef} style={{ width: '100%', height: '150px' }}></div>
        </article>
        <article className="dashboard-mini-card">
          <h4>近6月经营增长曲线</h4>
          <div ref={lineRef} style={{ width: '100%', height: '150px' }}></div>
        </article>
      </section>

      <section className="dashboard-bottom-grid">
        <article className="dashboard-mini-card dashboard-mini-text">
          <h4>业务协同链路</h4>
          <div ref={funnelRef} style={{ width: '100%', height: '150px' }}></div>
        </article>
        <article className="dashboard-mini-card dashboard-mini-text">
          <h4>业务策略建议</h4>
          <div ref={strategyRef} style={{ width: '100%', height: '150px' }}></div>
        </article>
      </section>

      <section className="dashboard-bottom-grid dashboard-bottom-grid-compact">
        <article className="dashboard-mini-card dashboard-mini-text">
          <h4>会员运营结果</h4>
          <div ref={memberRef} style={{ width: '100%', height: '150px' }}></div>
        </article>
        <article className="dashboard-mini-card dashboard-mini-text">
          <h4>渠道健康度</h4>
          <div ref={channelRef} style={{ width: '100%', height: '150px' }}></div>
        </article>
      </section>
    </div>
  )
}

export default Dashboard
