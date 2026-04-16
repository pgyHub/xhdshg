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
│   │   ├── WeddingPhotography.tsx  # 婚纱摄影（浪漫精致风格）
│   │   ├── Makeup.tsx              # 彩妆（高端美妆风格）
│   │   ├── Hairdressing.tsx        # 美发（时尚造型风格）
│   │   ├── HomeCustomization.tsx   # 全屋定制（品质家居风格）
│   │   ├── Clothing.tsx            # 服装定制（优衣库简约风格）
│   │   ├── ShortVideoProduction.tsx # 短视频制作（现代科技风格）
│   │   ├── ChineseRestaurant.tsx   # 中餐馆（传统中国风风格）
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

## 4. 业务模块与设计风格

### 4.1 已实现的业务模块

| 模块名称 | 路由路径 | 设计风格 | 参考网站 |
|---------|---------|---------|---------|
| 首页 | `/` | 登录注册+业务展示 | 百度登录页 |
| 婚纱摄影 | `/wedding-photography` | 浪漫精致风格 | jujiaonet.com, mcmarry.com |
| 彩妆 | `/makeup` | 高端美妆风格 | yslbeautycn.com, maogepingbeauty.com |
| 美发 | `/hairdressing` | 时尚造型风格 | meifazhan.com |
| 全屋定制 | `/home-customization` | 品质家居风格 | homekoo.com, dwejia.com |
| 服装定制 | `/clothing` | 优衣库简约风格 | uniqlo.cn |
| 短视频制作 | `/short-video-production` | 现代科技风格 | capcut.cn |
| 中餐馆 | `/chinese-restaurant` | 传统中国风风格 | lxjchina.com.cn |
| 数据驾驶舱 | `/dashboard` | 数据可视化 | - |
| 会员后台 | `/member-backend` | 管理系统 | - |

### 4.2 设计风格详解

#### 婚纱摄影页面 - 浪漫精致风格
- **配色**：粉色系渐变 (#e91e63, #c2185b)
- **布局**：大图轮播、卡片网格、套餐展示
- **元素**：爱心、鲜花、婚礼元素
- **特点**：温馨浪漫、女性化设计

#### 彩妆页面 - 高端美妆风格
- **配色**：深色背景 + 金色点缀 (#1a1a1a, #d4af37)
- **布局**：左右分栏、卡片展示
- **元素**：化妆品图标、精美插图
- **特点**：高端奢华、质感设计

#### 美发页面 - 时尚造型风格
- **配色**：深蓝灰 (#2c3e50, #e74c3c)
- **布局**：服务列表、发型师展示
- **元素**：剪刀、发型图标
- **特点**：专业时尚、现代感

#### 全屋定制页面 - 品质家居风格
- **配色**：深蓝渐变 (#1e3c72, #2a5298)
- **布局**：空间分类、套餐对比
- **元素**：家居图标、空间示意图
- **特点**：品质感、信赖感

#### 服装定制页面 - 优衣库简约风格
- **配色**：黑白灰主调 (#111, #fafafa)
- **布局**：简洁网格、产品展示
- **元素**：服装图标
- **特点**：极简、实用、功能性强

#### 短视频制作页面 - 现代科技风格
- **配色**：深色科技风 (#0a0a0a, #ea4545)
- **布局**：服务卡片、案例展示
- **元素**：视频图标、播放按钮
- **特点**：科技感、年轻化

#### 中餐馆页面 - 传统中国风风格
- **配色**：中国红 (#c0392b, #ffd700)
- **布局**：菜品展示、套餐推荐
- **元素**：中餐图标、传统纹饰
- **特点**：传统韵味、中国风

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

1. **页面设计**：每个业务页面都有独特的风格设计，完全参考指定网站
2. **组件复用**：优先使用IndustryPage通用组件构建新页面
3. **数据Mock**：所有服务数据为虚拟数据，后期可接入真实API
4. **图片资源**：暂无真实图片，使用emoji和CSS占位
5. **移动端适配**：所有页面需要考虑移动端响应式布局
6. **登录注册**：首页集成完整的扫码+账号登录界面

## 9. 后续优化方向

1. 接入真实后端API
2. 添加用户认证系统
3. 优化移动端体验
4. 添加更多交互功能
5. 优化性能和数据加载策略
