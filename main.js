// Importation des modules nécessaires d'Electron
const { app, BrowserWindow, ipcMain } = require("electron"); // Ajout de ipcMain pour gérer la communication
const os = require("os"); // Importation du module os pour récupérer les infos système
const path = require("path");

let mainWindow; // Variable pour stocker la référence à la fenêtre principale

// Fonction pour créer la fenêtre principale de l'application
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, // Largeur de la fenêtre
    height: 800, // Hauteur de la fenêtre
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Chargement du fichier preload avant l'exécution du script de l'application
      nodeIntegration: false, // Désactivation de l'intégration de Node.js pour des raisons de sécurité
      contextIsolation: true, // Activation de l'isolation du contexte pour plus de sécurité
    },
  });

  // Charge l'URL de développement ou le build de production
  const startUrl = process.env.ELECTRON_START_URL || "http://localhost:5173";
  // Vérifie si une variable d'environnement pour l'URL de démarrage existe, sinon utilise l'URL par défaut

  mainWindow.loadURL(startUrl); // Charge l'URL dans la fenêtre principale

  mainWindow.on("closed", () => {
    mainWindow = null; // Libère la référence lorsque la fenêtre est fermée
  });
}

// Événement déclenché lorsque l'application est prête
app.whenReady().then(createWindow);

// Événement déclenché lorsque toutes les fenêtres sont fermées
app.on("window-all-closed", () => {
  // Sur les systèmes autres que macOS, l'application se ferme
  if (process.platform !== "darwin") {
    app.quit(); // Quitte l'application
  }
});

// Événement déclenché lorsque l'application est activée (ex: clic sur l'icône dans le dock)
app.on("activate", () => {
  // Si aucune fenêtre n'est ouverte, crée une nouvelle fenêtre
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Gestion des informations système via IPC
ipcMain.handle("get-system-info", () => {
  return {
    platform: os.platform(), // Système d'exploitation
    cpuCores: os.cpus().length, // Nombre de cœurs CPU
    totalMemory: (os.totalmem() / (1024 ** 3)).toFixed(2) + " GB", // Mémoire totale (en Go)
    freeMemory: (os.freemem() / (1024 ** 3)).toFixed(2) + " GB", // Mémoire disponible (en Go)
    networkInterfaces: os.networkInterfaces(), // Interfaces réseau
  };
});
