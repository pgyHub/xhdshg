from fastapi import FastAPI, Request, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse, JSONResponse
from app.routes import auth, users, services, files
from app.core.config import settings
from app.core.locale_zh import translate_http_detail, validation_issues_zh

# RapiDoc：与默认 Swagger 不同组件；用 jsDelivr 加载，国内往往比 unpkg 更稳
RAPIDOC_VERSION = "9.3.8"
RAPIDOC_JS = f"https://cdn.jsdelivr.net/npm/rapidoc@{RAPIDOC_VERSION}/dist/rapidoc-min.js"

API_DESCRIPTION = """
## 小红点生活馆 · 后端服务

面向前端与运营调试的 REST API。接口返回与常见错误提示已尽量使用**中文**；若仍看到英文，多半是浏览器文档组件自带的按钮文案（见下表）。

### 文档页里的英文是什么意思（对照）

| 英文 | 中文含义 |
| --- | --- |
| **Authorize** | 授权：在这里填写登录后拿到的令牌（Token） |
| **Try** / **Try it out** | 试一试：向服务器发一次真实请求 |
| **Parameters** | 请求参数：路径、Query、Body 等 |
| **Request body** | 请求体：一般要传的 JSON |
| **Responses** | 接口返回：状态码与数据结构 |
| **Execute** | 执行发送请求 |
| **Cancel** | 取消 |

### 使用顺序（建议）

1. **用户** → `POST /users/` 注册账号（或使用已有账号）
2. **认证** → `POST /auth/login` 登录，复制返回的 `access_token`
3. 点击 **Authorize**，在框中输入：`Bearer <你的token>`（`Bearer` 后面有一个空格），再确认
4. 再调用带锁图标的 **用户 / 业务服务 / 文件** 接口

### 其他文档

- **主文档 `/docs`**：RapiDoc，左侧导航 + 主题色，适合日常联调。
- **经典 Swagger `/docs/swagger`**：原版 Swagger UI。
- **ReDoc `/redoc`**：左导航 + 正文，适合通读长说明。
"""

OPENAPI_TAGS = [
    {
        "name": "概览",
        "description": "服务健康与版本信息。",
    },
    {
        "name": "认证",
        "description": "登录并获取 JWT。后续请求在 Header 中携带：`Authorization: Bearer <token>`。",
    },
    {
        "name": "用户",
        "description": "注册与当前登录用户资料（`/me` 需登录）。",
    },
    {
        "name": "业务服务",
        "description": "各业务线服务项的查询与维护；写操作需登录。",
    },
    {
        "name": "文件",
        "description": "上传、列表与下载（需会员或管理员登录）。",
    },
    {
        "name": "管理后台",
        "description": "会员列表与维护（仅管理员）。",
    },
]

