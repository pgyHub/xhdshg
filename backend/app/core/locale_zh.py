"""中文错误提示：校验错误与通用文案。"""
from __future__ import annotations

from typing import Any


def validation_issues_zh(errors: list[dict[str, Any]]) -> list[dict[str, str]]:
    """将 Pydantic/FastAPI 422 错误转为中文说明。"""
    out: list[dict[str, str]] = []
    for err in errors:
        loc_parts = [str(x) for x in err.get("loc", ()) if str(x) not in ("body", "query", "path", "header")]
        field = " · ".join(loc_parts) if loc_parts else "请求"
        typ = err.get("type", "")
        msg = str(err.get("msg", ""))
        out.append(
            {
                "字段": field,
                "说明": _single_error_zh(typ, msg, field),
            }
        )
    return out


def _single_error_zh(err_type: str, msg: str, field: str) -> str:
    if err_type == "missing":
        return f"「{field}」为必填项，请补充后重试。"
    if err_type == "string_too_short":
        return f"「{field}」长度过短，请满足最小长度要求。"
    if err_type == "string_too_long":
        return f"「{field}」长度过长。"
    if err_type in ("value_error.email", "value_error"):
        if "email" in msg.lower():
            return "邮箱格式不正确，请填写有效电子邮箱。"
        return msg
    if err_type == "float_parsing":
        return f"「{field}」需为数字。"
    if err_type == "int_parsing":
        return f"「{field}」需为整数。"
    if err_type == "bool_parsing":
        return f"「{field}」需为 true/false。"
    if err_type == "dict_type":
        return f"「{field}」需为对象(JSON)。"
    if err_type == "list_type":
        return f"「{field}」需为数组。"
    if "Field required" in msg or (err_type and err_type.endswith("missing")):
        return f"「{field}」为必填项。"
    if err_type == "uuid_parsing":
        return f"「{field}」需为合法 UUID。"
    return f"「{field}」校验未通过：{msg}"


# FastAPI / Starlette / Uvicorn 常见英文错误 → 中文（便于不懂英文时阅读）
HTTP_DETAIL_ZH: dict[str, str] = {
    "Not authenticated": "未登录：请先在「认证 → 登录」获取令牌，再在文档页点击 Authorize，输入 Bearer 和你的 token。",
    "Not Found": "未找到该地址或资源，请检查网址、路径参数和请求方法（GET/POST 等）是否正确。",
    "Method Not Allowed": "该地址不允许使用当前的请求方法，例如接口要求 POST 却用了 GET。",
    "Forbidden": "没有权限访问。",
    "Unauthorized": "未授权，请登录后再试。",
    "Internal Server Error": "服务器内部错误，请稍后重试或联系管理员。",
    "Bad Request": "请求格式不正确。",
    "Could not validate credentials": "无法验证登录状态，请重新登录。",
    "Incorrect username or password": "用户名或密码错误",
}


def translate_http_detail(detail: object) -> object:
    """将常见英文 detail 译为中文；已是中文或未收录的则原样返回。"""
    if isinstance(detail, str):
        return HTTP_DETAIL_ZH.get(detail, detail)
    return detail
