from fastapi import APIRouter, Depends, HTTPException, Path, status, UploadFile, File
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Annotated, List, Dict, Set
from collections import defaultdict
import csv
import io
import os
from app.core.database import get_db
from app.core.security import get_password_hash
from app.models.user import User
from app.models.business_record import BusinessRecord
from .auth import get_current_privileged_user

router = APIRouter()

# 确保上传目录存在
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

CSV_PHONE_FIELDS = ("手机号码", "手机号", "联系方式")
CSV_LOGIN_FIELDS = ("登录账号", "用户名")
CSV_PASSWORD_FIELDS = ("初始密码", "登录密码")
CSV_EMAIL_FIELD = "邮箱"
CSV_DEMAND_FIELDS = ("需求类型", "爱好/需求", "爱好")
CSV_SEX_FIELD = "性别"
CSV_MEMBER_FIELD = "会员"
CSV_BIZ_USERNAME_FIELDS = ("用户名", "登录账号")
CSV_BIZ_MODULE_FIELDS = ("业务模块", "服务模块", "定制品类", "空间区域", "服务场景", "套系名称")
CSV_BIZ_PROJECT_FIELDS = ("订单项目", "服务项目", "妆造项目", "拍摄项目", "款式名称", "定制项目")
CSV_BIZ_UNIT_PRICE_FIELDS = ("单价(元)", "单价", "价格")
CSV_BIZ_QTY_FIELDS = ("数量",)
CSV_BIZ_SUBTOTAL_FIELDS = ("小计(元)", "小计")
CSV_BIZ_CUSTOMER_FIELDS = ("客户姓名",)
CSV_BIZ_CONTACT_FIELDS = ("联系方式", "手机号", "手机号码")
CSV_BIZ_APPOINTMENT_FIELDS = ("预约时间", "预约档期", "量房时间")
CSV_BIZ_NOTE_FIELDS = ("备注",)


def _parse_csv_rows(raw: bytes, filename: str) -> tuple[list[str], list[dict[str, str]]]:
    """解析 CSV（支持 UTF-8 BOM / GBK），返回 DictReader 行数据。"""
    text = ""
    for encoding in ("utf-8-sig", "gbk"):
        try:
            text = raw.decode(encoding)
            break
        except UnicodeDecodeError:
            continue
    if text == "":
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"文件 {filename} 编码不支持，请使用 UTF-8 或 GBK 保存 CSV。",
        )

    stream = io.StringIO(text)
    reader = csv.DictReader(stream)
    if reader.fieldnames is None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"文件 {filename} 为空或缺少表头。",
        )
    return reader.fieldnames, list(reader)


def _pick_first_header(headers: list[str], candidates: tuple[str, ...]) -> str | None:
    return next((h for h in candidates if h in set(headers)), None)


def _parse_member_flag(v: str) -> bool:
    t = (v or "").strip()
    if t in ("是", "1", "true", "True", "Y", "y"):
        return True
    if t in ("否", "0", "false", "False", "N", "n"):
        return False
    return True


def _parse_sex(v: str) -> int | None:
    t = (v or "").strip()
    if t in ("男", "1"):
        return 1
    if t in ("女", "0"):
        return 0
    return None


def _to_float(v: str | None) -> float | None:
    t = (v or "").strip()
    if not t:
        return None
    try:
        return float(t)
    except ValueError:
        return None


def _check_csv_duplicates(
    headers: list[str], rows: list[dict[str, str]], filename: str, db: Session
) -> None:
    """校验文件内重复（仅「批量建账号」模板：同时含登录列与初始密码列时生效）。

    业务明细 CSV 可能含「用户名」列或客户联系方式多行相同，不应按建号规则拦截。
    """
    login_field = _pick_first_header(headers, CSV_LOGIN_FIELDS)
    password_field = _pick_first_header(headers, CSV_PASSWORD_FIELDS)
    phone_field = next((f for f in CSV_PHONE_FIELDS if f in headers), None)

    # 无批量建账号列时，不按登录/密码规则校验（业务预约多行可同会员、同电话）
    if login_field is None or password_field is None:
        return

    login_rows: Dict[str, List[int]] = defaultdict(list)
    phone_rows: Dict[str, List[int]] = defaultdict(list)
    empty_logins: List[int] = []
    empty_passwords: List[int] = []
    for idx, row in enumerate(rows, start=2):  # CSV 第 1 行为表头
        login = (row.get(login_field) or "").strip()
        phone = (row.get(phone_field) or "").strip() if phone_field else ""
        password = (row.get(password_field) or "").strip()
        if not login:
            empty_logins.append(idx)
        if not password:
            empty_passwords.append(idx)
        if login:
            login_rows[login.lower()].append(idx)
        if phone:
            phone_rows[phone].append(idx)

    dup_logins = {v: lines for v, lines in login_rows.items() if len(lines) > 1}
    dup_phones = {v: lines for v, lines in phone_rows.items() if len(lines) > 1}
    email_rows: Dict[str, List[int]] = defaultdict(list)
    for idx, row in enumerate(rows, start=2):
        email = (row.get(CSV_EMAIL_FIELD) or "").strip().lower()
        if email:
            email_rows[email].append(idx)

    problems: List[str] = []
    if dup_logins:
        msg = "登录账号重复：" + "；".join(
            [f"{val}（第{','.join(map(str, lines))}行）" for val, lines in dup_logins.items()]
        )
        problems.append(msg)
    if dup_phones:
        msg = "手机号码重复：" + "；".join(
            [f"{val}（第{','.join(map(str, lines))}行）" for val, lines in dup_phones.items()]
        )
        problems.append(msg)
    if empty_logins:
        problems.append(f"登录账号不能为空：第{','.join(map(str, empty_logins))}行")
    if empty_passwords:
        problems.append(f"初始密码不能为空：第{','.join(map(str, empty_passwords))}行")

    if problems:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"文件 {filename} 校验失败：{'；'.join(problems)}",
        )


