# 生产部署说明（Docker）

## 1. 服务器准备

- 安装 Docker 与 Docker Compose
- 服务器开放端口：`80`（或你在 `.env.prod` 中配置的端口）

## 2. 配置环境变量

在项目根目录复制并编辑：

```bash
cp .env.prod.example .env.prod
```

至少要修改：

- `POSTGRES_PASSWORD`
- `SECRET_KEY`
- `CORS_ORIGINS`（改成你的正式域名）

## 3. 启动服务

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

启动后：

- 前端访问：`http://你的服务器IP或域名`
- 后端接口：`http://你的服务器IP或域名/api/...`

## 4. 查看日志

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml logs -f
```

## 5. 停止服务

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml down
```

## 6. 数据持久化

`docker-compose.prod.yml` 已配置两个持久化卷：

- `pgdata`：PostgreSQL 数据
- `uploads_data`：业务上传文件

即使重启容器，数据不会丢失。
