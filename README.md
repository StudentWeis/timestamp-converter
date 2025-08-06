# Unix Timestamp Converter Extension

一个用于 Edge 浏览器的 Unix 时间戳转换工具插件。

## 功能特性

- 🕐 实时显示当前 Unix 时间戳
- 🔄 Unix 时间戳与人类可读时间格式的双向转换
- 🌍 支持多个 UTC 时区调节
- ⚡ 实时更新和即时转换
- 🎨 美观的渐变 UI 设计

## 安装方法

1. 克隆或下载此项目
2. 运行 `npm install` 安装依赖
3. 运行 `npm run build` 构建项目
4. 在 Edge 浏览器中打开扩展管理页面 (`edge://extensions/`)
5. 开启"开发者模式"
6. 点击"加载解压缩的扩展"
7. 选择项目的 `dist` 文件夹

## 技术栈

- React 18
- TypeScript
- Webpack 5
- CSS3 (渐变背景、毛玻璃效果)

## 开发命令

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化）
npm run dev

# 生产构建
npm run build

# 类型检查
npm run type-check
```

## 支持的时区

插件支持从 UTC-12 到 UTC+12 的所有时区，包括常见时区的标注：
- UTC-8 (PST) - 太平洋标准时间
- UTC-5 (EST) - 东部标准时间  
- UTC+1 (CET) - 中欧时间
- UTC+8 (CST) - 中国标准时间
- UTC+9 (JST) - 日本标准时间

## 使用方法

1. 点击浏览器工具栏中的插件图标
2. 查看当前实时时间戳
3. 使用下拉菜单选择想要的时区
4. 在转换工具中输入时间戳或日期时间进行转换
5. 点击"Now"按钮快速填入当前时间

## 许可证

MIT License
