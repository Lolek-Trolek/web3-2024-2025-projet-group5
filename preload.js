const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  showNotification: (args) => ipcRenderer.invoke("show-notification", args),
  openDialog: () => ipcRenderer.invoke("open-dialog"),
  showInItemFolder: (args) => ipcRenderer.invoke("show-in-item-folder", args),
});
