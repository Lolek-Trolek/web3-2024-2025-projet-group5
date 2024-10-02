// Importation des modules nécessaires d'Electron
const { app, BrowserWindow } = require("electron");
// Importation du module 'path' pour gérer les chemins de fichiers
const path = require("path");

let mainWindow; // Variable pour stocker la référence à la fenêtre principale

// Fonction pour créer la fenêtre principale de l'application
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200, // Largeur de la fenêtre
    height: 800, // Hauteur de la fenêtre
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Chargement du fichier preload avant l'exécution du script de l'application
      nodeIntegration: true, // Permet l'utilisation de Node.js dans les pages web
      contextIsolation: false, // Désactive l'isolement du contexte pour permettre l'accès direct à l'API Node
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
