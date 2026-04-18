from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing import Optional
from datetime import datetime


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

    id: int = Field(..., title="用户编号", description="数据库中的用户 ID")
    is_active: bool = Field(..., title="是否启用", description="账号是否可用")
    is_member: bool = Field(..., title="是否会员", description="会员标识")
    created_at: datetime = Field(..., title="注册时间", description="账号创建时间")
    updated_at: datetime = Field(..., title="更新时间", description="资料最近修改时间")
