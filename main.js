const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 根据开发或生产环境加载不同URL
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, './dist/index.html')}`;

  mainWindow.loadURL(startURL);

  // 开发环境下打开开发者工具
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC 处理函数
// 文件选择对话框
ipcMain.handle('dialog:openFile', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  return result;
});

// 目录选择对话框
ipcMain.handle('dialog:openDirectory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  
  return result;
});

// 保存文件对话框
ipcMain.handle('dialog:saveFile', async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: 'Text Files', extensions: ['txt'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  return result;
});

// 打开外部链接
ipcMain.handle('shell:openExternal', async (event, url) => {
  return await shell.openExternal(url);
});