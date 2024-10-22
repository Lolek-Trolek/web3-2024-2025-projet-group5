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

app.on("ready", () => {
  app.commandLine.appendSwitch('disable-gpu');
  createWindow();
});

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
function createDragAndDropPopupWindow() {
  const popupWindow = new BrowserWindow({
    width: 400, // tu peux ajuster la taille si nécessaire
    height: 400,
    parent: mainWindow,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  const popupURL = isDev
      ? "http://localhost:3000/#/drag-and-drop"
      : `file://${path.join(__dirname, "frontend/build/index.html#drag-and-drop")}`;


  popupWindow.loadURL(popupURL);

  // Envoyer des données après le chargement
  popupWindow.webContents.once("did-finish-load", () => {
    popupWindow.webContents.send("init-data", { message: "Bienvenue dans le drag-and-drop!" });
  });


}

// Écoute l'IPC pour créer des popups avec des composants dynamiques
ipcMain.on('open-popup', (event) => {
  createDragAndDropPopupWindow();
});
