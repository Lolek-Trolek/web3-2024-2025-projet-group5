const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPopup: (data) => ipcRenderer.send('open-popup'),
    onPopupResponse: (callback) => ipcRenderer.on('popup-response', callback),
    sendPopupData: (data) => ipcRenderer.send('popup-data', data),
    onInitData: (callback) => ipcRenderer.on('init-data', callback)
});