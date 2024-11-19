const { contextBridge, ipcRenderer } = require("electron");
const path = require("node:path");

const isMainWindow = process.argv.includes("--isMainWindow");

contextBridge.exposeInMainWorld("electron", {
  showNotification: (args) => ipcRenderer.invoke("show-notification", args),
  openDialog: (args) => ipcRenderer.invoke("open-dialog", args),
  showInItemFolder: (args) => ipcRenderer.invoke("show-in-item-folder", args),
  startDrag: (fileName) =>
    ipcRenderer.send("ondragstart", path.join(process.cwd(), fileName)),
  isMainWindow,
  onMessageFromMain: (callback) =>
    ipcRenderer.on("message-from-main", callback),
  onMessageFromSecond: (callback) =>
    ipcRenderer.on("message-from-second", callback),
  sendMessageToSecondWindow: (message) =>
    ipcRenderer.send("send-to-second", message),
  sendMessageToMainWindow: (message) =>
    ipcRenderer.send("send-to-main", message),
  readClipboard: () => ipcRenderer.invoke("read-clipboard"),
  writeClipboard: (args) => ipcRenderer.invoke("write-clipboard", args),
  setThemeSource: (theme) => ipcRenderer.invoke("set-theme-source", theme),
  getCurrentTheme: () => ipcRenderer.invoke("get-current-theme"),
  onThemeUpdated: (callback) =>
   
    ipcRenderer.on("theme-updated", (event, theme) => callback(theme)),
  processImage: (imagePath) => ipcRenderer.invoke('process-image', imagePath),
  
  onShortcut: (callback) =>
    ipcRenderer.on("shortcut", (e, args) => callback(args)),
  onShortcut: (callback) =>
    ipcRenderer.on("shortcut", (e, args) => callback(args)),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
 
});

