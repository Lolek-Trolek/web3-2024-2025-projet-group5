// imageProcessor.js
const { parentPort } = require('worker_threads');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Assurez-vous que le dossier 'img' existe dans votre projet
const outputDir = path.join(__dirname, '/frontend/public/img');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

if (parentPort) {
  parentPort.on('message', async ({ imagePath }) => {
    try {
      console.log("Chargement de l'image...");

      // Définir le chemin du fichier de sortie dans le dossier 'img'
      const processedPath = path.join(outputDir, 'output-image.jpg');

      await sharp(imagePath)
        .resize(256, 256) // Redimensionner l'image
        .toFile(processedPath); // Sauvegarder l'image traitée

      console.log("Traitement terminé, renvoi du chemin de l'image traitée...",processedPath);
      parentPort.postMessage(processedPath); // Retourner le chemin complet de l'image traitée
    } catch (error) {
      console.error("Erreur de traitement d'image :", error);
      parentPort.postMessage(null);
    }
  });
} else {
  console.error("parentPort is not available.");
}
