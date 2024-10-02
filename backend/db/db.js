// Importer mongoose pour gérer les connexions à MongoDB
const mongoose = require('mongoose');

// Fonction asynchrone pour se connecter à la base de données MongoDB
const connectDB = async () => {
  try {
    // Tenter de se connecter à MongoDB à l'adresse spécifiée (ici en local, sur la base de données "battle-royale-meme")
    await mongoose.connect('mongodb://localhost:27017/battle-royale-meme');
    console.log('🔗 Connecté à MongoDB'); // Afficher un message de succès si la connexion est établie
  } catch (error) {
    // Afficher une erreur et arrêter le processus si la connexion échoue
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1); // `process.exit(1)` termine le processus avec un code de sortie non nul, indiquant une erreur
  }
};

// Exporter la fonction `connectDB` pour qu'elle puisse être utilisée ailleurs dans l'application
module.exports = connectDB;
