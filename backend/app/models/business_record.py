from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class BusinessRecord(Base):
    """账号对应的业务明细记录（由 CSV 导入）。"""

    __tablename__ = "business_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    username = Column(String(64), nullable=False, index=True)
    module = Column(String(100), nullable=False)
    project = Column(String(200), nullable=False)
    unit_price = Column(Float, nullable=True)
    quantity = Column(Float, nullable=True)
    subtotal = Column(Float, nullable=True)
    customer_name = Column(String(100), nullable=True)
    contact = Column(String(50), nullable=True)
    appointment_time = Column(String(100), nullable=True)
    notes = Column(String(500), nullable=True)
    source_file = Column(String(200), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
