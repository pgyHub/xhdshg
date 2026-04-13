import React from 'react'

const Home: React.FC = () => {
  return (
    <div>
      <h2>欢迎来到小红点生活馆</h2>
      <p>我们提供全方位的生活服务，包括婚纱摄影、彩妆、美发、全屋定制、短视频制作和中餐馆等。</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>婚纱摄影</h3>
          <p>专业的婚纱摄影服务，为您记录最美的瞬间</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>彩妆</h3>
          <p>专业彩妆师为您打造完美妆容</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>美发</h3>
          <p>资深发型师为您设计时尚发型</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>全屋定制</h3>
          <p>个性化全屋定制服务，打造专属空间</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>短视频制作</h3>
          <p>专业团队为您制作高质量短视频</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>中餐馆</h3>
          <p>正宗中餐，美味佳肴</p>
        </div>
      </div>
    </div>
  )
}

export default Home
