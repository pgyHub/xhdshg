from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Annotated, List, Optional
from app.core.database import get_db
from app.models.service import Service
from app.models.user import User
from app.schemas.service import Service as ServiceSchema, ServiceCreate, ServiceUpdate
from .auth import get_current_user

router = APIRouter()


@router.get(
    "/",
    response_model=List[ServiceSchema],
    summary="服务列表",
    description="可按「业务分类」筛选；不填则返回全部服务。",
)
def get_services(
    category: Annotated[
        Optional[str],
        Query(description="业务分类，可选。例如 wedding、makeup。"),
    ] = None,
    db: Session = Depends(get_db),
):
    """获取服务列表"""
    query = db.query(Service)
    if category:
        query = query.filter(Service.category == category)
    return query.all()


@router.get(
    "/{service_id}",
    response_model=ServiceSchema,
    summary="服务详情",
    description="根据服务编号查询单条记录。",
)
def get_service(service_id: int, db: Session = Depends(get_db)):
    """获取服务详情"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="未找到对应的服务",
        )
    return service


@router.post(
    "/",
    response_model=ServiceSchema,
    summary="新建服务",
    description="需要登录。用于后台维护各业务线的服务条目。",
)
def create_service(service: ServiceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """创建服务"""
    db_service = Service(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


@router.put(
    "/{service_id}",
    response_model=ServiceSchema,
    summary="更新服务",
    description="需要登录。只传需要修改的字段即可。",
)
def update_service(service_id: int, service_update: ServiceUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """更新服务"""
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="未找到对应的服务",
        )
    for key, value in service_update.model_dump(exclude_unset=True).items():
        setattr(db_service, key, value)
    db.commit()
    db.refresh(db_service)
    return db_service


@router.delete(
    "/{service_id}",
    summary="删除服务",
    description="需要登录。删除后不可恢复，请谨慎操作。",
)
def delete_service(service_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """删除服务"""
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="未找到对应的服务",
        )
    db.delete(db_service)
    db.commit()
    return {"message": "服务已删除"}
