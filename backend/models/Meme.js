// Importer mongoose pour créer un schéma et un modèle pour MongoDB
const mongoose = require('mongoose');

// Définir le schéma de données pour un "meme"
const memeSchema = new mongoose.Schema({
  title: {
    type: String, // Le titre du meme, de type String
    required: true, // Ce champ est obligatoire
  },
  imageUrl: {
    type: String, // URL de l'image du meme, de type String
    required: true, // Ce champ est obligatoire
  },
  ranking: {
    type: Number, // Classement du meme, de type Number
    default: 0, // Valeur par défaut à 0 pour un nouveau meme
  },
  votes: {
    type: Number, // Nombre de votes pour le meme, de type Number
    default: 0, // Valeur par défaut à 0
  },
  createdBy: {
    type: String, // Nom du créateur du meme, de type String
    required: true, // Ce champ est obligatoire
  },
  createdAt: {
    type: Date, // Date de création du meme, de type Date
    default: Date.now, // La valeur par défaut est la date et l'heure actuelles
  },
});

// Créer un modèle à partir du schéma
// "Meme" est le nom du modèle, "memeSchema" est le schéma qui décrit sa structure, et "memes" est le nom de la collection dans MongoDB
const Meme = mongoose.model("Meme", memeSchema, "memes");

// Exporter le modèle pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = Meme;
