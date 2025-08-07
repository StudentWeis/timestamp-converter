# 项目架构文档

## 文件结构

```
timestamp-plugin/
├── public/                  # 静态资源
│   ├── manifest.json       # 扩展程序清单
│   └── icons/             # 扩展程序图标
│       ├── icon16.png
│       ├── icon32.png
│       ├── icon48.png
│       └── icon128.png
├── src/                    # 源代码
│   ├── components/         # React 组件
│   │   ├── TimestampDisplay.tsx      # 时间戳显示组件
│   │   ├── TimestampConverter.tsx    # 转换器主要组件
│   │   └── TimezoneSelector.tsx      # 时区选择器组件
│   ├── constants/          # 常量定义
│   │   └── timezones.ts    # 时区配置
│   ├── utils/              # 工具函数
│   │   └── timestamp.ts    # 时间戳处理工具
│   ├── styles/             # 样式文件
│   │   └── App.css         # 主要样式
│   ├── App.tsx             # 根组件
│   ├── index.tsx           # 应用入口点
│   └── popup.html          # 扩展弹窗模板
├── dist/                   # 构建输出目录 (构建后生成)
├── package.json            # 项目配置
├── tsconfig.json          # TypeScript 配置
├── webpack.config.js      # Webpack 构建配置
└── README.md              # 项目文档
```

## 组件架构

### App.tsx (根组件)
- 管理全局状态（当前时间戳、选定时区、时间单位）
- 协调子组件之间的交互
- 处理实时时间更新

### TimestampDisplay.tsx (显示组件)
- 显示格式化的时间戳和时间
- 提供一键复制功能
- 错误状态处理

### TimestampConverter.tsx (转换器组件)
- 双向转换功能（时间戳 ↔ 时间）
- 输入验证和错误处理
- 快速填充当前时间功能

### TimezoneSelector.tsx (时区选择器)
- 时区下拉选择
- 支持 UTC-12 到 UTC+12 完整时区

## 工具模块

### utils/timestamp.ts
- `isValidTimestamp()`: 时间戳验证
- `timestampToUTC()`: 时间戳转UTC毫秒
- `getCurrentTimestamp()`: 获取当前时间戳
- `formatTimestamp()`: 格式化时间戳
- `parseDateTime()`: 解析日期时间字符串
- `copyToClipboard()`: 复制到剪贴板

### constants/timezones.ts
- 时区配置数据
- 包含时区标签和偏移值

## 技术栈

- **React 18**: 用户界面框架
- **TypeScript**: 类型安全
- **Webpack 5**: 模块打包
- **CSS3**: 样式和动画（渐变、毛玻璃效果）
- **Chrome Extension API**: 浏览器扩展功能

## 构建流程

1. **开发模式**: `npm run dev` - 监听文件变化，自动重新构建
2. **生产构建**: `npm run build` - 生成优化的生产版本
3. **类型检查**: `npm run type-check` - 检查 TypeScript 类型

## 代码优化特点

- **模块化设计**: 每个功能独立组件
- **类型安全**: 完整的 TypeScript 类型定义
- **错误处理**: 健壮的输入验证和错误提示
- **用户体验**: 实时反馈和动画效果
- **代码复用**: 共享工具函数和常量
