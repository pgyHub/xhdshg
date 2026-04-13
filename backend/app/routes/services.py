from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.service import Service
from app.models.user import User
from app.schemas.service import Service as ServiceSchema, ServiceCreate, ServiceUpdate
from .auth import get_current_user

router = APIRouter()


@router.get("/", response_model=List[ServiceSchema])
def get_services(category: Optional[str] = None, db: Session = Depends(get_db)):
    """获取服务列表"""
    query = db.query(Service)
    if category:
        query = query.filter(Service.category == category)
    return query.all()


@router.get("/{service_id}", response_model=ServiceSchema)
def get_service(service_id: int, db: Session = Depends(get_db)):
    """获取服务详情"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    return service


@router.post("/", response_model=ServiceSchema)
def create_service(service: ServiceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """创建服务"""
    db_service = Service(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service


@router.put("/{service_id}", response_model=ServiceSchema)
def update_service(service_id: int, service_update: ServiceUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """更新服务"""
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    for key, value in service_update.model_dump(exclude_unset=True).items():
        setattr(db_service, key, value)
    db.commit()
    db.refresh(db_service)
    return db_service


@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """删除服务"""
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Service not found"
        )
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted successfully"}
