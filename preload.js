// preload.js
// Exemple: Exposer une API sécurisée
// window.myAPI = {
//   // Méthodes sécurisées
// };
const { contextBridge, ipcRenderer } = require('electron');

// Exposing system information API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
});