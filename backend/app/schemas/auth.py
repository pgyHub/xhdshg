from pydantic import BaseModel
from typing import Optional


class UserLogin(BaseModel):
    """用户登录请求"""
    username: str
    password: str


class Token(BaseModel):
    """令牌响应"""
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """令牌数据"""
    username: Optional[str] = None
