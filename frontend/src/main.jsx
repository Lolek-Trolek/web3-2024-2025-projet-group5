// Importation des modules nécessaires
import React from 'react'; // Importation de la bibliothèque React pour créer des composants
import ReactDOM from 'react-dom/client'; // Importation des méthodes pour rendre l'application dans le DOM
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Importation d'Apollo pour la gestion des requêtes GraphQL
import { ThemeProvider } from '@mui/material/styles'; // Importation du fournisseur de thèmes de Material-UI
import App from './App'; // Importation du composant principal de l'application
import theme from './theme'; // Importation du thème personnalisé de Material-UI
import './stylesheet/index.css'; // Importation de la feuille de styles CSS

// Création d'une instance ApolloClient pour la gestion des requêtes GraphQL
const client = new ApolloClient({
  uri: 'http://localhost:4000', // URL du serveur GraphQL
  cache: new InMemoryCache(), // Cache en mémoire pour stocker les résultats des requêtes afin de minimiser les appels réseau
});

// Fonction principale pour rendre l'application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Fournisseur Apollo pour permettre aux composants d'effectuer des requêtes GraphQL */}
    <ApolloProvider client={client}>
      {/* Fournisseur de thème Material-UI pour appliquer des styles personnalisés à l'application */}
      <ThemeProvider theme={theme}>
        {/* Rendu du composant principal de l'application */}
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
