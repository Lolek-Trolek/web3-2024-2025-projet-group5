// Importation des modules nécessaires
const { ApolloServer, gql } = require("apollo-server"); // Apollo Server pour créer un serveur GraphQL, `gql` pour définir des schémas
const connectDB = require("../db/db"); // Fonction pour se connecter à la base de données MongoDB
const Meme = require("../models/Meme"); // Le modèle MongoDB pour la collection "memes"
const cors = require("cors"); // Middleware CORS pour contrôler l'accès aux ressources

// Connecter à MongoDB
connectDB();

// Définir les types GraphQL (typeDefs)
const typeDefs = gql`
  type Meme {
    id: ID!
    title: String!
    imageUrl: String!
    ranking: Int!
    votes: Int!
    createdBy: String!
    createdAt: String!
  }

  type Query {
    memes: [Meme]
    meme(id: ID!): Meme
  }

  type Mutation {
    addMeme(
      title: String!
      imageUrl: String!
      createdBy: String!
      ranking: Int!
    ): Meme
    voteMeme(id: ID!): Meme
  }
`;

// Définir les résolveurs GraphQL
const resolvers = {
  // Définition des résolveurs pour les requêtes
  Query: {
    // Récupérer tous les memes, triés par votes décroissants
    memes: async () => await Meme.find().sort({ votes: -1 }),
    // Récupérer un meme spécifique par ID
    meme: async (_, { id }) => await Meme.findById(id),
  },
  // Définition des résolveurs pour les mutations
  Mutation: {
    // Ajouter un nouveau meme avec les informations fournies
    addMeme: async (_, { title, imageUrl, createdBy, ranking }) => {
      const newMeme = new Meme({ title, imageUrl, createdBy, ranking });
      await newMeme.save(); // Sauvegarde du nouveau meme dans la base de données
      return newMeme; // Retourner le meme ajouté
    },
    // Ajouter un vote pour un meme en fonction de son ID
    voteMeme: async (_, { id }) => {
      const meme = await Meme.findById(id); // Rechercher le meme par ID
      if (!meme) throw new Error("Meme non trouvé"); // Lever une erreur si le meme n'est pas trouvé
      meme.votes += 1; // Incrémenter le nombre de votes du meme
      await meme.save(); // Sauvegarder le meme mis à jour dans la base de données
      return meme; // Retourner le meme mis à jour
    },
  },
};

// Créer une instance Apollo Server
const server = new ApolloServer({
  typeDefs, // Définition des types
  resolvers, // Définition des résolveurs
  cors: {
    origin: "*", // Autoriser toutes les origines (à ajuster en fonction des besoins de sécurité)
    credentials: true, // Permettre les requêtes avec des informations d'identification
  },
});

// Démarrer le serveur
// sur port 4000 !!!si le port est changer changer aussi frontend/main.js et frontend/vite.config.js
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Serveur GraphQL prêt à ${url}`);
});

