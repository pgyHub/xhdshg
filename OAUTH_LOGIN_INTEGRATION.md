# Third-Party Login Integration Contract

This document defines a minimal contract for WeChat, Alipay, and Douyin OAuth login in this project.

## 1) Frontend Entry URLs

The login modal in `src/pages/Home.tsx` reads these Vite env vars:

- `VITE_OAUTH_WECHAT_URL`
- `VITE_OAUTH_ALIPAY_URL`
- `VITE_OAUTH_DOUYIN_URL`

Behavior:

- If URL is configured (starts with `http(s)://` or `/`), clicking icon redirects immediately.
- If not configured, UI shows "xx 登录正在接入中，请先使用账号密码登录。"

Suggested `.env` example:

```env
VITE_OAUTH_WECHAT_URL=/api/auth/oauth/wechat/start
VITE_OAUTH_ALIPAY_URL=/api/auth/oauth/alipay/start
VITE_OAUTH_DOUYIN_URL=/api/auth/oauth/douyin/start
```

## 2) Backend Endpoints

Add to backend auth routes:

- `GET /auth/oauth/wechat/start`
- `GET /auth/oauth/wechat/callback`
- `GET /auth/oauth/alipay/start`
- `GET /auth/oauth/alipay/callback`
- `GET /auth/oauth/douyin/start`
- `GET /auth/oauth/douyin/callback`

### 2.1 Start Endpoint Contract

`GET /auth/oauth/{provider}/start`

Response:

- 302 redirect to provider authorize URL
- `state` is generated server-side and persisted for CSRF protection

Error (JSON):

```json
{ "detail": "OAuth provider is not configured." }
```

### 2.2 Callback Endpoint Contract

`GET /auth/oauth/{provider}/callback?code=...&state=...`

Backend steps:

1. Validate `state`.
2. Exchange `code` for provider token.
3. Fetch provider user id (openid / user_id).
4. Find or create local user.
5. Issue site JWT (same format as `/auth/login`).

Recommended response:

- Redirect to frontend with token in hash fragment:
  - `302 /oauth-callback#token=<jwt>&provider=wechat`
- Or return JSON (for SPA popup flows):

```json
{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "provider": "wechat",
  "is_new_user": false
}
```

## 3) Data Model (Minimum)

Create a social binding table:

- `id`
- `user_id` (FK users.id)
- `provider` (`wechat` | `alipay` | `douyin`)
- `provider_user_id` (unique with provider)
- `union_id` (optional, for WeChat ecosystem)
- `created_at`
- `updated_at`

Recommended unique constraints:

- `(provider, provider_user_id)` unique
- `(user_id, provider)` unique

## 4) Account Linking Rules

- Existing binding found: login directly.
- No binding:
  - If trusted email/phone is returned and matches existing local user, require explicit confirmation to bind.
  - Otherwise create new local user and bind.
- If local account already bound to same provider, reject duplicate bind.

## 5) Error Codes (Recommended)

- `OAUTH_NOT_CONFIGURED`
- `OAUTH_STATE_INVALID`
- `OAUTH_CODE_EXCHANGE_FAILED`
- `OAUTH_PROFILE_FETCH_FAILED`
- `OAUTH_BIND_CONFLICT`
- `OAUTH_INTERNAL_ERROR`

JSON format:

```json
{
  "code": "OAUTH_STATE_INVALID",
  "detail": "OAuth state is invalid or expired."
}
```

## 6) Security Checklist

- Store provider `client_secret` only in backend env.
- Use HTTPS in production.
- Enforce one-time state usage + short TTL.
- Verify callback domain strictly.
- Add rate limiting on callback endpoints.
- Audit log: provider, local user id, IP, user agent, result.

## 7) Rollout Plan

1. Enable Alipay first (usually fastest web path).
2. Enable WeChat web OAuth once platform config is approved.
3. Enable Douyin.
4. Add account-center bind/unbind UI.
