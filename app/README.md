# 小红点生活馆 · App（Expo + React Native）

目录与《小程序和App技术方案》中 `app/` 表格一致：`src/screens`、`src/navigation`、`src/services/api.ts`、`src/store`、`src/components`（4 个通用组件）。

## 开发

```bash
cd app
npm install
npm run start
```

## 环境变量

在 `.env` 或 EAS 配置中设置：

- **`EXPO_PUBLIC_API_BASE`**：API 根地址（建议含 `/api` 前缀，与 Nginx 反代一致）。
- **`EXPO_PUBLIC_OAUTH_WECHAT_URL`**（可选）：微信 H5/第三方 OAuth 的 `start` 地址；未配置时「微信登录」会提示改用账号密码。见仓库根目录 `OAUTH_LOGIN_INTEGRATION.md`。

## 说明

本目录为仓库根下的 **移动端客户端**，与 Python 包 `backend/app/` 无关。
