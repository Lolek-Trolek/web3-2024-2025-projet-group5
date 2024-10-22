const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  dialog,
} = require("electron");
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

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Settings",
        click: () => {
          // TODO
        },
      },
    ],
  },
];

if (isDev)
  menuTemplate.push({
    label: "Dev",
    submenu: [
      {
        label: "Open Dev Tools",
        click: () => {
          mainWindow.webContents.openDevTools();
        },
      },
    ],
  });

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

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

ipcMain.handle("open-dialog", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  return result.filePaths;
});
