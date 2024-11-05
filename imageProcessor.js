// imageProcessor.js
const { parentPort } = require('worker_threads');
// Assurez-vous que Jimp est installé

const sharp = require('sharp');

if (parentPort) {
  parentPort.on('message', async ({ imagePath }) => {
    try {
      console.log("Chargement de l'image...");
      const processedPath = 'output-image.jpg';

      await sharp(imagePath)
        .resize(256, 256) // Redimensionner l'image
        .toFile(processedPath); // Sauvegarder l'image traitée

      console.log("Traitement terminé, renvoi du chemin de l'image traitée...");
      parentPort.postMessage(processedPath);
    } catch (error) {
      console.error("Erreur de traitement d'image :", error);
      parentPort.postMessage(null);
    }
  });
} else {
  console.error("parentPort is not available.");
}
