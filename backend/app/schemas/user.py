from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator, model_validator
from typing import Optional
from datetime import datetime

from app.core.roles import ADMIN_LOGIN


class UserBase(BaseModel):
    """用户基础模型"""

    username: str = Field(
        ...,
        title="用户名",
        description="登录账号，在系统内唯一",
        min_length=1,
        max_length=64,
    )
    email: EmailStr = Field(..., title="邮箱", description="用于登录与通知的电子邮箱")


class UserCreate(UserBase):
    """注册时提交的数据"""

    model_config = ConfigDict(title="注册新用户")

    password: str = Field(..., title="密码", description="登录密码，请妥善保管")


class UserUpdate(BaseModel):
    """修改个人资料（均为选填）"""

    model_config = ConfigDict(title="修改个人资料")

    email: Optional[EmailStr] = Field(None, title="新邮箱", description="不修改可留空")
    password: Optional[str] = Field(None, title="新密码", description="不修改可留空")


class User(UserBase):
    """接口返回的用户信息"""

    model_config = ConfigDict(from_attributes=True, title="用户信息")

    # 导入历史数据中可能含有非严格 EmailStr 的占位邮箱；返回时用 str 避免列表序列化失败
    email: str = Field(..., title="邮箱", description="用于登录与通知的电子邮箱")
    id: int = Field(..., title="用户编号", description="数据库中的用户 ID")
    is_active: bool = Field(..., title="是否启用", description="账号是否可用")
    is_member: bool = Field(..., title="是否会员", description="会员标识")
    is_admin: bool = Field(False, title="是否管理员", description="后台管理权限")
    sex: Optional[int] = Field(
        None,
        title="性别",
        description="1 男 / 0 女；未填为 null",
    )
    hobby: Optional[str] = Field(None, title="爱好", description="展示用，可空")
    created_at: datetime = Field(..., title="注册时间", description="账号创建时间")
    updated_at: datetime = Field(..., title="更新时间", description="资料最近修改时间")

    @field_validator("is_member", "is_admin", mode="before")
    @classmethod
    def _bool_none_as_false(cls, v: object) -> bool:
        return False if v is None else bool(v)

    @model_validator(mode="after")
    def _admin_only_login_name(self):
        """管理员身份仅由登录名 admin 决定，与数据库 is_admin 列无关。"""
        only = (self.username or "").strip().lower() == ADMIN_LOGIN
        if self.is_admin != only:
            return self.model_copy(update={"is_admin": only})
        return self


class AdminUserPatch(BaseModel):
    """管理员修改会员资料（均为选填）"""

    model_config = ConfigDict(title="管理员更新用户")

    is_member: Optional[bool] = Field(None, title="是否会员")
    sex: Optional[int] = Field(None, description="1 男 0 女")
    hobby: Optional[str] = Field(None, max_length=200)
    email: Optional[EmailStr] = Field(None, title="邮箱")
