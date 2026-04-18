from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class UserLogin(BaseModel):
    """用 JSON 演示登录时的结构（网页表单登录以 OAuth2 为准）"""

    model_config = ConfigDict(title="登录示例（JSON）")

    username: str = Field(..., title="用户名", description="与注册时一致")
    password: str = Field(..., title="密码", description="登录密码")


class Token(BaseModel):
    """登录成功后返回的令牌"""

    model_config = ConfigDict(title="登录令牌")

    access_token: str = Field(..., title="访问令牌", description="JWT，请在后续请求头里作为 Bearer 使用")
    token_type: str = Field(..., title="令牌类型", description="一般为 bearer（小写）")


class TokenData(BaseModel):
    """解析令牌时的内部数据（一般不在接口里直接返回）"""

    model_config = ConfigDict(title="令牌内嵌数据")

    username: Optional[str] = Field(None, title="用户名", description="当前用户登录名")
