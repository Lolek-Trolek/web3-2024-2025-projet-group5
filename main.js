const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Menu,
  dialog,
  shell,
  clipboard,
  nativeTheme,
} = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

let mainWindow;
let secondWindow;

async function createWindows() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      additionalArguments: ["--isMainWindow"],
    },
  });

  secondWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
      additionalArguments: ["--isSecondWindow"],
    },
  });

  const startURL = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "/frontend/build/index.html")}`;

  mainWindow.loadURL(startURL);
  secondWindow.loadURL(startURL);

  mainWindow.on("closed", () => (mainWindow = null));
  secondWindow.on("closed", () => (secondWindow = null));
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

app.on("ready", createWindows);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindows();
  }
});
//Notification
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

// Gestion de la réception des messages
ipcMain.on("send-to-second", (event, message) => {
  if (secondWindow) {
    secondWindow.webContents.send("message-from-main", message);
  }
});

ipcMain.on("send-to-main", (event, message) => {
  if (mainWindow) {
    mainWindow.webContents.send("message-from-second", message);
  }
});

ipcMain.handle("read-clipboard", async () => {
  let read = { format: "text", content: clipboard.readText("clipboard") };
  if (!read.content)
    read = {
      format: "image",
      content: clipboard.readImage("clipboard").toDataURL(),
    };
  return read;
});

ipcMain.handle("write-clipboard", async (event, args) => {
  clipboard.writeText(args);
});

// Basculer le thème en fonction des choix de l'utilisateur
ipcMain.handle("set-theme-source", (event, theme) => {
  nativeTheme.themeSource = theme; // `theme` doit être 'light', 'dark' ou 'system'
});

ipcMain.handle("get-current-theme", () => {
  return nativeTheme.shouldUseDarkColors ? "dark" : "light";
});

nativeTheme.on("updated", () => {
  const isDarkMode = nativeTheme.shouldUseDarkColors;
  mainWindow.webContents.send("theme-updated", isDarkMode ? "dark" : "light");
});