def _next_available_email(db: Session, base_local: str, taken: Set[str] | None = None) -> str:
    """生成唯一邮箱（用于模板未提供邮箱时）。"""
    local = base_local or "user"
    domain = "import.example.com"
    email = f"{local}@{domain}"
    taken_set = taken or set()
    if email.lower() not in taken_set and not db.query(User).filter(User.email == email).first():
        return email
    i = 1
    while True:
        candidate = f"{local}-{i}@{domain}"
        if candidate.lower() not in taken_set and not db.query(User).filter(User.email == candidate).first():
            return candidate
        i += 1


def _import_csv_accounts(headers: list[str], rows: list[dict[str, str]], db: Session) -> dict:
    login_field = _pick_first_header(headers, CSV_LOGIN_FIELDS)
    password_field = _pick_first_header(headers, CSV_PASSWORD_FIELDS)
    demand_field = _pick_first_header(headers, CSV_DEMAND_FIELDS)
    if login_field is None or password_field is None:
        return {
            "created_usernames": [],
            "skipped_existing_logins": [],
            "skipped_existing_emails": [],
        }

    """
    将 CSV 行导入用户表，账号+初始密码可直接登录。
    - 登录账号 -> users.username
    - 初始密码 -> users.password_hash（bcrypt）
    - 邮箱优先读取“邮箱”列；未提供时自动生成唯一邮箱
    """
    created_usernames: List[str] = []
    skipped_existing_logins: List[str] = []
    reused_or_conflict_emails: List[str] = []

    login_values = sorted(
        {(row.get(login_field or "") or "").strip().lower() for row in rows if (row.get(login_field or "") or "").strip()}
    )
    existed_logins: Set[str] = set()
    if login_values:
        existed_logins = {
            u.username.lower()
            for u in db.query(User).filter(func.lower(User.username).in_(login_values)).all()
        }

    email_values = sorted(
        {(row.get(CSV_EMAIL_FIELD) or "").strip().lower() for row in rows if (row.get(CSV_EMAIL_FIELD) or "").strip()}
    )
    existed_emails: Set[str] = set()
    if email_values:
        existed_emails = {
            u.email.lower()
            for u in db.query(User).filter(func.lower(User.email).in_(email_values)).all()
        }
    for row in rows:
        username_raw = (row.get(login_field or "") or "").strip()
        password_raw = (row.get(password_field or "") or "").strip()
        if not username_raw or not password_raw:
            continue
        username = username_raw
        if username.lower() in existed_logins:
            skipped_existing_logins.append(username)
            continue
        email_raw = (row.get(CSV_EMAIL_FIELD) or "").strip()
        # 邮箱冲突（系统已存在或文件内重复）时不拦截，自动生成唯一邮箱继续导入
        if email_raw and email_raw.lower() not in existed_emails:
            email = email_raw
        else:
            if email_raw:
                reused_or_conflict_emails.append(email_raw)
            email = _next_available_email(db, username.lower(), existed_emails)
        hobby_raw = (row.get(demand_field or "") or "").strip()
        sex = _parse_sex(row.get(CSV_SEX_FIELD) or "")
        is_member = _parse_member_flag(row.get(CSV_MEMBER_FIELD) or "")
        user = User(
            username=username,
            email=email,
            password_hash=get_password_hash(password_raw),
            is_active=True,
            is_member=is_member,
            sex=sex,
            hobby=hobby_raw or None,
        )
        db.add(user)
        created_usernames.append(username)
        existed_logins.add(username.lower())
        existed_emails.add(email.lower())
    db.commit()
    return {
        "created_usernames": created_usernames,
        "skipped_existing_logins": sorted(set(skipped_existing_logins)),
        "skipped_existing_emails": sorted(set(reused_or_conflict_emails)),
    }


