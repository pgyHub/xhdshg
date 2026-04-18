from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime


class ServiceBase(BaseModel):
    """服务条目（各业务线展示用）"""

    name: str = Field(..., title="服务名称", description="对外展示的名称")
    category: str = Field(
        ...,
        title="业务分类",
        description="如 wedding、makeup、hair 等，用于筛选",
    )
    price: float = Field(..., title="价格", description="标价，单位与前台约定一致", ge=0)
    description: Optional[str] = Field(None, title="说明", description="服务详细介绍，可空")


class ServiceCreate(ServiceBase):
    """新建一条服务"""

    model_config = ConfigDict(title="新建服务")


class ServiceUpdate(BaseModel):
    """更新服务（均为选填）"""

    model_config = ConfigDict(title="更新服务")

    name: Optional[str] = Field(None, title="服务名称", description="不修改可留空")
    category: Optional[str] = Field(None, title="业务分类", description="不修改可留空")
    price: Optional[float] = Field(None, title="价格", description="不修改可留空", ge=0)
    description: Optional[str] = Field(None, title="说明", description="不修改可留空")


class Service(ServiceBase):
    """接口返回的服务信息"""

    model_config = ConfigDict(from_attributes=True, title="服务信息")

    id: int = Field(..., title="服务编号", description="数据库主键")
    created_at: datetime = Field(..., title="创建时间", description="录入时间")
    updated_at: datetime = Field(..., title="更新时间", description="最近修改时间")
