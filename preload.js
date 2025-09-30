const { contextBridge, ipcRenderer } = require('electron');

// 定义安全的 API 暴露给渲染进程
contextBridge.exposeInMainWorld('electron', {
  // 文件操作 API
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
  saveFile: () => ipcRenderer.invoke('dialog:saveFile'),
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
  
  // IPC 通信 API
  ipc: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    once: (channel, func) => ipcRenderer.once(channel, (event, ...args) => func(...args)),
    removeListener: (channel, func) => ipcRenderer.removeListener(channel, func),
  }
});