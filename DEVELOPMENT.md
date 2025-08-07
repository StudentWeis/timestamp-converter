# 开发指南

本指南将帮助你了解如何开发和维护这个 Unix 时间戳转换器扩展程序。

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0
- Microsoft Edge 浏览器 (用于测试)

### 安装

```bash
# 克隆项目
git clone https://github.com/your-username/timestamp-plugin.git
cd timestamp-plugin

# 安装依赖
npm install
```

### 开发模式

```bash
# 启动开发模式 (文件监听)
npm run dev

# 在另一个终端运行类型检查
npm run type-check
```

### 构建和测试

```bash
# 生产构建
npm run build

# 清理构建文件
npm run clean
```

## 🏗️ 代码架构

### 组件设计原则

1. **单一职责**: 每个组件只负责一个特定功能
2. **可复用性**: 组件设计要考虑复用性
3. **类型安全**: 使用 TypeScript 确保类型安全
4. **错误处理**: 每个组件都要有适当的错误处理

### 文件命名规范

- 组件文件: `PascalCase.tsx`
- 工具文件: `camelCase.ts`
- 样式文件: `kebab-case.css`
- 常量文件: `camelCase.ts`

## 🔧 开发工作流

### 添加新功能

1. 创建功能分支
```bash
git checkout -b feature/your-feature-name
```

2. 开发和测试
```bash
npm run dev
# 在浏览器中测试扩展
```

3. 类型检查
```bash
npm run type-check
```

4. 构建验证
```bash
npm run build
```

5. 提交代码
```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 修复 Bug

1. 创建修复分支
```bash
git checkout -b fix/bug-description
```

2. 修复并测试
3. 确保类型检查通过
4. 提交代码

### 代码规范

- 使用 2 空格缩进
- 使用单引号包围字符串
- 组件 props 使用 interface 定义
- 函数组件使用 React.FC 类型
- 导出组件使用 export default

## 🧪 测试扩展

### 在 Edge 中加载扩展

1. 构建项目
```bash
npm run build
```

2. 打开 Edge 浏览器
3. 访问 `edge://extensions/`
4. 启用"开发者模式"
5. 点击"加载解压缩的扩展"
6. 选择项目的 `dist` 文件夹

### 调试技巧

1. **控制台调试**
   - 右键扩展图标 → 检查弹出窗口
   - 在控制台中查看错误信息

2. **React DevTools**
   - 安装 React Developer Tools 扩展
   - 在扩展弹窗中查看组件状态

3. **热重载开发**
   - 修改代码后运行 `npm run build`
   - 在扩展管理页面点击刷新按钮

## 📝 贡献指南

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范:

- `feat`: 新功能
- `fix`: 修复问题  
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 重构代码
- `test`: 测试相关
- `chore`: 构建或辅助工具的变动

### Pull Request 流程

1. Fork 项目
2. 创建功能分支
3. 完成开发和测试
4. 提交 Pull Request
5. 等待代码审查

## 🔧 常用命令

```bash
# 开发相关
npm run dev          # 开发模式
npm run build        # 生产构建
npm run type-check   # TypeScript 检查
npm run clean        # 清理构建文件

# 项目维护
npm audit            # 安全检查
npm outdated         # 检查过时依赖
npm update           # 更新依赖
```

## 📦 发布流程

### 版本发布

1. 更新版本号
```bash
npm version patch|minor|major
```

2. 更新 CHANGELOG.md
3. 构建发布版本
```bash
npm run build
```

4. 打包扩展
```bash
cd dist
zip -r ../timestamp-converter-v1.0.0.zip .
```

5. 提交到 Edge 扩展商店

## 🐛 常见问题

### TypeScript 错误
- 确保所有导入的模块都有正确的类型定义
- 检查组件 props 接口是否正确

### 构建失败
- 清理 node_modules: `rm -rf node_modules && npm install`
- 检查 webpack 配置是否正确

### 扩展无法加载
- 确保 manifest.json 格式正确
- 检查是否有语法错误
- 查看浏览器控制台的错误信息

## 📚 相关资源

- [Chrome Extension 开发文档](https://developer.chrome.com/docs/extensions/)
- [React 官方文档](https://reactjs.org/docs/)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)
- [Webpack 配置指南](https://webpack.js.org/configuration/)
