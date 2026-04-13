import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import婚纱摄影 from './pages/WeddingPhotography'
import彩妆 from './pages/Makeup'
import美发 from './pages/Hairdressing'
import全屋定制 from './pages/HomeCustomization'
import短视频制作 from './pages/ShortVideoProduction'
import中餐馆 from './pages/ChineseRestaurant'
import会员后台 from './pages/MemberBackend'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>小红点生活馆</h1>
          <nav>
            <Link to="/">首页</Link>
            <Link to="/wedding-photography">婚纱摄影</Link>
            <Link to="/makeup">彩妆</Link>
            <Link to="/hairdressing">美发</Link>
            <Link to="/home-customization">全屋定制</Link>
            <Link to="/short-video-production">短视频制作</Link>
            <Link to="/chinese-restaurant">中餐馆</Link>
            <Link to="/dashboard">数据驾驶舱</Link>
            <Link to="/login">会员登录</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wedding-photography" element={<婚纱摄影 />} />
            <Route path="/makeup" element={<彩妆 />} />
            <Route path="/hairdressing" element={<美发 />} />
            <Route path="/home-customization" element={<全屋定制 />} />
            <Route path="/short-video-production" element={<短视频制作 />} />
            <Route path="/chinese-restaurant" element={<中餐馆 />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/member-backend" element={<会员后台 />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
