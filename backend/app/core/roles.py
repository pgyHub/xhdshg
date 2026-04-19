"""系统角色：唯一后台管理员由固定登录名决定，不依赖数据库 is_admin 字段随意分配。"""

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.user import User

# 唯一具备「管理后台」权限的登录名（不区分大小写）
ADMIN_LOGIN = "admin"


def is_super_admin(user: "User") -> bool:
    return (getattr(user, "username", None) or "").strip().lower() == ADMIN_LOGIN
