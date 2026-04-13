from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    """用户基础模型"""
    username: str
    email: EmailStr


class UserCreate(UserBase):
    """用户创建模型"""
    password: str


class UserUpdate(BaseModel):
    """用户更新模型"""
    email: Optional[EmailStr] = None
    password: Optional[str] = None


class User(UserBase):
    """用户响应模型"""
    id: int
    is_active: bool
    is_member: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
