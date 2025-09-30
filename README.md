# Electron + React + Ant Design 企业级应用模板

这是一个基于 Electron、React 和 Ant Design 的企业级应用模板，旨在帮助开发者快速搭建桌面应用程序。

## 功能特性

- Electron 24.x
- React 18.x
- Ant Design 5.x
- 文件操作功能（打开文件、目录、保存文件对话框）
- IPC 通信集成
- 支持独立部署为 Web 应用
- 开发和生产环境区分
- Ant Design 组件库开箱即用

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

在开发模式下，Electron 将连接到本地的 React 开发服务器：

```bash
npm start
```

### 构建 Web 版本

构建可部署到 Web 服务器的版本：

```bash
npm run build
```

### 构建 Electron 应用

构建适用于各平台的 Electron 应用：

```bash
# 构建所有平台
npm run dist

# 构建当前平台
npm run pack
```

## 项目结构

```
electron-template/
├── main.js              # Electron 主进程
├── preload.js           # 预加载脚本
├── public/              # React 静态资源
└── src/                 # React 源代码
    ├── App.js           # 主应用组件
    ├── index.js         # 应用入口
    └── ...
```

## 核心功能

### 文件操作

模板已经集成了常用的文件操作功能：

- 打开文件对话框
- 打开目录对话框
- 保存文件对话框

这些功能通过 Electron 的 IPC 机制实现，确保了安全性和隔离性。

### IPC 通信

项目提供了一个安全的 IPC 通信机制，允许渲染进程和主进程之间进行安全通信。

### 环境区分

应用能够自动区分开发环境和生产环境：

- 开发环境：连接到本地 React 开发服务器 (http://localhost:3000)
- 生产环境：加载打包后的本地文件

## 自定义开发

1. 克隆此模板
2. 修改 [package.json](file:///Users/liwudi/Documents/electron-template/package.json) 中的应用信息
3. 根据需求修改主进程 [main.js](file:///Users/liwudi/Documents/electron-template/main.js)
4. 在 [src/](file:///Users/liwudi/Documents/electron-template/src) 目录下开发 React 组件

## 注意事项

1. 所有 Electron API 都应该通过预加载脚本暴露给渲染进程
2. 不要在渲染进程中直接使用 Node.js API
3. 使用 `window.electron` 对象访问预定义的 Electron 功能

## 许可证

[MIT](LICENSE)