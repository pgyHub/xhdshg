import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import 婚纱摄影 from './pages/WeddingPhotography'
import 彩妆 from './pages/Makeup'
import 美发 from './pages/Hairdressing'
import 全屋定制 from './pages/HomeCustomization'
import 短视频制作 from './pages/ShortVideoProduction'
import 中餐馆 from './pages/ChineseRestaurant'
import 服装定制 from './pages/ClothingCustomization'
import 会员后台 from './pages/MemberBackend'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import InfoPage from './pages/InfoPage'
import BusinessFooter from './components/BusinessFooter'
import { BUSINESS_MODULES } from './data/businessNav'
import './App.css'

const navItems = [
  { label: '首页', path: '/' },
  ...BUSINESS_MODULES.map((m) => ({ label: m.navLabel, path: m.path })),
  { label: '会员中心', path: '/member-backend' },
  { label: '数据驾驶舱', path: '/dashboard' }
]

/** 根据指针位置更新 html 上的 --mx/--my，驱动 index.css 中背景视差 */
function CursorParallax() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let targetX = 0
    let targetY = 0
    let curX = 0
    let curY = 0
    let raf = 0

    const tick = () => {
      curX += (targetX - curX) * 0.07
      curY += (targetY - curY) * 0.07
      root.style.setProperty('--mx', curX.toFixed(5))
      root.style.setProperty('--my', curY.toFixed(5))
      if (Math.abs(targetX - curX) > 0.0008 || Math.abs(targetY - curY) > 0.0008) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1
      const ny = (e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1
      targetX = Math.max(-1, Math.min(1, nx))
      targetY = Math.max(-1, Math.min(1, ny))
      schedule()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      root.style.setProperty('--mx', '0')
      root.style.setProperty('--my', '0')
    }
  }, [])
  return null
}

function AppLayout() {
  const location = useLocation()
  const hideFooter =
    location.pathname === '/dashboard' ||
    location.pathname === '/login' ||
    location.pathname === '/member-backend'

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header-top">
          <div className="brand-row">
            <h1>小红点生活馆</h1>
            <span>生活服务平台</span>
          </div>
        </div>
        <nav className="main-nav">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hairdressing" element={<美发 />} />
          <Route path="/makeup" element={<彩妆 />} />
          <Route path="/wedding-photography" element={<婚纱摄影 />} />
          <Route path="/clothing-customization" element={<服装定制 />} />
          <Route path="/home-customization" element={<全屋定制 />} />
          <Route path="/chinese-restaurant" element={<中餐馆 />} />
          <Route path="/short-video-production" element={<短视频制作 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/member-backend" element={<会员后台 />} />
          <Route path="/info/:slug" element={<InfoPage />} />
        </Routes>
      </main>
      {!hideFooter && <BusinessFooter />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <CursorParallax />
      <AppLayout />
    </Router>
  )
}

export default App
