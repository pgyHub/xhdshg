from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import HTMLResponse
from app.routes import auth, users, services, files
from app.core.config import settings

API_DESCRIPTION = """
## 小红点生活馆 · 后端服务

面向前端与运营调试的 REST API。开发环境下可使用本页 **Try it out** 直接联调。

### 使用顺序（建议）

1. **用户** → `POST /users/` 注册账号（或使用已有账号）
2. **认证** → `POST /auth/login` 登录，复制返回的 `access_token`
3. 点击页面右上角 **Authorize**，在框中输入：`Bearer <你的token>`（注意 `Bearer` 后有一个空格），或只粘贴 token（视 Swagger 版本而定）
4. 再调用带锁图标的 **用户 / 业务服务 / 文件** 接口

### 其他文档

- **ReDoc**（更适合阅读）：同一服务下的 `/redoc` 页面，布局为左导航 + 右正文，便于浏览长文档。
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
        "description": "上传、列表与下载（均需登录）。",
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

# 注册路由（分组名与 OPENAPI_TAGS 一致，便于文档侧栏展示中文说明）
app.include_router(auth.router, prefix="/auth", tags=["认证"])
app.include_router(users.router, prefix="/users", tags=["用户"])
app.include_router(services.router, prefix="/services", tags=["业务服务"])
app.include_router(files.router, prefix="/files", tags=["文件"])


@app.get("/", tags=["概览"], summary="服务状态")
def read_root():
    """返回欢迎信息，用于快速确认服务已启动。"""
    return {
        "message": "Welcome to 小红点生活馆 API",
        "docs": "/docs",
        "redoc": "/redoc",
        "openapi_json": "/openapi.json",
    }


@app.get("/docs", include_in_schema=False)
async def custom_swagger_docs() -> HTMLResponse:
    """自定义 Swagger UI 页：补充标题与 favicon，避免默认页过于简陋。"""
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title=f"{app.title} · 调试文档",
        swagger_favicon_url="https://fastapi.tiangolo.com/img/favicon.png",
        swagger_ui_parameters=app.swagger_ui_parameters,
    )
