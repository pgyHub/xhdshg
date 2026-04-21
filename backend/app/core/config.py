from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# backend 根目录（.../backend/app/core/config.py → parents[2]）
_BACKEND_DIR = Path(__file__).resolve().parents[2]
# 固定库文件位置，避免在 C: 用户目录、项目根目录等不同 cwd 下启动时出现多个 xiaohongdian.db，导致 ensure_admin 与登录用的不是同一库
_DEFAULT_SQLITE_URL = f"sqlite:///{(_BACKEND_DIR / 'xiaohongdian.db').resolve().as_posix()}"


_env_path = _BACKEND_DIR / ".env"
_settings_kw: dict = {"extra": "ignore"}
if _env_path.is_file():
    _settings_kw["env_file"] = str(_env_path)
    _settings_kw["env_file_encoding"] = "utf-8"


class Settings(BaseSettings):
    """应用配置"""

    model_config = SettingsConfigDict(**_settings_kw)

    # 数据库配置（可被环境变量覆盖）
    DATABASE_URL: str = _DEFAULT_SQLITE_URL

    # 安全配置
    SECRET_KEY: str = "your-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    # 生产示例：CORS_ORIGINS=https://你的域名.com,https://www.你的域名.com
    # 为 * 或未配置时：允许任意来源但不携带 Cookie 凭证（与浏览器规范一致）
    CORS_ORIGINS: str = "*"
    # 单次上传单文件最大体积（字节），防止恶意大包占满内存
    MAX_UPLOAD_BYTES: int = 10 * 1024 * 1024

    # 应用配置
    APP_NAME: str = "小红点生活馆"
    APP_VERSION: str = "1.0.0"


settings = Settings()
