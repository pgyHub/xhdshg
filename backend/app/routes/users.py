from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_password_hash
from app.models.user import User
from app.models.business_record import BusinessRecord
from app.schemas.user import User as UserSchema, UserCreate, UserUpdate, AdminUserPatch
from app.core.roles import ADMIN_LOGIN, is_super_admin
from .auth import get_current_user, get_current_admin_user

router = APIRouter()


def _serialize_business_records(records: list[BusinessRecord]) -> list[dict]:
    return [
        {
            "id": r.id,
            "module": r.module,
            "project": r.project,
            "unit_price": r.unit_price,
            "quantity": r.quantity,
            "subtotal": r.subtotal,
            "customer_name": r.customer_name,
            "contact": r.contact,
            "appointment_time": r.appointment_time,
            "notes": r.notes,
            "source_file": r.source_file,
            "created_at": r.created_at.isoformat() if r.created_at else None,
        }
        for r in records
    ]


@router.post(
    "/",
    response_model=UserSchema,
    summary="注册新用户",
    description="提交用户名、邮箱、密码。若用户名或邮箱已被占用，会返回中文提示。",
)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """创建新用户"""
    if user.username.strip().lower() == ADMIN_LOGIN:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该用户名为系统保留（管理员专用），请更换其他用户名",
        )
    # 检查用户名是否已存在
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该用户名已被注册",
        )
    # 检查邮箱是否已存在
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="该邮箱已被注册",
        )
    # 创建新用户
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        password_hash=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.get(
    "/me",
    response_model=UserSchema,
    summary="查看当前登录用户",
    description="需要在请求头携带有效令牌。",
)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """获取当前用户信息"""
    return current_user


@router.put(
    "/me",
    response_model=UserSchema,
    summary="修改当前用户资料",
    description="可只改邮箱或密码，未填写的项保持不变。",
)
def update_current_user(user_update: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """更新当前用户信息"""
    if user_update.email:
        current_user.email = user_update.email
    if user_update.password:
        current_user.password_hash = get_password_hash(user_update.password)
    db.commit()
    db.refresh(current_user)
    return current_user


@router.get(
    "/me/details",
    summary="查看当前用户业务明细",
    description="会员/管理员均可查看自己名下业务；可按来源文件筛选。",
)
def get_current_user_details(
    source_file: Optional[str] = Query(None, description="按来源文件筛选（可选）"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    q = db.query(BusinessRecord).filter(BusinessRecord.user_id == current_user.id)
    if source_file:
        q = q.filter(BusinessRecord.source_file == source_file.strip())
    records = q.order_by(BusinessRecord.id.desc()).all()
    return {
        "user": UserSchema.model_validate(current_user),
        "records": _serialize_business_records(records),
    }


# --- 管理后台：挂在同一 `/users` 路由下（与 `/users/me` 同源注册，避免单独 `/admin` 前缀未生效时 404） ---


@router.get(
    "/admin/list",
    summary="分页查询用户（管理员）",
    description="支持用户名/邮箱模糊、性别、注册日期区间筛选。",
    tags=["管理后台"],
)
def admin_list_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    keyword: str = Query("", description="用户名或邮箱模糊"),
    sex: Optional[str] = Query(None, description="男 / 女 / 空为全部"),
    start: Optional[date] = Query(None, description="注册起始日期"),
    end: Optional[date] = Query(None, description="注册截止日期"),
    _: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    q = db.query(User)
    kw = keyword.strip()
    if kw:
        like = f"%{kw}%"
        q = q.filter(or_(User.username.like(like), User.email.like(like), User.hobby.like(like)))
    if sex == "男":
        q = q.filter(User.sex == 1)
    elif sex == "女":
        q = q.filter(User.sex == 0)
    if start is not None:
        q = q.filter(func.date(User.created_at) >= start)
    if end is not None:
        q = q.filter(func.date(User.created_at) <= end)

    total = q.count()
    offset = (page - 1) * limit
    rows = q.order_by(User.id.desc()).offset(offset).limit(limit).all()
    return {
        "total": total,
        "page": page,
        "page_size": limit,
        "items": [UserSchema.model_validate(u) for u in rows],
    }


@router.patch(
    "/admin/{user_id}",
    response_model=UserSchema,
    summary="更新用户（管理员）",
    tags=["管理后台"],
)
def admin_patch_user(
    user_id: int,
    body: AdminUserPatch,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    u = db.query(User).filter(User.id == user_id).first()
    if not u:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="用户不存在")
    if body.email is not None:
        taken = db.query(User).filter(User.email == body.email, User.id != user_id).first()
        if taken:
            raise HTTPException(status_code=400, detail="该邮箱已被其他账号使用")
        u.email = body.email
    if body.is_member is not None:
        u.is_member = body.is_member
    if body.sex is not None:
        u.sex = body.sex
    if body.hobby is not None:
        u.hobby = body.hobby
    db.commit()
    db.refresh(u)
    return u


@router.delete(
    "/admin/{user_id}",
    summary="删除用户（管理员）",
    tags=["管理后台"],
)
def admin_delete_user(
    user_id: int,
    admin: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    if admin.id == user_id:
        raise HTTPException(status_code=400, detail="不能删除当前登录账号")
    u = db.query(User).filter(User.id == user_id).first()
    if not u:
        raise HTTPException(status_code=404, detail="用户不存在")
    if is_super_admin(u):
        raise HTTPException(status_code=400, detail="不能删除系统管理员账号（登录名 admin）")
    db.delete(u)
    db.commit()
    return {"detail": "已删除"}


@router.get(
    "/admin/{user_id}/details",
    summary="查看用户业务明细（管理员）",
    tags=["管理后台"],
)
def admin_user_details(
    user_id: int,
    _: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db),
):
    u = db.query(User).filter(User.id == user_id).first()
    if not u:
        raise HTTPException(status_code=404, detail="用户不存在")
    records = (
        db.query(BusinessRecord)
        .filter(BusinessRecord.user_id == user_id)
        .order_by(BusinessRecord.id.desc())
        .all()
    )
    return {
        "user": UserSchema.model_validate(u),
        "records": _serialize_business_records(records),
    }
