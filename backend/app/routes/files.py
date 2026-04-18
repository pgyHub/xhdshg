from fastapi import APIRouter, Depends, HTTPException, Path, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import Annotated, List
import os
from app.core.database import get_db
from app.models.user import User
from .auth import get_current_user

router = APIRouter()

# 确保上传目录存在
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)


@router.post(
    "/upload",
    summary="批量上传文件",
    description="需要登录。可选择多个文件一次上传。",
)
async def upload_files(
    files: List[UploadFile] = File(..., description="要上传的一个或多个文件"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """批量上传文件"""
    uploaded_files = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        uploaded_files.append({
            "filename": file.filename,
            "path": file_path
        })
    return {
        "message": "上传完成",
        "uploaded_files": uploaded_files,
    }


@router.get(
    "/download/{filename}",
    summary="获取已上传文件信息",
    description="需要登录。根据文件名检查服务器上是否存在该文件（下载链接一般由前端拼接）。",
)
def download_file(
    filename: Annotated[str, Path(description="服务器上的文件名")],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """下载文件"""
    file_path = os.path.join(UPLOAD_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="文件不存在",
        )
    return {
        "message": "文件存在",
        "file_path": file_path,
        "filename": filename,
    }


@router.get(
    "/list",
    summary="文件列表",
    description="需要登录。列出上传目录中的文件名与大小。",
)
def list_files(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """列出所有文件"""
    files = []
    if os.path.exists(UPLOAD_DIR):
        for filename in os.listdir(UPLOAD_DIR):
            file_path = os.path.join(UPLOAD_DIR, filename)
            if os.path.isfile(file_path):
                files.append({
                    "filename": filename,
                    "size": os.path.getsize(file_path)
                })
    return {"message": "列表如下", "files": files}
