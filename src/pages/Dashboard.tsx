import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const Dashboard: React.FC = () => {
  const pieChartRef = useRef<HTMLDivElement>(null)
  const barChartRef = useRef<HTMLDivElement>(null)
  const lineChartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 初始化饼图
    if (pieChartRef.current) {
      const pieChart = echarts.init(pieChartRef.current)
      const pieOption = {
        title: {
          text: '服务类型分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '服务类型',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 30, name: '婚纱摄影' },
              { value: 25, name: '彩妆' },
              { value: 20, name: '美发' },
              { value: 15, name: '全屋定制' },
              { value: 10, name: '短视频制作' },
              { value: 5, name: '中餐馆' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      pieChart.setOption(pieOption)
    }

    // 初始化柱状图
    if (barChartRef.current) {
      const barChart = echarts.init(barChartRef.current)
      const barOption = {
        title: {
          text: '月度服务订单量',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '订单量',
            type: 'bar',
            barWidth: '60%',
            data: [120, 132, 101, 134, 90, 230]
          }
        ]
      }
      barChart.setOption(barOption)
    }

    // 初始化折线图
    if (lineChartRef.current) {
      const lineChart = echarts.init(lineChartRef.current)
      const lineOption = {
        title: {
          text: '月度 revenue',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Revenue'],
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Revenue',
            type: 'line',
            stack: 'Total',
            data: [12000, 19200, 12000, 23400, 29000, 33000]
          }
        ]
      }
      lineChart.setOption(lineOption)
    }

    // 响应式调整
    const handleResize = () => {
      if (pieChartRef.current) {
        echarts.getInstanceByDom(pieChartRef.current)?.resize()
      }
      if (barChartRef.current) {
        echarts.getInstanceByDom(barChartRef.current)?.resize()
      }
      if (lineChartRef.current) {
        echarts.getInstanceByDom(lineChartRef.current)?.resize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <h2>数据驾驶舱</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div ref={pieChartRef} style={{ width: '100%', height: '300px' }}></div>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div ref={barChartRef} style={{ width: '100%', height: '300px' }}></div>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <div ref={lineChartRef} style={{ width: '100%', height: '300px' }}></div>
        </div>
      </div>
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>业务概览</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
            <h4>总服务数</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>150</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
            <h4>总订单数</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>850</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
            <h4>总营业额</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>¥1,200,000</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', textAlign: 'center' }}>
            <h4>会员数</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>320</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
