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
      <AppLayout />
    </Router>
  )
}

export default App
