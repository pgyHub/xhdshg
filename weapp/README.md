# 小红点生活馆 · 微信小程序（Taro 3）

目录与页面与《小程序和App技术方案》一致。

## 开发

```bash
cd weapp
npm install
npm run dev:weapp
```

在微信开发者工具中打开本目录，并指向构建输出目录 `dist/`（见 `project.config.json` 的 `miniprogramRoot`）。

## 环境变量

可在 `config` 中通过 `defineConstants` 或 Taro 环境文件配置 **`TARO_APP_API_BASE`**（建议指向带 `/api` 前缀的后台根，如 `https://你的域名/api`），与现有后端对齐。

登录页同时支持 **账号密码**（`POST /auth/login`）与 **微信一键登录**（`wx.login` + `POST /auth/wechat/miniprogram`；后端未接入时返回 501，可提示用户改用密码）。
