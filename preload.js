const { contextBridge, ipcRenderer } = require("electron");

const isMainWindow = process.argv.includes("--isMainWindow");

contextBridge.exposeInMainWorld("electron", {
  showNotification: (args) => ipcRenderer.invoke("show-notification", args),
  openDialog: (args) => ipcRenderer.invoke("open-dialog", args),
  showInItemFolder: (args) => ipcRenderer.invoke("show-in-item-folder", args),
  isMainWindow,
  onMessageFromMain: (callback) => ipcRenderer.on("message-from-main", callback),
  onMessageFromSecond: (callback) => ipcRenderer.on("message-from-second", callback),
  sendMessageToSecondWindow: (message) => ipcRenderer.send("send-to-second", message),
  sendMessageToMainWindow: (message) => ipcRenderer.send("send-to-main", message),
});
