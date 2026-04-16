from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, users, services, files
from app.core.config import settings

app = FastAPI(
    title="小红点生活馆 API",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置具体的前端域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(services.router, prefix="/services", tags=["services"])
app.include_router(files.router, prefix="/files", tags=["files"])

@app.get("/")
def read_root():
    return {"message": "Welcome to 小红点生活馆 API"}
