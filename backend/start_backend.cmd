@echo off
REM 始终在脚本所在目录（backend）启动，避免 cmd 下 cd 到 D: 失败导致找不到 main.py
cd /d "%~dp0"
echo 当前目录: %CD%
REM 固定本地开发数据库来源：清空外部环境变量 DATABASE_URL，回退到 config.py 的默认 sqlite 路径
set "DATABASE_URL="
REM 需要初始化或重置 admin 密码时再手动执行: python ensure_admin.py [--reset]
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
pause
