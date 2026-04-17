import { Link } from 'react-router-dom'
import { useState } from 'react'

// 页脚组件
const Footer = () => {
  return (
    <footer className="site-footer">
      {/* 服务承诺 */}
      <div className="footer-service">
        <div className="service-container">
          {[
            { icon: '多', title: '品类齐全', desc: '覆盖生活服务全场景' },
            { icon: '快', title: '极速响应', desc: '7×24小时在线服务' },
            { icon: '好', title: '品质保障', desc: '专业团队匠心服务' },
            { icon: '省', title: '超值优惠', desc: '天天低价畅选无忧' }
          ].map((item) => (
            <div key={item.title} className="service-item">
              <div className="service-icon">{item.icon}</div>
              <div className="service-info">
                <span className="service-title">{item.title}</span>
                <span className="service-desc">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 导航链接 */}
      <div className="footer-links">
        <div className="links-container">
          <div className="link-group">
            <h4>服务介绍</h4>
            <Link to="/wedding-photography">婚纱摄影</Link>
            <Link to="/makeup">彩妆造型</Link>
            <Link to="/hairdressing">美发造型</Link>
            <Link to="/home-customization">全屋定制</Link>
            <Link to="/clothing">服装定制</Link>
          </div>
          <div className="link-group">
            <h4>更多服务</h4>
            <Link to="/short-video-production">短视频制作</Link>
            <Link to="/chinese-restaurant">餐饮服务</Link>
            <Link to="/dashboard">数据分析</Link>
            <Link to="/member-backend">会员中心</Link>
          </div>
          <div className="link-group">
            <h4>帮助中心</h4>
            <a href="#">新手引导</a>
            <a href="#">常见问题</a>
            <a href="#">联系客服</a>
            <a href="#">投诉建议</a>
          </div>
          <div className="link-group">
            <h4>关于我们</h4>
            <a href="#">公司简介</a>
            <a href="#">加入我们</a>
            <a href="#">商务合作</a>
            <a href="#">资质荣誉</a>
          </div>
          <div className="link-group link-group-app">
            <h4>关注我们</h4>
            <div className="qr-codes">
              <div className="qr-item">
                <div className="qr-box">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <rect x="5" y="5" width="25" height="25" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="50" y="5" width="25" height="25" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="5" y="50" width="25" height="25" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="12" y="12" width="11" height="11" fill="#667eea"/>
                    <rect x="57" y="12" width="11" height="11" fill="#667eea"/>
                    <rect x="12" y="57" width="11" height="11" fill="#667eea"/>
                    <rect x="32" y="32" width="16" height="16" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="36" y="36" width="8" height="8" fill="#667eea"/>
                  </svg>
                </div>
                <span>微信公众号</span>
              </div>
              <div className="qr-item">
                <div className="qr-box">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <rect x="5" y="5" width="25" height="25" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="50" y="5" width="25" height="25" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="5" y="50" width="25" height="25" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="12" y="12" width="11" height="11" fill="#667eea"/>
                    <rect x="57" y="12" width="11" height="11" fill="#667eea"/>
                    <rect x="12" y="57" width="11" height="11" fill="#667eea"/>
                    <rect x="32" y="32" width="16" height="16" fill="none" stroke="#667eea" strokeWidth="2"/>
                    <rect x="36" y="36" width="8" height="8" fill="#667eea"/>
                  </svg>
                </div>
                <span>小程序</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <div className="copyright">
            <span>Copyright © 2024-2026 小红点生活馆 版权所有</span>
            <span className="divider">|</span>
            <a href="#">关于我们</a>
            <span className="divider">|</span>
            <a href="#">联系客服</a>
            <span className="divider">|</span>
            <a href="#">隐私政策</a>
          </div>
          <div className="credentials">
            <span>京ICP备XXXXXXXX号</span>
            <span className="divider">|</span>
            <span>营业执照</span>
            <span className="divider">|</span>
            <span>增值电信业务许可证</span>
          </div>
          <div className="certifications">
            <div className="cert-item">
              <span className="cert-icon">安</span>
              <span>可信网站</span>
            </div>
            <div className="cert-item">
              <span className="cert-icon">诚</span>
              <span>诚信网站</span>
            </div>
            <div className="cert-item">
              <span className="cert-icon">网</span>
              <span>网络警察</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const Home = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'sms'>('account')

  return (
    <div className="cloud-home">
      <section className="cloud-hero">
        <div className="cloud-hero-left">
          <span className="cloud-badge">重磅升级</span>
          <span className="cloud-sub-badge">数据可视化平台新版上线，首月免费试用</span>
          <h2>智能数据可视化 Sugar BI</h2>
          <p>
            面向小红点生活馆多业务场景，提供图表分析、数据看板和可视化大屏能力。
            无需复杂开发，分钟级完成数据呈现与经营汇报。
          </p>
          <div className="cloud-hero-actions">
            <Link to="/dashboard" className="button button-primary">立即体验</Link>
            <Link to="/dashboard" className="button cloud-secondary-button">帮助文档</Link>
            <Link to="/dashboard" className="button cloud-secondary-button">视频教程</Link>
          </div>
        </div>
        
        {/* 右侧登录注册界面 */}
        <div className="cloud-hero-right">
          <div className="login-register-panel">
            {/* 左侧扫码区域 */}
            <div className="qr-scan-section">
              <div className="qr-container">
                <div className="qr-code-box">
                  <div className="qr-placeholder">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <rect x="10" y="10" width="30" height="30" fill="none" stroke="#333" strokeWidth="3"/>
                      <rect x="80" y="10" width="30" height="30" fill="none" stroke="#333" strokeWidth="3"/>
                      <rect x="10" y="80" width="30" height="30" fill="none" stroke="#333" strokeWidth="3"/>
                      <rect x="20" y="20" width="10" height="10" fill="#333"/>
                      <rect x="90" y="20" width="10" height="10" fill="#333"/>
                      <rect x="20" y="90" width="10" height="10" fill="#333"/>
                      <rect x="45" y="45" width="30" height="30" fill="none" stroke="#333" strokeWidth="2"/>
                      <rect x="50" y="50" width="20" height="20" fill="#333"/>
                    </svg>
                  </div>
                </div>
                <div className="phone-mockup">
                  <div className="phone-screen">
                    <div className="phone-header">小红点生活馆</div>
                    <div className="phone-scan-icon">📱</div>
                  </div>
                </div>
              </div>
              <p className="qr-hint">请使用小红点APP扫码登录</p>
              <button className="download-app-btn">
                <span className="app-icon">📲</span>
                <span>下载小红点APP</span>
              </button>
              <div className="third-party-login">
                <button className="third-party-btn wechat">
                  <span>💬</span>
                </button>
                <button className="third-party-btn alipay">
                  <span>💳</span>
                </button>
                <button className="third-party-btn weibo">
                  <span>📧</span>
                </button>
              </div>
            </div>

            {/* 右侧账号登录区域 */}
            <div className="account-login-section">
              <div className="login-tabs">
                <button 
                  className={activeTab === 'account' ? 'active' : ''}
                  onClick={() => setActiveTab('account')}
                >
                  账号登录
                </button>
                <button 
                  className={activeTab === 'sms' ? 'active' : ''}
                  onClick={() => setActiveTab('sms')}
                >
                  短信登录
                </button>
              </div>

              <div className="login-form">
                {activeTab === 'account' ? (
                  <>
                    <div className="input-group">
                      <input type="text" placeholder="手机号/用户名/邮箱" />
                    </div>
                    <div className="input-group">
                      <input type="password" placeholder="密码" />
                      <span className="forgot-password">忘记密码？</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input-group">
                      <input type="text" placeholder="请输入手机号" />
                    </div>
                    <div className="input-group sms-input">
                      <input type="text" placeholder="请输入验证码" />
                      <button className="get-code-btn">获取验证码</button>
                    </div>
                  </>
                )}

                <div className="agreement-row">
                  <input type="checkbox" id="agreement" />
                  <label htmlFor="agreement">
                    阅读并接受 <a href="#">《小红点用户协议》</a> 和 <a href="#">《隐私政策》</a>
                  </label>
                </div>

                <button className="login-submit-btn">登录</button>

                <div className="register-link">
                  <span>还没有账号？</span>
                  <a href="#">立即注册</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-title-row">
          <h3>业务模块快速入口</h3>
          <span>按模块查看专题页面</span>
        </div>
        <div className="cards-grid cards-grid-4">
          {[
            ['婚纱摄影', '/wedding-photography', '💍', '记录永恒瞬间，专业团队打造梦幻婚礼'],
            ['彩妆', '/makeup', '💄', '精致妆容，发现你的独特之美'],
            ['美发', '/hairdressing', '✂️', '时尚造型，从头开始改变'],
            ['全屋定制', '/home-customization', '🏠', '专属空间，打造理想家居'],
            ['服装定制', '/clothing', '👔', '量身定制，彰显个性品味'],
            ['短视频制作', '/short-video-production', '🎬', '创意影像，记录精彩瞬间'],
            ['中餐馆', '/chinese-restaurant', '🍜', '传承经典，品味地道美食']
          ].map(([name, path, icon, desc]) => (
            <Link key={name} to={path} className="category-card">
              <div className="category-icon">{icon}</div>
              <h4>{name}</h4>
              <p>{desc}</p>
              <span>查看详情</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="right-floating-tools">
        <button>咨询</button>
      </div>

      <Footer />
    </div>
  )
}

export default Home
