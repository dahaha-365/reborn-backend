# Reborn Backend

- [ ] 数据库模块
- [ ] 认证模块
- [ ] 授权模块
- [ ] 用户模块
- [ ] 角色模块
- [ ] 权限模块
- [ ] 日志模块
- [ ] 异常处理模块
- [ ] 缓存模块
- [ ] 配置模块
- [ ] 文档模块
- [ ] 测试模块

reborn-backend/
├── src/
│   ├── modules/                    # 业务模块（推荐）
│   │   ├── admin/                 # 管理后台模块
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── dto/           # DTOs
│   │   │   │   ├── guards/        # 认证守卫
│   │   │   │   └── strategies/    # Passport策略
│   │   │   ├── user/
│   │   │   └── admin.module.ts
│   │   └── ...                    # 其他业务模块
│   │
│   ├── common/                     # 公共模块
│   │   ├── constants/             # 常量
│   │   ├── decorators/            # 自定义装饰器
│   │   ├── dto/                   # 通用DTO
│   │   ├── entities/              # 通用实体
│   │   ├── exceptions/            # 自定义异常
│   │   ├── filters/               # 异常过滤器
│   │   ├── guards/                # 通用守卫
│   │   ├── helpers/               # 工具函数 ✓
│   │   ├── interceptors/          # 拦截器
│   │   ├── interfaces/            # 接口定义
│   │   ├── middlewares/           # 中间件
│   │   ├── pipes/                 # 管道
│   │   └── services/              # 通用服务
│   │       └── prisma.service.ts  # 移到这里
│   │
│   ├── config/                     # 配置 ✓
│   │   ├── app.config.ts          # ✓
│   │   ├── database.config.ts     # 数据库配置
│   │   ├── auth.config.ts         # 认证配置
│   │   └── swagger.config.ts      # Swagger配置
│   │
│   ├── generated/                  # 生成的代码 ✓
│   │   └── prisma/                # ✓
│   │
│   ├── app.module.ts              # ✓
│   └── main.ts                     # ✓
│
├── prisma/                         # ✓
│   ├── migrations/                # ✓
│   ├── schema.prisma              # ✓
│   └── seed.ts                     # ✓
│
├── scripts/                        # ✓
│   ├── build-version.ts           # ✓
│   └── package-deploy.ts          # ✓
│
├── test/                           # 测试
│   ├── unit/                      # 单元测试（新增）
│   ├── integration/               # 集成测试（新增）
│   └── e2e/                       # E2E测试（调整）
│       └── app.e2e-spec.ts
│
├── docs/                           # 文档（新增）
│   ├── API.md                     # API文档
│   ├── ARCHITECTURE.md            # 架构设计
│   └── DEVELOPMENT.md             # 开发指南
│
└── ...配置文件
