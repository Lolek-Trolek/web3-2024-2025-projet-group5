const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  showNotification: (args) => ipcRenderer.invoke("show-notification", args),
  openDialog: (args) => ipcRenderer.invoke("open-dialog", args),
  showInItemFolder: (args) => ipcRenderer.invoke("show-in-item-folder", args),
  readClipboard: () => ipcRenderer.invoke("read-clipboard"),
  writeClipboard: (args) => ipcRenderer.invoke("write-clipboard", args),
});
