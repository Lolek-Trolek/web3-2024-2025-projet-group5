const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let isDev;
let mainWindow;

async function createWindow() {
  isDev = (await import("electron-is-dev")).default;

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "/frontend/build/index.html")}`;

  await mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


//------ pop up pour drag and drop -------//
function createPopupWindow(componentName, dataFromMain) {
  const popupWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Charger la même vue générique pour toutes les popups
  const popupURL = isDev
      ? "http://localhost:3000/#/Popup"
      : `file://${path.join(__dirname, "frontend/build/index.html#/Popup")}`; // Route spécifique pour la production
  popupWindow.loadURL(popupURL);

  // Envoyer le nom du composant et les données à la vue popup après le chargement
  popupWindow.webContents.once("did-finish-load", () => {
    popupWindow.webContents.send("init-data", { componentName, data: dataFromMain });
  });

  // Récupérer les données depuis la popup (si nécessaire)
  ipcMain.once("popup-data", (event, data) => {
    mainWindow.webContents.send("popup-response", data);
  });
}

// Écoute l'IPC pour créer des popups avec des composants dynamiques
ipcMain.on('open-popup', (event, data) => {
  createPopupWindow(data.component, data.message);
});
