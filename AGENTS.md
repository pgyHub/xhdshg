# 小红点生活馆 - 项目规范

## 1. 项目概述

**项目名称**：小红点生活馆  
**项目类型**：多业务场景SaaS数据可视化平台  
**核心功能**：为小红点生活馆提供多业务场景的数据可视化、会员管理、业务运营分析等能力

## 2. 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **UI组件库**：Ant Design 5
- **数据可视化**：ECharts 5
- **路由管理**：React Router 6
- **包管理器**：pnpm

## 3. 目录结构

```
/workspace/projects/
├── src/
│   ├── components/       # 通用组件
│   │   └── IndustryPage.tsx  # 行业页面通用组件
│   ├── pages/           # 页面组件
│   │   ├── Home.tsx                # 首页
│   │   ├── Login.tsx               # 登录页
│   │   ├── WeddingPhotography.tsx  # 婚纱摄影
│   │   ├── Makeup.tsx              # 彩妆
│   │   ├── Hairdressing.tsx        # 美发
│   │   ├── HomeCustomization.tsx   # 全屋定制
│   │   ├── Clothing.tsx            # 服装定制
│   │   ├── ShortVideoProduction.tsx # 短视频制作
│   │   ├── ChineseRestaurant.tsx   # 中餐馆
│   │   ├── Dashboard.tsx           # 数据驾驶舱
│   │   └── MemberBackend.tsx       # 会员后台
│   ├── services/         # API服务
│   │   └── api.ts
│   ├── App.tsx           # 主应用组件
│   ├── App.css           # 全局样式
│   └── main.tsx          # 入口文件
├── backend/              # 后端代码（Python FastAPI）
├── .coze                 # Coze配置文件
└── package.json

## 4. 业务模块

### 4.1 已实现的业务模块

| 模块名称 | 路由路径 | 描述 |
|---------|---------|------|
| 首页 | `/` | 展示所有业务模块和登录注册界面 |
| 婚纱摄影 | `/wedding-photography` | 婚纱摄影服务、套餐、案例展示 |
| 彩妆 | `/makeup` | 高端彩妆、形象定制服务 |
| 美发 | `/hairdressing` | 潮流美发、头皮护理服务 |
| 全屋定制 | `/home-customization` | 全屋定制、空间美学服务 |
| 服装定制 | `/clothing` | 量身定制西装、礼服、旗袍等 |
| 短视频制作 | `/short-video-production` | 短视频内容策划与制作 |
| 中餐馆 | `/chinese-restaurant` | 中餐馆品牌化运营 |
| 数据驾驶舱 | `/dashboard` | 数据可视化大屏 |
| 会员后台 | `/member-backend` | 会员管理系统 |

### 4.2 参考网站

| 模块 | 参考网站 |
|------|---------|
| 婚纱摄影 | jujiaonet.com, mcmarry.com |
| 彩妆 | yslbeautycn.com, maogepingbeauty.com |
| 美发 | meifazhan.com |
| 全屋定制 | homekoo.com, dwejia.com |
| 短视频制作 | capcut.cn |
| 中餐馆 | lxjchina.com.cn |
| 服装定制 | uniqlo.cn |

## 5. 核心组件

### 5.1 IndustryPage 组件

通用行业页面组件，支持丰富的配置项：

**Props**：
- `category`: 业务分类
- `title`: 页面标题
- `subtitle`: 副标题
- `highlights`: 核心亮点（数组）
- `workflow`: 服务流程（数组）
- `scenarios`: 应用场景（数组）
- `marketStats`: 市场数据（数组，含label和value）
- `sampleCases`: 案例数据（数组）
- `mockServices`: 服务套餐（数组）
- `showcaseItems`: 展示项目（数组）
- `capabilityMatrix`: 能力矩阵（数组）
- `insights`: 行业洞察（数组）
- `faqs`: 常见问题（数组，含q和a）
- `quickActions`: 快捷操作（可选，数组）
- `productSystems`: 产品体系（可选，数组）
- `sceneCases`: 场景案例（可选，数组）

## 6. 样式规范

### 6.1 全局样式
- 主题色：#667eea（渐变紫）
- 背景色：#f5f7fb
- 卡片圆角：16px
- 阴影：0 8px 24px rgba(0,0,0,0.1)

### 6.2 布局规范
- 最大宽度：1200px
- 响应式断点：1200px, 768px, 480px
- 卡片网格：3列或4列布局

## 7. 开发命令

```bash
# 安装依赖
pnpm install

# 开发环境
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint

# 类型检查
pnpm ts-check
```

## 8. 注意事项

1. **组件复用**：优先使用IndustryPage通用组件构建新页面
2. **数据Mock**：所有服务数据为虚拟数据，后期可接入真实API
3. **图片资源**：暂无真实图片，使用emoji和CSS占位
4. **移动端适配**：所有页面需要考虑移动端响应式布局
5. **登录注册**：首页集成完整的登录注册界面

## 9. 后续优化方向

1. 接入真实后端API
2. 添加用户认证系统
3. 优化移动端体验
4. 添加更多交互功能
5. 优化性能和数据加载策略
