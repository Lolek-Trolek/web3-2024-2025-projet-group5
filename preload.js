const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  // send event on openDialog call in the frontend
  openDialog: () => ipcRenderer.invoke("open-dialog"),
});
