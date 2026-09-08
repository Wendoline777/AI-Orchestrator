# dluter's api 校园化改造

模式：status-update（实现与验证完成）。用户已授权在本项目拉取上游并完成品牌、学生文案和蓝白界面改造。

## 范围与决策

- 上游：QuantumNous/new-api；保留 Git 历史、Go 模块、许可和开源署名。
- 展示品牌：dluter's api；定位：面向大工学生的 AI 学习与科研辅助平台。
- 使用官网校徽原始素材，界面采用蓝白主色、中文默认语言、浅色默认主题，保留用户主题/语言选择。
- 覆盖默认首页、导航、侧栏、登录页品牌、页脚、关于页、网页元信息及后端品牌默认值。管理员自定义内容和品牌配置仍可覆盖。
- 正式服务语言不等同于事实背书：不虚构校级运营单位、统一身份认证、备案号、免费额度和服务统计。
- 复用现有路由、按钮、卡片和系统配置。模型中转、计费、数据库结构和认证机制不在本次改造范围内。
- 依据仓库禁止新增 docs 文件的约定，本文件作为本次 plan-tree 的精简入口。

## 路线与验收

- [x] 拉取并检查技术栈、配置入口和复用组件。
- [x] 原始校徽、系统品牌与蓝白主题。
- [x] 学生向首页、关于页及规范页脚。
- [x] 中英文文案、移动端适配和保留配置覆盖。
- [x] 类型检查、改动文件 lint / format、生产构建及浏览器检查。

## 运行与回滚

前端使用 `cd web && bun install --frozen-lockfile && bun run dev`；默认代理 Go 服务 `http://localhost:3000`。
生产部署必须重新构建本分支，直接使用上游预制 Docker 镜像不会包含校园改造。旧数据库显式保存的 SystemName、Logo、首页、关于页、页脚设置优先于代码默认值，可在系统设置中调整。校园改造通过 Git 提交记录审阅和回退；不更改已有部署数据。

## 验证记录

2026-09-07；基于上游提交 `387a40914` 完成校园改造。

- `cd web && npx -y bun install --frozen-lockfile`：通过，未改动依赖清单与锁文件。
- `cd web && npx -y bun run build:check`：最新 TypeScript 检查及生产构建通过，产物位于 `web/dist`。
- 改动 TS/TSX 文件 oxlint：0 errors；保留上游自定义 HTML 页脚的 `no-danger` warning，未扩大该输入面。
- 改动前端文件 oxfmt、`git diff --check`：通过。
- Vitest：5 文件、22 用例通过，涵盖首页导航、键盘操作、学生须知、关于页自定义内容覆盖、登录/注册法律文案中英切换、认证请求和安全跳转。
- `GOPROXY=https://goproxy.cn,direct go test ./common ./setting/operation_setting`：通过。官方 Go 代理在当前网络超时，改用镜像完成下载，未修改全局 Go 配置。
- 浏览器：1280px 桌面、390px 手机首页；手机导航展开/收起/跳转；手机登录页与关于页；中英切换与蓝色深色模式。无横向溢出，校徽加载成功。交付恢复中文浅色。
- 本次认证相关改动仅限版式、品牌和协议文本翻译；原认证机制保留。检查参考 [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) 与 [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)，未声明完成全项目安全审计。

## 当前预览与正式运行

本地真实服务已启动：`http://127.0.0.1:3000`，直接提供本分支生产前端与真实 API。原 `http://127.0.0.1:5173` 入口已改为代理该后端；3001 的测试数据服务已停止。

2026-09-07 启动核验：初次 `/api/setup` 返回未初始化的 SQLite 状态。用户随后自行完成管理员初始化并登录；助手未创建账号或设置用户密码。现已核验 `/api/setup` 返回 `status=true`，浏览器成功进入 `/dashboard/overview`，并打开 `/usage-logs/common` 的「通用日志」页，管理员「全部 / 仅自己」切换及管理菜单正常显示。新实例目前无调用记录，日志显示 0 条；未配置或调用任何付费模型。

账号数据保存在 `data/local/dluters-api.db`；本地服务配置位于 `data/local/server.env`（权限 0600，含持久化随机服务密钥，不进入 Git）。启动脚本为 `.local-tests/runtime/start-local.sh`，使用本地构建 `.local-tests/runtime/dluters-api`。保留 `data/local` 即可保留账号和配置。

可选 `BIND_ADDRESS` 配置已加入 `main.go` 与 `.env.example`；当前设置 `127.0.0.1`，只监听本机。空值保留上游监听所有网卡的行为。根模块 `GOPROXY=https://goproxy.cn,direct go build -o .local-tests/runtime/dluters-api .` 已通过，并通过真实 SQLite 启动、品牌接口和监听地址核验。此处未改动数据库结构、驱动或认证机制。

重新启动当前本机实例：执行 `.local-tests/runtime/start-local.sh`，沿用 `data/local/server.env` 与原数据库；这两个本地文件不随仓库分发。新环境需自行配置数据库和服务密钥，再于根目录执行 `go run .`（Go 1.25.1+），默认使用 3000 端口，首次访问完成管理员初始化并配置模型渠道。开发界面运行 `cd web && bun run dev`，默认代理该 Go 服务。未安装 Bun 时可用 `npx -y bun` 替代 `bun`。

现有数据库升级需检查系统设置中显式保存的品牌、自定义首页、页脚与文档链接。生产域名、实际运营说明、学校登录和模型服务参数由部署环境提供，本次不写入虚构值。

## 维护入口

- [校徽来源与配色依据](BRANDING-ASSETS.md)
- [品牌常量](web/src/lib/constants.ts)、[主题色](web/src/styles/theme.css)
- [学生首页](web/src/features/home/index.tsx)、[平台说明](web/src/features/about/campus-about-content.tsx)、[页脚](web/src/components/layout/components/footer.tsx)

本次无阻断项。后续按实际运营情况维护公告、额度政策、协议及渠道。
