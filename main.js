const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  dialog,
  shell,
} = require("electron");
const path = require("path");
const fs = require('fs');
const https = require('https');

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

const iconName = path.join(__dirname, '/iconForDragAndDrop.png')

app.on("ready", createWindow);

//Drag and drop
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: iconName
  })
})



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

ipcMain.handle("open-dialog", async (event, args) => {
  let filters = [];
  switch (args) {
    case "image":
      filters.push({ name: "Images", extensions: ["jpg", "png", "gif"] });
      break;

    case "pdf":
      filters.push({ name: "PDFs", extensions: ["pdf"] });
      break;

    case "all":
      filters.push({ name: "All Types", extensions: ["*"] });
      break;

    default:
      break;
  }
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: filters,
  });

  return result;
});

ipcMain.handle("show-in-item-folder", async (event, args) => {
  shell.showItemInFolder(args);
});
