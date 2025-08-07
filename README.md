# Unix 时间戳转换器 (Unix Timestamp Converter)

一个专为 Microsoft Edge 浏览器开发的时间戳转换工具扩展程序。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)
![React](https://img.shields.io/badge/React-18.2+-blue.svg)

## 🎯 功能特性

- **实时时间戳显示** - 支持秒、毫秒、微秒三种精度
- **双向转换** - Unix 时间戳 ⇄ 人类可读时间格式
- **多时区支持** - UTC-12 到 UTC+12 的完整时区覆盖
- **一键复制** - 点击即可复制时间戳或格式化时间
- **智能输入** - 自动验证和错误处理
- **现代界面** - 响应式设计，支持深色模式

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 生产构建

```bash
npm run build
```

### 类型检查

```bash
npm run type-check
```

## 📦 安装扩展

1. **构建项目**
   ```bash
   npm run build
   ```

2. **加载到 Edge 浏览器**
   - 打开 `edge://extensions/`
   - 启用"开发者模式"
   - 点击"加载解压缩的扩展"
   - 选择项目的 `dist` 文件夹

3. **开始使用**
   - 点击浏览器工具栏中的扩展图标
   - 享受便捷的时间戳转换功能！

## 🛠️ 技术架构

```
src/
├── components/          # React 组件
│   ├── TimestampDisplay.tsx      # 时间戳显示组件
│   ├── TimestampConverter.tsx    # 转换器组件
│   └── TimezoneSelector.tsx      # 时区选择器
├── constants/           # 常量配置
│   └── timezones.ts             # 时区定义
├── utils/              # 工具函数
│   └── timestamp.ts             # 时间戳处理工具
├── styles/             # 样式文件
│   └── App.css                  # 主样式
├── App.tsx             # 主应用组件
├── index.tsx           # 应用入口点
└── popup.html          # 扩展弹窗 HTML
```

## 🎨 界面预览

- **优雅的渐变背景** - 紫蓝色渐变设计
- **毛玻璃效果** - 现代化视觉体验  
- **一键复制功能** - 点击即可复制，带反馈动画
- **响应式布局** - 适配各种屏幕尺寸

## 🌍 支持的时区

| 时区 | 描述 | 偏移量 |
|------|------|--------|
| UTC-8 | 太平洋标准时间 (PST) | -8 |
| UTC-5 | 东部标准时间 (EST) | -5 |
| UTC+0 | 格林威治标准时间 (GMT) | 0 |
| UTC+1 | 中欧时间 (CET) | +1 |
| UTC+8 | 中国标准时间 (CST) | +8 |
| UTC+9 | 日本标准时间 (JST) | +9 |

*支持从 UTC-12 到 UTC+12 的所有时区*

## 💡 使用指南

### 查看当前时间戳
- 扩展会实时显示当前时间戳
- 可在秒/毫秒/微秒间切换精度
- 选择不同时区查看对应时间

### 时间戳转换
1. **时间戳 → 时间**
   - 在输入框中输入时间戳
   - 自动转换为可读时间格式
   - 点击"现在"快速填入当前时间戳

2. **时间 → 时间戳**  
   - 输入格式: `YYYY-MM-DD HH:MM:SS`
   - 自动转换为时间戳
   - 点击"现在"快速填入当前时间

### 复制功能
- 点击任意时间戳或时间值即可复制
- 成功复制后会显示 ✓ 标识
- 2秒后标识自动消失

## 🔧 开发配置

### TypeScript 配置
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "strict": false,
    "esModuleInterop": true
  }
}
```

### Webpack 配置
- **入口**: `src/index.tsx`
- **输出**: `dist/popup.js`
- **支持**: TypeScript, CSS, 文件复制

### Manifest V3
```json
{
  "manifest_version": 3,
  "name": "Unix Timestamp Converter",
  "version": "1.0.0"
}
```

## 🤝 贡献指南

1. Fork 这个项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📝 更新日志

### v1.0.0 (2024-08-07)
- ✨ 初始版本发布
- 🎯 支持三种时间戳精度
- 🌍 完整时区支持
- 📱 响应式界面设计
- 🔄 双向转换功能

## 📄 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

- React 团队提供优秀的前端框架
- Microsoft Edge 扩展平台
- TypeScript 类型系统支持

---

<div align="center">

**[🌟 给个 Star](https://github.com/your-username/timestamp-plugin) | [🐛 报告问题](https://github.com/your-username/timestamp-plugin/issues) | [💡 功能建议](https://github.com/your-username/timestamp-plugin/issues)**

Made with ❤️ by [Your Name]

</div>
