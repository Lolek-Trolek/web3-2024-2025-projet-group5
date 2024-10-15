const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  showNotification: (args) => ipcRenderer.invoke("show-notification", args),
});
