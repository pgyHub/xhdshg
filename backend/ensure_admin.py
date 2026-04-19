"""
本地/首次部署：确保存在登录名 admin 的账号（注册接口禁止自助注册该用户名）。

用法（在 backend 目录下）:
  python ensure_admin.py              # 若不存在 admin 则创建
  python ensure_admin.py --reset      # 已存在时也把密码重置为初始密码

环境变量（可选）:
  ADMIN_INITIAL_PASSWORD   初始/重置后的密码，默认 admin123
  ADMIN_EMAIL              新建 admin 的邮箱，默认 admin@local.invalid
"""
from __future__ import annotations

import argparse
import os
import sys

# 保证能 import app.*
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy import func  # noqa: E402

from app.core.config import settings  # noqa: E402
from app.core.database import Base, SessionLocal, engine  # noqa: E402
from app.core.roles import ADMIN_LOGIN  # noqa: E402
from app.core.security import get_password_hash  # noqa: E402
from app.models.user import User  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description="创建或重置 admin 账号")
    parser.add_argument(
        "--reset",
        action="store_true",
        help="若已存在 admin，仍将密码重置为初始密码",
    )
    args = parser.parse_args()

    password = (os.environ.get("ADMIN_INITIAL_PASSWORD") or "admin123").strip()
    if not password:
        print("错误: ADMIN_INITIAL_PASSWORD 不能为空")
        sys.exit(1)
    email = (os.environ.get("ADMIN_EMAIL") or "admin@local.invalid").strip()

    print("使用数据库:", settings.DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        u = db.query(User).filter(func.lower(User.username) == ADMIN_LOGIN).first()
        pwd_hash = get_password_hash(password)

        if u is None:
            u = User(username=ADMIN_LOGIN, email=email, password_hash=pwd_hash)
            db.add(u)
            db.commit()
            print(f"已创建管理员账号「{ADMIN_LOGIN}」，邮箱: {email}，密码: {password}")
            return

        if args.reset:
            u.password_hash = pwd_hash
            db.commit()
            print(f"已重置「{ADMIN_LOGIN}」的密码为: {password}")
            return

        print(
            f"管理员「{ADMIN_LOGIN}」已存在 (id={u.id})，未修改密码。\n"
            f"若忘记密码，请执行: python ensure_admin.py --reset\n"
            f"或设置环境变量 ADMIN_INITIAL_PASSWORD 后加 --reset"
        )
    finally:
        db.close()


if __name__ == "__main__":
    main()
