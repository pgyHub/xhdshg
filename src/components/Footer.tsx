import { useState } from 'react'
import { Link } from 'react-router-dom'

type ModalType = 'help-guide' | 'faq' | 'contact' | 'feedback' | 'about' | 'join' | 'business' | 'honor' | null

const Footer = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  const closeModal = () => setActiveModal(null)

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
            <button onClick={() => setActiveModal('help-guide')}>新手引导</button>
            <button onClick={() => setActiveModal('faq')}>常见问题</button>
            <button onClick={() => setActiveModal('contact')}>联系客服</button>
            <button onClick={() => setActiveModal('feedback')}>投诉建议</button>
          </div>
          <div className="link-group">
            <h4>关于我们</h4>
            <button onClick={() => setActiveModal('about')}>公司简介</button>
            <button onClick={() => setActiveModal('join')}>加入我们</button>
            <button onClick={() => setActiveModal('business')}>商务合作</button>
            <button onClick={() => setActiveModal('honor')}>资质荣誉</button>
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
            <span>Copyright © 2018-2026 小红点生活馆 版权所有</span>
            <span className="divider">|</span>
            <button onClick={() => setActiveModal('about')}>关于我们</button>
            <span className="divider">|</span>
            <button onClick={() => setActiveModal('contact')}>联系客服</button>
            <span className="divider">|</span>
            <button onClick={() => setActiveModal('feedback')}>隐私政策</button>
          </div>
          <div className="credentials">
            <span>京ICP备2024012345号-1</span>
            <span className="divider">|</span>
            <span>营业执照：91110105MA01234X5K</span>
            <span className="divider">|</span>
            <span>增值电信业务许可证：京B1.B2-20240001</span>
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

      {/* 弹窗遮罩 */}
      {activeModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>

            {/* 新手引导 */}
            {activeModal === 'help-guide' && (
              <>
                <h3>新手引导</h3>
                <div className="help-content">
                  <div className="help-section">
                    <h4>第一步：注册账号</h4>
                    <p>访问小红点生活馆官网，点击右上角"注册"按钮，填写手机号并获取验证码完成注册。</p>
                  </div>
                  <div className="help-section">
                    <h4>第二步：选择服务</h4>
                    <p>登录后，您可以在首页浏览各类生活服务，根据需求选择婚纱摄影、彩妆造型、美发造型、全屋定制等服务。</p>
                  </div>
                  <div className="help-section">
                    <h4>第三步：预约下单</h4>
                    <p>选择心仪的服务套餐，点击"立即预约"，填写预约时间、地点等信息，提交订单。</p>
                  </div>
                  <div className="help-section">
                    <h4>第四步：享受服务</h4>
                    <p>按照预约时间到店享受服务，满意后在线支付。如有任何问题，可随时联系客服。</p>
                  </div>
                </div>
              </>
            )}

            {/* 常见问题 */}
            {activeModal === 'faq' && (
              <>
                <h3>常见问题</h3>
                <div className="help-content">
                  <div className="faq-item">
                    <h4>Q: 如何修改预约时间？</h4>
                    <p>A: 登录后进入"我的订单"，找到对应订单，点击"修改预约"即可调整时间。</p>
                  </div>
                  <div className="faq-item">
                    <h4>Q: 预约后可以退款吗？</h4>
                    <p>A: 在服务开始前24小时可申请退款，24小时内不支持退款，特殊情况可联系客服处理。</p>
                  </div>
                  <div className="faq-item">
                    <h4>Q: 如何成为会员？</h4>
                    <p>A: 注册即成为普通会员，累计消费满1000元自动升级为银卡会员，享受更多优惠。</p>
                  </div>
                  <div className="faq-item">
                    <h4>Q: 支持哪些支付方式？</h4>
                    <p>A: 支持微信支付、支付宝、银行卡、会员余额等多种支付方式。</p>
                  </div>
                  <div className="faq-item">
                    <h4>Q: 服务不满意怎么办？</h4>
                    <p>A: 如对服务不满意，可在服务完成后72小时内提交反馈，我们会第一时间为您处理。</p>
                  </div>
                </div>
              </>
            )}

            {/* 联系客服 */}
            {activeModal === 'contact' && (
              <>
                <h3>联系客服</h3>
                <div className="help-content contact-content">
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <div>
                      <h4>客服热线</h4>
                      <p>400-888-9999</p>
                      <span>工作时间：周一至周日 9:00-21:00</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">💬</span>
                    <div>
                      <h4>在线客服</h4>
                      <p>点击页面右下角"在线咨询"按钮</p>
                      <span>工作时间：周一至周日 8:00-24:00</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <div>
                      <h4>邮箱地址</h4>
                      <p>service@xiaohongdian.com</p>
                      <span>24小时内回复</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <div>
                      <h4>公司地址</h4>
                      <p>北京市朝阳区建国路88号</p>
                      <span>小红点生活馆总部大楼</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 投诉建议 */}
            {activeModal === 'feedback' && (
              <>
                <h3>投诉建议</h3>
                <div className="help-content">
                  <div className="feedback-form">
                    <div className="form-group">
                      <label>反馈类型</label>
                      <select>
                        <option>服务投诉</option>
                        <option>质量问题</option>
                        <option>人员态度</option>
                        <option>功能建议</option>
                        <option>其他问题</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>您的建议</label>
                      <textarea placeholder="请详细描述您的问题或建议，我们会认真处理..."></textarea>
                    </div>
                    <div className="form-group">
                      <label>联系方式</label>
                      <input type="text" placeholder="手机号或邮箱（选填）" />
                    </div>
                    <button className="submit-btn">提交反馈</button>
                  </div>
                </div>
              </>
            )}

            {/* 公司简介 */}
            {activeModal === 'about' && (
              <>
                <h3>公司简介</h3>
                <div className="help-content about-content">
                  <p>小红点生活馆成立于2018年，是一家专注于生活服务领域的互联网平台。我们致力于为用户提供高品质、多元化的生活服务，涵盖婚纱摄影、彩妆造型、美发造型、全屋定制、服装定制、短视频制作等多个领域。</p>
                  <p>公司总部位于北京，在上海、广州、深圳、成都、杭州等城市设有分支机构。目前平台注册用户超过500万，合作服务商超过10000家，累计服务订单突破1000万单。</p>
                  <p>我们秉承"让生活更美好"的使命，通过技术创新和服务优化，为用户打造便捷、高效、优质的生活服务体验。</p>
                  <div className="about-stats">
                    <div className="stat-item">
                      <span className="stat-num">500万+</span>
                      <span>注册用户</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-num">10000+</span>
                      <span>合作商家</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-num">1000万+</span>
                      <span>服务订单</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-num">50+</span>
                      <span>覆盖城市</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 加入我们 */}
            {activeModal === 'join' && (
              <>
                <h3>加入我们</h3>
                <div className="help-content join-content">
                  <div className="job-list">
                    <div className="job-item">
                      <h4>高级前端开发工程师</h4>
                      <p>北京 | 本科 | 15K-30K</p>
                      <span>岗位要求：熟练掌握React/Vue，3年以上前端开发经验</span>
                    </div>
                    <div className="job-item">
                      <h4>UI设计师</h4>
                      <p>北京 | 本科 | 12K-25K</p>
                      <span>岗位要求：精通Figma/Sketch，有App设计经验优先</span>
                    </div>
                    <div className="job-item">
                      <h4>产品经理</h4>
                      <p>北京 | 本科 | 18K-35K</p>
                      <span>岗位要求：3年以上互联网产品经验，有生活服务类经验优先</span>
                    </div>
                    <div className="job-item">
                      <h4>市场拓展经理</h4>
                      <p>全国 | 大专 | 10K-20K+提成</p>
                      <span>岗位要求：良好的沟通能力，有商家资源优先</span>
                    </div>
                  </div>
                  <p className="join-tip">简历投递：hr@xiaohongdian.com</p>
                </div>
              </>
            )}

            {/* 商务合作 */}
            {activeModal === 'business' && (
              <>
                <h3>商务合作</h3>
                <div className="help-content business-content">
                  <div className="cooperation-type">
                    <h4>商家入驻</h4>
                    <p>如果您是婚纱摄影、彩妆、美发、家居定制等服务商，欢迎加入我们平台。入驻即享流量扶持、运营指导、订单保障等多项权益。</p>
                    <ul>
                      <li>零入驻费用，技术服务费低至5%</li>
                      <li>精准用户流量导入</li>
                      <li>专业运营培训支持</li>
                      <li>完善的订单和售后体系</li>
                    </ul>
                  </div>
                  <div className="cooperation-type">
                    <h4>品牌合作</h4>
                    <p>面向品牌方提供整合营销服务，涵盖内容营销、KOL合作、线下活动等全链路营销方案。</p>
                  </div>
                  <div className="cooperation-type">
                    <h4>渠道代理</h4>
                    <p>招募城市合伙人，共同开拓本地生活服务市场，提供区域独家代理权和丰厚分成。</p>
                  </div>
                  <p className="business-contact">商务洽谈：bd@xiaohongdian.com</p>
                </div>
              </>
            )}

            {/* 资质荣誉 */}
            {activeModal === 'honor' && (
              <>
                <h3>资质荣誉</h3>
                <div className="help-content honor-content">
                  <div className="honor-list">
                    <div className="honor-item">
                      <div className="honor-icon">🏆</div>
                      <div>
                        <h4>2024年度最具影响力生活服务平台</h4>
                        <p>来源：中国互联网协会 | 2024年1月</p>
                      </div>
                    </div>
                    <div className="honor-item">
                      <div className="honor-icon">⭐</div>
                      <div>
                        <h4>高新技术企业认证</h4>
                        <p>证书编号：GR202311001234 | 北京市科学技术委员会</p>
                      </div>
                    </div>
                    <div className="honor-item">
                      <div className="honor-icon">🔒</div>
                      <div>
                        <h4>信息安全等级保护三级认证</h4>
                        <p>等保备案号：110105123456789</p>
                      </div>
                    </div>
                    <div className="honor-item">
                      <div className="honor-icon">📋</div>
                      <div>
                        <h4>增值电信业务经营许可证</h4>
                        <p>许可证编号：B1.B2-20240001</p>
                      </div>
                    </div>
                    <div className="honor-item">
                      <div className="honor-icon">🌟</div>
                      <div>
                        <h4>消费者满意品牌</h4>
                        <p>来源：中国消费者协会 | 连续3年获此殊荣</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
