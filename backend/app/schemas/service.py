from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ServiceBase(BaseModel):
    """服务基础模型"""
    name: str
    category: str
    price: float
    description: Optional[str] = None


class ServiceCreate(ServiceBase):
    """服务创建模型"""
    pass


class ServiceUpdate(BaseModel):
    """服务更新模型"""
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None


class Service(ServiceBase):
    """服务响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