app = FastAPI(
    title="小红点生活馆 API",
    description=API_DESCRIPTION,
    version="1.0.0",
    openapi_tags=OPENAPI_TAGS,
    docs_url=None,
    redoc_url="/redoc",
    swagger_ui_parameters={
        # 默认折叠接口列表，侧栏更清爽；顶部可搜索 Filter
        "docExpansion": "none",
        "defaultModelsExpandDepth": 2,
        "displayRequestDuration": True,
        "filter": True,
        "tryItOutEnabled": True,
    },
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置具体的前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """422 参数校验：返回中文说明，便于前端直接展示。"""
    return JSONResponse(
        status_code=422,
        content={
            "detail": "请求参数校验失败",
            "issues": validation_issues_zh(exc.errors()),
        },
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """把框架自带的英文错误（如未登录、404）改成中文，便于阅读。"""
    detail = translate_http_detail(exc.detail)
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": detail},
        headers=exc.headers,
    )


# 注册路由（分组名与 OPENAPI_TAGS 一致，便于文档侧栏展示中文说明）
app.include_router(auth.router, prefix="/auth", tags=["认证"])
app.include_router(users.router, prefix="/users", tags=["用户"])
app.include_router(services.router, prefix="/services", tags=["业务服务"])
app.include_router(files.router, prefix="/files", tags=["文件"])


@app.get("/", tags=["概览"], summary="服务状态")
def read_root():
    """返回欢迎信息，用于快速确认服务已启动。"""
    return {
        "message": "欢迎使用小红点生活馆 API，服务运行正常。",
        "docs": "/docs",
        "docs_swagger": "/docs/swagger",
        "redoc": "/redoc",
        "openapi_json": "/openapi.json",
    }


def _rapi_doc_page() -> str:
    """RapiDoc + 自建顶栏：与「纯 Swagger 默认页」在版式上明显区分。"""
    title = "小红点生活馆 API"
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title} · 接口文档</title>
  <meta name="theme-color" content="#c41e3a" />
  <style>
    :root {{
      --xhd-red: #c41e3a;
      --xhd-red-dim: #9e1830;
      --xhd-bar-h: 52px;
    }}
    html, body {{ margin: 0; height: 100%; background: #f4f0f2; }}
    .xhd-shell {{ display: flex; flex-direction: column; height: 100vh; }}
    .xhd-bar {{
      flex: 0 0 var(--xhd-bar-h);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 1.25rem;
      background: linear-gradient(105deg, var(--xhd-red) 0%, var(--xhd-red-dim) 42%, #5c1a2e 100%);
      color: #fff;
      font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      box-shadow: 0 4px 24px rgba(196, 30, 58, 0.35);
      z-index: 10;
    }}
    .xhd-bar h1 {{
      margin: 0; font-size: 1.05rem; font-weight: 600; letter-spacing: 0.02em;
      display: flex; align-items: center; gap: 0.5rem;
    }}
    .xhd-bar h1 span {{
      font-weight: 400; opacity: 0.88; font-size: 0.82rem;
    }}
    .xhd-dot {{
      width: 10px; height: 10px; border-radius: 50%;
      background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,0.35);
    }}
    .xhd-links {{ display: flex; gap: 0.35rem; flex-wrap: wrap; justify-content: flex-end; }}
    .xhd-links a {{
      color: #fff; text-decoration: none; font-size: 0.78rem;
      padding: 0.35rem 0.65rem; border-radius: 6px;
      background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.22);
    }}
    .xhd-links a:hover {{ background: rgba(255,255,255,0.22); }}
    .xhd-links a.xhd-active {{ background: rgba(255,255,255,0.28); font-weight: 600; }}
    rapi-doc {{
      display: block;
      width: 100%;
      height: calc(100vh - var(--xhd-bar-h));
      min-height: 400px;
    }}
  </style>
  <script type="module" src="{RAPIDOC_JS}"></script>
</head>
<body>
  <div class="xhd-shell">
    <header class="xhd-bar">
      <h1><span class="xhd-dot" aria-hidden="true"></span> {title} <span>· 开发联调文档（RapiDoc）</span></h1>
      <nav class="xhd-links" aria-label="文档版本切换">
        <a class="xhd-active" href="/docs">当前 · RapiDoc</a>
        <a href="/docs/swagger">Swagger UI</a>
        <a href="/redoc">ReDoc</a>
        <a href="/openapi.json" target="_blank" rel="noopener">openapi.json</a>
      </nav>
    </header>
    <rapi-doc
      spec-url="/openapi.json"
      theme="light"
      render-style="focused"
      show-header="false"
      primary-color="#c41e3a"
      nav-bg-color="#fff5f6"
      nav-text-color="#3d3d3d"
      nav-hover-bg-color="#ffe4e8"
      nav-hover-text-color="#1a1a1a"
      nav-accent-color="#c41e3a"
      show-method-in-nav-bar="as-colored-block"
      bg-color="#ffffff"
      text-color="#242424"
      load-fonts="false"
      regular-font="system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
      mono-font="ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace"
      allow-authentication="true"
      sort-tags="true"
      sort-endpoints-by="path"
      allow-search="true"
      show-curl-before-try="true"
    ></rapi-doc>
  </div>
</body>
</html>"""


@app.get("/docs", include_in_schema=False)
async def api_docs_rapidoc() -> HTMLResponse:
    """主文档：RapiDoc，比默认 Swagger 更易读、更易配色。"""
    return HTMLResponse(content=_rapi_doc_page(), media_type="text/html; charset=utf-8")


@app.get("/docs/swagger", include_in_schema=False)
async def api_docs_swagger_ui() -> HTMLResponse:
    """备用：经典 Swagger UI。"""
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title=f"{app.title} · Swagger",
        swagger_favicon_url="https://fastapi.tiangolo.com/img/favicon.png",
        swagger_ui_parameters=app.swagger_ui_parameters,
    )