def _import_business_records(
    headers: list[str],
    rows: list[dict[str, str]],
    filename: str,
    db: Session,
    current_user: User,
) -> dict:
    """将业务明细导入 business_records；无用户名列时归属当前登录会员。"""
    username_field = _pick_first_header(headers, CSV_BIZ_USERNAME_FIELDS)
    module_field = _pick_first_header(headers, CSV_BIZ_MODULE_FIELDS)
    project_field = _pick_first_header(headers, CSV_BIZ_PROJECT_FIELDS)
    unit_price_field = _pick_first_header(headers, CSV_BIZ_UNIT_PRICE_FIELDS)
    qty_field = _pick_first_header(headers, CSV_BIZ_QTY_FIELDS)
    subtotal_field = _pick_first_header(headers, CSV_BIZ_SUBTOTAL_FIELDS)
    customer_field = _pick_first_header(headers, CSV_BIZ_CUSTOMER_FIELDS)
    contact_field = _pick_first_header(headers, CSV_BIZ_CONTACT_FIELDS)
    appointment_field = _pick_first_header(headers, CSV_BIZ_APPOINTMENT_FIELDS)
    note_field = _pick_first_header(headers, CSV_BIZ_NOTE_FIELDS)

    if module_field is None or project_field is None:
        return {"imported_records": 0, "skipped_unknown_users": []}

    use_session_owner = username_field is None
    user_map: Dict[str, User] = {}
    if not use_session_owner:
        usernames = sorted(
            {
                (row.get(username_field or "") or "").strip().lower()
                for row in rows
                if (row.get(username_field or "") or "").strip()
            }
        )
        if usernames:
            users = db.query(User).filter(func.lower(User.username).in_(usernames)).all()
            user_map = {u.username.lower(): u for u in users}

    imported = 0
    skipped_unknown_users: List[str] = []
    for row in rows:
        module = (row.get(module_field) or "").strip()
        project = (row.get(project_field) or "").strip()
        if not module or not project:
            continue
        if use_session_owner:
            user = current_user
        else:
            username = (row.get(username_field or "") or "").strip()
            if not username:
                continue
            user = user_map.get(username.lower())
            if user is None:
                skipped_unknown_users.append(username)
                continue

        record = BusinessRecord(
            user_id=user.id,
            username=user.username,
            module=module,
            project=project,
            unit_price=_to_float(row.get(unit_price_field or "")),
            quantity=_to_float(row.get(qty_field or "")),
            subtotal=_to_float(row.get(subtotal_field or "")),
            customer_name=(row.get(customer_field or "") or "").strip() or None,
            contact=(row.get(contact_field or "") or "").strip() or None,
            appointment_time=(row.get(appointment_field or "") or "").strip() or None,
            notes=(row.get(note_field or "") or "").strip() or None,
            source_file=filename,
        )
        db.add(record)
        imported += 1

    if imported > 0:
        db.commit()

    return {"imported_records": imported, "skipped_unknown_users": sorted(set(skipped_unknown_users))}


