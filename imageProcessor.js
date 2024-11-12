// imageProcessor.js
const { parentPort } = require('worker_threads');
const sharp = require('sharp');
const path = require('path');


// Assurez-vous que le dossier 'img' existe dans votre projet
const outputDir = path.join(__dirname, '/frontend/public/img');

if (parentPort) {
  parentPort.on('message', async ({ imagePath }) => {
    try {
      console.log("Chargement de l'image...");

      // Définir le chemin du fichier de sortie dans le dossier 'img'
      const processedPath = path.join(outputDir, 'output-image.jpg');

      await sharp(imagePath)
        .resize(256, 256) // Redimensionner l'image
        .toFile(processedPath); // Sauvegarder l'image traitée

      // Envoyer une confirmation sans renvoyer le chemin
      parentPort.postMessage({});
    } catch (error) {
      console.error("Erreur de traitement d'image :", error);
      parentPort.postMessage(null);
    }
  });
} else {
  console.error("parentPort is not available.");
}
