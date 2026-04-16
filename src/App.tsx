import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import 婚纱摄影 from './pages/WeddingPhotography'
import 彩妆 from './pages/Makeup'
import 美发 from './pages/Hairdressing'
import 全屋定制 from './pages/HomeCustomization'
import 短视频制作 from './pages/ShortVideoProduction'
import 中餐馆 from './pages/ChineseRestaurant'
import 会员后台 from './pages/MemberBackend'
import Dashboard from './pages/Dashboard'
import './App.css'

const navItems = [
  { label: '首页', path: '/' },
  { label: '婚纱摄影', path: '/wedding-photography' },
  { label: '彩妆', path: '/makeup' },
  { label: '美发', path: '/hairdressing' },
  { label: '全屋定制', path: '/home-customization' },
  { label: '短视频制作', path: '/short-video-production' },
  { label: '中餐馆', path: '/chinese-restaurant' },
  { label: '数据驾驶舱', path: '/dashboard' }
]

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <Router>
      <div className="app-shell">
        <header className="site-header">
          <div className="site-header-top">
            <div className="brand-row">
              <h1>小红点生活馆</h1>
              <span>云智一体生活服务平台</span>
            </div>
          </div>
          <nav className="main-nav">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="site-main">
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

      {showLoginModal && (
        <div className="login-modal-mask" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="login-modal-close" onClick={() => setShowLoginModal(false)}>×</button>
            <div className="login-modal-left">
              <h3>登录</h3>
              <p>小红点APP/支付宝/钉钉</p>
              <div className="mock-qr">
                <div className="mock-qr-inner">二维码</div>
              </div>
              <span>其他方式：支付宝 / 淘宝 / 微博 / 飞书</span>
            </div>
            <div className="login-modal-right">
              <div className="login-modal-tabs">
                <button className="active">账号登录</button>
                <button>手机号登录</button>
                <button>通行密钥</button>
                <button className="go-register">前往注册</button>
              </div>
              <div className="login-modal-form">
                <input placeholder="账号名  请输入" />
                <input type="password" placeholder="密码  请输入" />
                <button className="login-submit">立即登录</button>
                <div className="login-links">
                  <span>忘记登录名</span>
                  <span>忘记密码</span>
                  <span>RAM登录</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Router>
  )
}

export default App
