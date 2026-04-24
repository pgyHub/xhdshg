# 生产部署说明（Docker）

## 0. 阿里云 ECS（无域名，用公网 IP）

适用：已购买阿里云 ECS，暂时不绑定域名，通过 `http://公网IP` 访问站点。

### 0.1 创建 ECS 时建议

- **镜像**：Ubuntu 22.04 LTS（或 Debian 12）
- **规格**：最低 2 核 2G 即可跑 Docker + 本栈（业务量上来再升配）
- **带宽**：按固定带宽或按流量均可；需能从公网访问网页则要有公网 IP 或 EIP
- **安全组入方向**：放行 **TCP 80**（若你改 `APP_PORT` 则放行对应端口）、**TCP 22**（SSH）

### 0.2 登录服务器并安装 Docker

SSH 登录后执行（Ubuntu 示例）：

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "${VERSION_CODENAME:-jammy}") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

确认安装：

```bash
docker --version
docker compose version
```

若希望当前用户免 `sudo` 使用 Docker：

```bash
sudo usermod -aG docker "$USER"
# 重新登录 SSH 后生效
```

### 0.3 把代码放到服务器

任选其一：

- **Git**：`git clone <你的仓库地址>` 后 `cd xhdshg-2`（目录名以实际为准）
- **本机打包上传**：在项目根目录打包（排除 `node_modules`、`.git`），用 `scp` 传到服务器再解压

### 0.4 配置 `.env.prod`

在**项目根目录**（与 `docker-compose.prod.yml` 同级）：

```bash
cp .env.prod.example .env.prod
nano .env.prod   # 或用 vim
```

必改项：

- `POSTGRES_PASSWORD`：强密码
- `SECRET_KEY`：长随机串（勿泄露）

无域名时 **CORS** 可保持 `*`（前端与接口同机同端口经 Nginx 反代，一般为同源；若日后单独域名再改为逗号分隔的正式地址列表）。

可选：

- `APP_PORT=80`：默认对外就是 80；若 80 被占用可改为例如 `8080`，并在安全组放行该端口

### 0.5 启动

在**项目根目录**执行：

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml up -d --build
```

### 0.6 验证

浏览器访问：`http://<你的ECS公网IP>/`

- 登录、注册等走 `/api/`，已由容器内 Nginx 转发到后端，无需单独开端口给后端。

### 0.7 常用运维命令

```bash
# 查看日志
docker compose --env-file .env.prod -f docker-compose.prod.yml logs -f

# 重启
docker compose --env-file .env.prod -f docker-compose.prod.yml restart

# 停止并删除容器（卷数据默认保留，数据库与上传仍在）
docker compose --env-file .env.prod -f docker-compose.prod.yml down
```

### 0.8 阿里云控制台检查

若浏览器无法打开：

1. **安全组**是否放行 `APP_PORT`（默认 80）
2. ECS 是否绑定 **公网 IP / EIP**
3. 本机防火墙：`sudo ufw status`，若启用需允许对应端口

### 0.9 备案与 HTTPS 说明（中国大陆）

- 使用 **80 / 443** 对外提供网站服务时，部分地区或场景会涉及 **ICP 备案** 要求，以阿里云最新规则为准。
- 无域名时通常先用 **HTTP + IP** 验证功能；上域名后再申请证书并改 **HTTPS** 更安全。

---

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

---

## 7. 安全加固：降低病毒、挖矿、入侵风险

挖矿木马常见入口：**弱 SSH 密码**、**暴露的管理端口**、**带漏洞的旧软件**、**误执行不明脚本**。下面按优先级做即可明显降低风险。

### 7.1 阿里云侧

- **安全组**：只放行必需端口（如 `22`、`80` / `443`），不要对 `0.0.0.0/0` 开放数据库、Redis、Docker API（`2375`/`2376`）等。
- **控制台**：开启 **云安全中心**（原安骑士）基础版，打开异常登录、恶意进程告警；定期看告警与基线扫描结果。
- **密钥与口令**：`POSTGRES_PASSWORD`、`SECRET_KEY` 使用长随机串，**不要**提交到 Git 或截图外泄。

### 7.2 SSH（最重要）

- 使用 **SSH 公钥登录**，关闭密码登录（确认密钥能登录后再关）。
- 可选：改默认 `22` 端口、`AllowUsers` 限制用户、`fail2ban` 防暴力破解。
- 不要用 root 日常登录；需要时用 `sudo`。

### 7.3 系统与防火墙

- 定期更新：`sudo apt-get update && sudo apt-get upgrade -y`（维护窗口执行）。
- 启用本机防火墙，只放行 SSH 与 Web，例如 Ubuntu `ufw`：

```bash
sudo ufw default deny incoming
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status
```

### 7.4 Docker 相关

- **不要把 Docker 守护进程 TCP 端口暴露到公网**（否则极易被扫到并利用）。
- 镜像尽量用 **官方镜像**、固定 **tag**（如 `postgres:16-alpine`），定期重建镜像以获取安全补丁。
- 业务容器内**不要**以 root 跑敏感服务（若后续加固，可在 Dockerfile 中增加非 root 用户；当前 compose 可先保证宿主机与 SSH 安全）。

### 7.5 应用与运维习惯

- 上传接口已有体积限制；生产环境仍应：**强密码策略**、**管理接口不对外**、**仅 HTTPS + 域名**后再收紧 `CORS_ORIGINS`。
- **切勿**在生产机执行来源不明的 `curl ... | bash`、不明二进制。
- 定期 **`docker compose logs`** 与 **`htop` / 云监控** 看 CPU：长期接近 100% 且非业务高峰，要警惕挖矿进程。

### 7.6 发现异常时

- 立刻改 **SSH / 数据库** 密码与密钥，检查 `~/.ssh/authorized_keys`、计划任务 `crontab`、可疑 systemd 服务。
- 若已确认中毒，**优先快照/备份数据后重装系统**，比「手工杀毒」更干净；再按本文重新部署并加固。
