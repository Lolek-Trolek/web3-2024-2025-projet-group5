const { contextBridge, ipcRenderer } = require("electron");
const path = require('node:path');

console.log("Preload script running"); // Vérification

contextBridge.exposeInMainWorld("electron", {
  showNotification: (args) => ipcRenderer.invoke("show-notification", args),
  openDialog: (args) => ipcRenderer.invoke("open-dialog", args),
  showInItemFolder: (args) => ipcRenderer.invoke("show-in-item-folder", args),
  startDrag: (fileName) => ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
});