@router.post(
    "/upload",
    summary="批量上传文件",
    description="需要登录。可选择多个文件一次上传。",
)
async def upload_files(
    files: List[UploadFile] = File(..., description="要上传的一个或多个文件"),
    current_user: User = Depends(get_current_privileged_user),
    db: Session = Depends(get_db),
):
    """批量上传文件"""
    uploaded_files = []
    imported_users = 0
    skipped_import_files: List[str] = []
    file_import_reports: List[dict] = []
    created_usernames: List[str] = []
    imported_business_records = 0
    skipped_unknown_business_users: List[str] = []
    for file in files:
        raw = await file.read()
        if file.filename.lower().endswith(".csv"):
            headers, rows = _parse_csv_rows(raw, file.filename)
            _check_csv_duplicates(headers, rows, file.filename, db)
            import_result = _import_csv_accounts(headers, rows, db)
            biz_result = _import_business_records(headers, rows, file.filename, db, current_user)
            created_in_file = import_result["created_usernames"]
            imported_users += len(created_in_file)
            created_usernames.extend(created_in_file)
            imported_business_records += biz_result["imported_records"]
            skipped_unknown_business_users.extend(biz_result["skipped_unknown_users"])
            file_import_reports.append(
                {
                    "filename": file.filename,
                    "imported_users": len(created_in_file),
                    "imported_business_records": biz_result["imported_records"],
                    "created_usernames": created_in_file,
                    "skipped_existing_logins": import_result["skipped_existing_logins"],
                    "skipped_existing_emails": import_result["skipped_existing_emails"],
                    "skipped_unknown_business_users": biz_result["skipped_unknown_users"],
                }
            )
        else:
            skipped_import_files.append(file.filename)
            file_import_reports.append(
                {
                    "filename": file.filename,
                    "imported_users": 0,
                    "imported_business_records": 0,
                    "created_usernames": [],
                    "skipped_existing_logins": [],
                    "skipped_existing_emails": [],
                    "skipped_unknown_business_users": [],
                }
            )
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            buffer.write(raw)
        uploaded_files.append({
            "filename": file.filename,
            "path": file_path
        })
    msg = f"上传完成（新增可登录账号 {imported_users} 个）"
    total_skipped_logins = sorted(
        {
            login
            for report in file_import_reports
            for login in report.get("skipped_existing_logins", [])
        }
    )
    total_skipped_emails = sorted(
        {
            email
            for report in file_import_reports
            for email in report.get("skipped_existing_emails", [])
        }
    )
    if total_skipped_logins:
        msg += f"；已跳过系统已存在账号：{', '.join(total_skipped_logins)}"
    if total_skipped_emails:
        msg += f"；已跳过系统已存在邮箱：{', '.join(total_skipped_emails)}"
    if imported_business_records > 0:
        msg += f"；新增业务明细 {imported_business_records} 条"
    unknown_users = sorted(set(skipped_unknown_business_users))
    if unknown_users:
        msg += f"；以下用户名未找到对应账号，业务明细未入库：{', '.join(unknown_users)}"
    if imported_users == 0 and not total_skipped_logins and not total_skipped_emails:
        msg = "上传完成（仅业务资料，未导入账号）"
    if skipped_import_files:
        msg += f"；以下文件仅上传未导入账号：{', '.join(skipped_import_files)}（仅 CSV 支持账号导入）"
    return {
        "message": msg,
        "uploaded_files": uploaded_files,
        "imported_users": imported_users,
        "skipped_import_files": skipped_import_files,
        "file_import_reports": file_import_reports,
        "created_usernames": created_usernames,
        "imported_business_records": imported_business_records,
        "skipped_unknown_business_users": unknown_users,
    }


@router.get(
    "/download/{filename}",
    summary="获取已上传文件信息",
    description="需要登录。根据文件名检查服务器上是否存在该文件（下载链接一般由前端拼接）。",
)
def download_file(
    filename: Annotated[str, Path(description="服务器上的文件名")],
    current_user: User = Depends(get_current_privileged_user),
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


@router.delete(
    "/{filename}",
    summary="删除已上传文件",
    description="需要登录。按文件名删除上传目录中的文件。",
)
def delete_file(
    filename: Annotated[str, Path(description="服务器上的文件名")],
    current_user: User = Depends(get_current_privileged_user),
    db: Session = Depends(get_db),
):
    """删除文件；若为 CSV，同步删除其“登录账号”对应的用户。"""
    safe_name = os.path.basename(filename)
    if safe_name != filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="非法文件名")
    file_path = os.path.join(UPLOAD_DIR, safe_name)
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="文件不存在",
        )
    if not os.path.isfile(file_path):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="仅支持删除文件",
        )

    deleted_users = 0
    deleted_usernames: List[str] = []
    deleted_business_records = 0
    if safe_name.lower().endswith(".csv"):
        with open(file_path, "rb") as f:
            raw = f.read()
        try:
            headers, rows = _parse_csv_rows(raw, safe_name)
            login_field = _pick_first_header(headers, CSV_LOGIN_FIELDS)
            if login_field is not None:
                usernames = sorted(
                    {
                        (row.get(login_field) or "").strip().lower()
                        for row in rows
                        if (row.get(login_field) or "").strip()
                    }
                )
                if usernames:
                    users = db.query(User).filter(func.lower(User.username).in_(usernames)).all()
                    for u in users:
                        deleted_usernames.append(u.username)
                        db.delete(u)
                    deleted_users = len(users)
                    if deleted_users > 0:
                        db.commit()
        except HTTPException:
            # 文件可删除，但 CSV 解析失败时不阻断删除流程
            pass

    os.remove(file_path)
    deleted_business_records = (
        db.query(BusinessRecord).filter(BusinessRecord.source_file == safe_name).delete()
    )
    if deleted_business_records > 0:
        db.commit()
    return {
        "message": "删除成功",
        "filename": safe_name,
        "deleted_users": deleted_users,
        "deleted_usernames": deleted_usernames,
        "deleted_business_records": deleted_business_records,
    }


@router.get(
    "/list",
    summary="文件列表",
    description="需要登录。列出上传目录中的文件名与大小。",
)
def list_files(
    current_user: User = Depends(get_current_privileged_user),
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
