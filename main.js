const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

let mainWindow;

async function createWindow() {
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
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "/frontend/build/index.html")}`;

  mainWindow.loadURL(startURL);

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

ipcMain.handle("show-notification", (event, args) => {
  new Notification(args).show();
});
