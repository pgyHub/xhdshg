from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import func
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import timedelta
from app.core.database import get_db
from app.core.security import verify_password, create_access_token
from app.core.config import settings
from app.models.user import User
from app.schemas.auth import Token, TokenData, UserLogin
from app.core.roles import is_super_admin

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
    scheme_name="JWT 令牌",
    description="请先调用下方「登录获取令牌」接口，在 HTTP 请求头填写：Authorization: Bearer <返回的 access_token>",
)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """获取当前用户"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="无法验证身份，请重新登录或检查令牌是否有效。",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        sub = payload.get("sub")
        if sub is None:
            raise credentials_exception
        token_data = TokenData(username=str(sub))
    except JWTError:
        raise credentials_exception
    # 与登录一致：按用户名不区分大小写解析（避免 JWT sub 与库中大小写偶发不一致时整站 401）
    sub_norm = (token_data.username or "").strip()
    user = db.query(User).filter(func.lower(User.username) == sub_norm.lower()).first()
    if user is None:
        raise credentials_exception
    return user


def get_current_privileged_user(current_user: User = Depends(get_current_user)) -> User:
    """仅会员或唯一管理员账号（登录名 admin）可使用会员中心与文件等能力。"""
    if not (current_user.is_member or is_super_admin(current_user)):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="仅会员或管理员可使用会员后台与相关功能，请联系运营开通会员；管理员账号为系统固定。",
        )
    return current_user


def get_current_admin_user(current_user: User = Depends(get_current_user)) -> User:
    """仅登录名为 admin 的账号具备管理后台权限。"""
    if not is_super_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="仅管理员账号（登录名 admin）可执行此操作。",
        )
    return current_user


@router.post(
    "/login",
    response_model=Token,
    summary="登录获取令牌",
    description="使用表单提交「用户名、密码」（与常见网页登录相同）。成功后请复制 access_token，在需要登录的接口里带上 Bearer。",
)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """用户登录"""
    user = db.query(User).filter(
        func.lower(User.username) == (form_data.username or "").strip().lower()
    ).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="用户名或密码错误",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
